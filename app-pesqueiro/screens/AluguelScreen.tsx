// screens/AluguelScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AluguelScreen({ route, navigation }: any) {
  const equipamentoId = route?.params?.equipamentoId;
  const [equipamento, setEquipamento] = useState<any>(null);
  const [funcionario, setFuncionario] = useState("");
  const [cliente, setCliente] = useState("");
  const [aluguels, setAluguels] = useState<any[]>([]);

  useEffect(() => {
    carregar();
    const unsub = navigation.addListener("focus", carregar);
    return unsub;
  }, []);

  async function carregar() {
    const rawE = await AsyncStorage.getItem("equipamentos");
    const arrE = rawE ? JSON.parse(rawE) : [];
    setEquipamento(arrE.find((e: any) => e.id === equipamentoId) ?? null);

    const rawA = await AsyncStorage.getItem("alugueis");
    const arrA = rawA ? JSON.parse(rawA) : [];
    setAluguels(arrA.filter((a: any) => a.equipamentoId === equipamentoId));
  }

  async function confirmarAluguel() {
    if (!funcionario.trim()) { Alert.alert("Erro", "Informe o funcionário"); return; }
    if (!cliente.trim()) { Alert.alert("Erro", "Informe o cliente"); return; }
    if (!equipamento) { Alert.alert("Erro", "Equipamento não encontrado"); return; }
    if ((Number(equipamento.quantidade) || 0) <= 0) { Alert.alert("Indisponível", "Quantidade insuficiente"); return; }

    try {
      const rawE = await AsyncStorage.getItem("equipamentos");
      let arrE = rawE ? JSON.parse(rawE) : [];
      const idx = arrE.findIndex((e: any) => e.id === equipamentoId);
      if (idx >= 0) {
        arrE[idx].quantidade = Math.max(0, (Number(arrE[idx].quantidade) || 0) - 1);
        await AsyncStorage.setItem("equipamentos", JSON.stringify(arrE));
      }

      const rawA = await AsyncStorage.getItem("alugueis");
      let arrA = rawA ? JSON.parse(rawA) : [];
      const novo = { id: Date.now().toString(), equipamentoId, equipamentoNome: equipamento.nome, funcionario: funcionario.trim(), cliente: cliente.trim(), inicio: new Date().toISOString(), devolucao: null, valor: Number(equipamento.precoAluguel || 0) };
      arrA.push(novo);
      await AsyncStorage.setItem("alugueis", JSON.stringify(arrA));

      const rawMov = await AsyncStorage.getItem("movimentacoes");
      const movs = rawMov ? JSON.parse(rawMov) : [];
      movs.push({ id: Date.now().toString() + "_a", tipo: "aluguel_equipamento", valor: Number(equipamento.precoAluguel || 0), referenciaId: novo.id, descricao: `Aluguel ${equipamento.nome} por ${novo.cliente}`, data: new Date().toISOString() });
      await AsyncStorage.setItem("movimentacoes", JSON.stringify(movs));

      Alert.alert("Sucesso", "Aluguel registrado.");
      setFuncionario("");
      setCliente("");
      carregar();
    } catch (err) {
      console.log("Erro confirmar aluguel:", err);
      Alert.alert("Erro", "Não foi possível registrar o aluguel.");
    }
  }

  async function deletarAluguel(id: string) {
  Alert.alert("Excluir aluguel?", "O equipamento voltará ao estoque.", [
    { text: "Cancelar" },
    { text: "OK", onPress: async () => {
      const rawA = await AsyncStorage.getItem("alugueis");
      let arrA = rawA ? JSON.parse(rawA) : [];

      const aluguel = arrA.find((a: any) => a.id === id);
      if (!aluguel) return;

      // 1️⃣ Atualiza a devolução
      aluguel.devolucao = new Date().toISOString();

      // Salva lista com o aluguel atualizado
      await AsyncStorage.setItem("alugueis", JSON.stringify(arrA));

      // 2️⃣ Devolve 1 unidade ao estoque
      const rawE = await AsyncStorage.getItem("equipamentos");
      let arrE = rawE ? JSON.parse(rawE) : [];
      const idx = arrE.findIndex((e: any) => e.id === aluguel.equipamentoId);
      if (idx >= 0) {
        arrE[idx].quantidade = (Number(arrE[idx].quantidade) || 0) + 1;
        await AsyncStorage.setItem("equipamentos", JSON.stringify(arrE));
      }

      // 3️⃣ Remove movimentação vinculada
      const rawMov = await AsyncStorage.getItem("movimentacoes");
      let movs = rawMov ? JSON.parse(rawMov) : [];
      movs = movs.filter((m: any) => m.referenciaId !== id);
      await AsyncStorage.setItem("movimentacoes", JSON.stringify(movs));

      carregar();
    } }
  ]);
}


  if (!equipamento) return <View style={{ padding: 16 }}><Text>Carregando equipamento...</Text></View>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alugar: {equipamento.nome}</Text>

      <Text style={styles.label}>Funcionário responsável</Text>
      <TextInput style={styles.input} value={funcionario} onChangeText={setFuncionario} />

      <Text style={styles.label}>Nome do cliente</Text>
      <TextInput style={styles.input} value={cliente} onChangeText={setCliente} />

      <TouchableOpacity style={styles.btn} onPress={confirmarAluguel}><Text style={styles.btnTxt}>Confirmar Aluguel</Text></TouchableOpacity>

      <Text style={{ marginTop: 16, fontWeight: "700" }}>Histórico de aluguéis</Text>
      <FlatList
        data={aluguels}
        keyExtractor={(i: any) => i.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.cliente} — {item.funcionario} — {new Date(item.inicio).toLocaleString()}</Text>
            <Text>Valor: R$ {Number(item.valor || 0).toFixed(2)}</Text>
            <Text>Status: {item.devolucao ? `Devolvido em ${new Date(item.devolucao).toLocaleString()}` : "Em aberto"}</Text>
            <Button title="Excluir Aluguel (Devolver)" onPress={() => deletarAluguel(item.id)} />
          </View>
        )}
        ListEmptyComponent={() => <Text style={{ color: "#666" }}>Nenhum aluguel registrado.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 12 },
  label: { marginTop: 8 },
  input: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#ddd", padding: 10, borderRadius: 8, marginTop: 6 },
  btn: { backgroundColor: "#2B8AF6", padding: 12, borderRadius: 10, marginTop: 12, alignItems: "center" },
  btnTxt: { color: "#fff", fontWeight: "700" },
  card: { padding: 10, borderWidth: 1, borderColor: "#eee", borderRadius: 8, marginTop: 8 },
});
