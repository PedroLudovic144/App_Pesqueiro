// screens/AdicionarEquipamentoScreen.tsx
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AdicionarEquipamentoScreen({ navigation, route }: any) {
  const pesqueiroId = route?.params?.pesqueiroId ?? null;
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [precoAluguel, setPrecoAluguel] = useState("");
  const [precoCompra, setPrecoCompra] = useState("");

  async function salvar() {
    if (!nome.trim()) { Alert.alert("Erro", "Informe o nome"); return; }
    const q = Number(quantidade) || 0;
    if (q <= 0) { Alert.alert("Erro", "Quantidade inválida"); return; }

    try {
      const raw = await AsyncStorage.getItem("equipamentos");
      const arr = raw ? JSON.parse(raw) : [];
      const novo = { id: Date.now().toString(), nome: nome.trim(), descricao: descricao.trim(), quantidade: q, precoAluguel: Number(precoAluguel) || 0, precoCompra: Number(precoCompra) || 0, pesqueiroId };
      arr.push(novo);
      await AsyncStorage.setItem("equipamentos", JSON.stringify(arr));

      // registrar movimentacao de compra = precoCompra * quantidade
      if ((Number(precoCompra) || 0) > 0) {
        const movimento = { id: Date.now().toString() + "_c", tipo: "compra_equipamento", valor: (Number(precoCompra) || 0) * (Number(quantidade) || 1), referenciaId: novo.id, descricao: `Compra ${novo.nome} x${quantidade}`, data: new Date().toISOString() };
        const rawMov = await AsyncStorage.getItem("movimentacoes");
        const movs = rawMov ? JSON.parse(rawMov) : [];
        movs.push(movimento);
        await AsyncStorage.setItem("movimentacoes", JSON.stringify(movs));
      }

      navigation.navigate("ListaEquipamentos");
    } catch (err) {
      console.log("Erro salvar equipamento:", err);
      Alert.alert("Erro", "Não foi possível salvar o equipamento.");
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 12 }}>Adicionar Equipamento</Text>
        <Text>Nome</Text>
        <TextInput style={styles.input} value={nome} onChangeText={setNome} />
        <Text>Descrição</Text>
        <TextInput style={styles.input} value={descricao} onChangeText={setDescricao} />
        <Text>Quantidade</Text>
        <TextInput style={styles.input} value={quantidade} keyboardType="numeric" onChangeText={setQuantidade} />
        <Text>Preço do aluguel (R$)</Text>
        <TextInput style={styles.input} value={precoAluguel} keyboardType="numeric" onChangeText={setPrecoAluguel} />
        <Text>Preço de compra (por unidade) (R$)</Text>
        <TextInput style={styles.input} value={precoCompra} keyboardType="numeric" onChangeText={setPrecoCompra} />
        <TouchableOpacity style={styles.btn} onPress={salvar}><Text style={styles.btnTxt}>Salvar</Text></TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  input: { borderWidth: 1, borderColor: "#ddd", padding: 10, borderRadius: 8, marginTop: 6, marginBottom: 10 },
  btn: { backgroundColor: "#2B8AF6", padding: 14, borderRadius: 10, marginTop: 10 },
  btnTxt: { color: "#fff", textAlign: "center", fontWeight: "700" },
});
