// AdicionarEquipamentoScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AdicionarEquipamentoScreen({ navigation }: any) {
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");

  async function salvar() {
    if (!nome.trim()) return Alert.alert("Erro", "Nome inválido");
    if (!valor || Number(valor) <= 0) return Alert.alert("Erro", "Valor inválido");

    const raw = await AsyncStorage.getItem("equipamentos");
    const arr = raw ? JSON.parse(raw) : [];

    arr.push({
      id: Date.now().toString(),
      nome,
      valor: Number(valor),
      alugado: false,
    });

    await AsyncStorage.setItem("equipamentos", JSON.stringify(arr));

    Alert.alert("Sucesso", "Equipamento adicionado!");
    navigation.goBack();
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Adicionar Equipamento</Text>

        <TextInput
          placeholder="Nome"
          style={styles.input}
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          placeholder="Preço do aluguel"
          style={styles.input}
          keyboardType="numeric"
          value={valor}
          onChangeText={setValor}
        />

        <TouchableOpacity style={styles.btn} onPress={salvar}>
          <Text style={styles.btnTxt}>Salvar</Text>
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
