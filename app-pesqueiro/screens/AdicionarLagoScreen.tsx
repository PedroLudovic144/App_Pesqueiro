// AdicionarLagoScreen.tsx
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
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

export default function AdicionarLagoScreen({ navigation }: any) {
  const [nome, setNome] = useState("");

  async function salvar() {
    if (!nome.trim()) {
      alert("Digite o nome do lago!");
      return;
    }

    const raw = await AsyncStorage.getItem("lagos");
    const arr = raw ? JSON.parse(raw) : [];

    const novo = {
      id: uuid.v4(),
      nome,
      peixes: [],
    };

    arr.push(novo);

    await AsyncStorage.setItem("lagos", JSON.stringify(arr));

    navigation.goBack();
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Criar Lago</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome do lago"
          value={nome}
          onChangeText={setNome}
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
  title: { fontSize: 22, fontWeight: "700", marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  btn: {
    backgroundColor: "#2B8AF6",
    padding: 14,
    borderRadius: 12,
  },
  btnTxt: { color: "#fff", textAlign: "center", fontWeight: "700" },
});
