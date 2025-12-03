// AdicionarPeixeScreen.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AdicionarPeixeScreen({ route, navigation }: any) {
  const { lagoId } = route.params;
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [valor, setValor] = useState("");

  async function salvar() {
    if (!nome.trim()) return Alert.alert("Erro", "Nome inválido");
    if (!quantidade || Number(quantidade) <= 0)
      return Alert.alert("Erro", "Quantidade inválida");
    if (!valor || Number(valor) <= 0)
      return Alert.alert("Erro", "Valor inválido");

    const raw = await AsyncStorage.getItem("lagos");
    const arr = raw ? JSON.parse(raw) : [];

    const idx = arr.findIndex((l: any) => l.id === lagoId);
    if (idx < 0) return;

    arr[idx].peixes.push({
      id: Date.now().toString(),
      nome,
      quantidade: Number(quantidade),
      valor: Number(valor),
    });

    await AsyncStorage.setItem("lagos", JSON.stringify(arr));

    Alert.alert("Sucesso", "Peixe adicionado!");
    navigation.goBack();
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Adicionar peixe ao lago</Text>

        <TextInput
          placeholder="Nome do peixe"
          style={styles.input}
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          placeholder="Quantidade"
          style={styles.input}
          keyboardType="numeric"
          value={quantidade}
          onChangeText={setQuantidade}
        />

        <TextInput
          placeholder="Valor por unidade"
          style={styles.input}
          keyboardType="numeric"
          value={valor}
          onChangeText={setValor}
        />

        <TouchableOpacity style={styles.btn} onPress={salvar}>
          <Text style={styles.btnTxt}>Salvar Peixe</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  btn: {
    backgroundColor: "#2B8AF6",
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  btnTxt: { textAlign: "center", color: "#fff", fontWeight: "700" },
});
