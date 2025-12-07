// screens/AdicionarLagoScreen.tsx
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AdicionarLagoScreen({ navigation, route }: any) {
  const pesqueiroId = route?.params?.pesqueiroId ?? null;
  const [nome, setNome] = useState("");

  async function salvar() {
    if (!nome.trim()) { Alert.alert("Erro", "Digite o nome do lago"); return; }
    try {
      const raw = await AsyncStorage.getItem("lagos");
      const arr = raw ? JSON.parse(raw) : [];
      const novo = { id: Date.now().toString(), pesqueiroId, nome: nome.trim(), peixes: [], createdAt: new Date().toISOString() };
      arr.push(novo);
      await AsyncStorage.setItem("lagos", JSON.stringify(arr));
      navigation.navigate("Lagos", { pesqueiroId });
    } catch (err) {
      console.log("erro salvar lago", err);
      Alert.alert("Erro", "Não foi possível salvar o lago");
    }
  }

  return (
    <View style={{ padding: 16, flex: 1 }}>
      <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 12 }}>Criar Lago</Text>
      <Text>Nome</Text>
      <TextInput style={{ borderWidth: 1, borderColor: "#ddd", padding: 10, borderRadius: 8, marginTop: 6 }} value={nome} onChangeText={setNome} />
      <TouchableOpacity style={{ backgroundColor: "#2B8AF6", padding: 12, borderRadius: 10, marginTop: 12 }} onPress={salvar}>
        <Text style={{ color: "#fff", textAlign: "center", fontWeight: "700" }}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}
