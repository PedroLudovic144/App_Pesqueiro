// AluguelScreen.tsx
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Button, TextInput, FlatList, Alert, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AluguelScreen({ route, navigation }: any) {
  const equipamentoId = route?.params?.equipamentoId;
  const [equipamento, setEquipamento] = useState<any>(null);
  const [nomeCliente, setNomeCliente] = useState("");
  const [alugueis, setAlugueis] = useState<any[]>([]);

  useEffect(() => {
    carregar();
    const unsub = navigation.addListener("focus", carregar);
    return unsub;
  }, []);

  async function carregar() {
    const rawE = await AsyncStorage.getItem("equipamentos");
    const arrE = rawE ? JSON.parse(rawE) : [];
    setEquipamento(arrE.find((e: any) => e.id === equipamentoId));

    const rawA = await AsyncStorage.getItem("alugueis");
    const arrA = rawA ? JSON.parse(rawA) : [];
    setAlugueis(arrA.filter((a: any) => a.equipamentoId === equipamentoId));
  }

  async function registrar() {
    if (!nomeCliente.trim()) { Alert.alert("Erro", "Digite o nome do cliente"); return; }
    const rawE = await AsyncStorage.getItem("equipamentos");
    const arrE = rawE ? JSON.parse(rawE) : [];
    const idx = arrE.findIndex((e: any) => e.id === equipamentoId);
    if (idx === -1) return Alert.alert("Erro", "Equipamento não encontrado");
    if ((arrE[idx].quantidade || 0) <= 0) return Alert.alert("Indisponível", "Sem unidades disponíveis");

    arrE[idx].quantidade = Math.max(0, (arrE[idx].quantidade || 0) - 1);
    await AsyncStorage.setItem("equipamentos", JSON.stringify(arrE));

    const rawA = await AsyncStorage.getItem("alugueis");
    const arrA = rawA ? JSON.parse(rawA) : [];
    const novo = { id: Date.now().toString(), equipamentoId, equipamentoNome: arrE[idx].nome, clienteNome: nomeCliente, inicio: new Date().toISOString(), devolucao: null };
    arrA.push(novo);
    await AsyncStorage.setItem("alugueis", JSON.stringify(arrA));
    setNomeCliente("");
    carregar();
    Alert.alert("Sucesso", "Aluguel registrado.");
  }

  async function marcarDevolvido(id: string) {
    Alert.alert("Confirmar", "Marcar como devolvido?", [
      { text: "Cancelar" },
      {
        text: "OK", onPress: async () => {
          const rawA = await AsyncStorage.getItem("alugueis");
          const arrA = rawA ? JSON.parse(rawA) : [];
          const idx = arrA.findIndex((a: any) => a.id === id);
          if (idx === -1) return;
          arrA[idx].devolucao = new Date().toISOString();
          await AsyncStorage.setItem("alugueis", JSON.stringify(arrA));

          const rawE = await AsyncStorage.getItem("equipamentos");
          const arrE = rawE ? JSON.parse(rawE) : [];
          const idxE = arrE.findIndex((e: any) => e.id === equipamentoId);
          if (idxE >= 0) {
            arrE[idxE].quantidade = (Number(arrE[idxE].quantidade) || 0) + 1;
            await AsyncStorage.setItem("equipamentos", JSON.stringify(arrE));
          }

          carregar();
          Alert.alert("Sucesso", "Devolução registrada.");
        }
      }
    ]);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <View style={{ padding: 12 }}>
          <Text style={{ fontSize: 18, fontWeight: "700" }}>{equipamento?.nome ?? "Equipamento"}</Text>
          <Text>Quantidade disponível: {equipamento?.quantidade ?? 0}</Text>

          <TextInput placeholder="Nome do cliente" value={nomeCliente} onChangeText={setNomeCliente} style={styles.input} />

          <Button title="Registrar aluguel" onPress={registrar} />

          <View style={{ height: 12 }} />

          <Text style={{ fontWeight: "700" }}>Aluguéis</Text>
          <FlatList data={alugueis} keyExtractor={(i: any) => i.id} renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={{ fontWeight: "600" }}>{item.clienteNome}</Text>
              <Text>Início: {new Date(item.inicio).toLocaleString()}</Text>
              <Text>Status: {item.devolucao ? "Devolvido" : "Em aberto"}</Text>
              {!item.devolucao && <Button title="Marcar como devolvido" onPress={() => marcarDevolvido(item.id)} />}
            </View>
          )} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: { borderWidth: 1, borderColor: "#ddd", padding: 8, borderRadius: 8, marginVertical: 10 },
  card: { padding: 12, borderWidth: 1, borderColor: "#eee", borderRadius: 8, marginTop: 8 }
});
