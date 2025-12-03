// RecordPesqueiroScreen.tsx
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RecordPesqueiroScreen({ navigation, route }: any) {
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    // Se estiver editando (recebe pesqueiroAtual)
    carregarAtual();
  }, []);

  async function carregarAtual() {
    const raw = await AsyncStorage.getItem("pesqueiroAtual");
    if (raw) {
      const p = JSON.parse(raw);
      setNome(p.nome ?? "");
      setEndereco(p.endereco ?? "");
      setTelefone(p.telefone ?? "");
      setDescricao(p.descricao ?? "");
    }
  }

  async function salvar() {
    if (!nome.trim()) return Alert.alert("Erro", "Informe o nome");
    const raw = await AsyncStorage.getItem("pesqueiros");
    const arr = raw ? JSON.parse(raw) : [];

    const novo = {
      id: Date.now().toString(),
      nome: nome.trim(),
      endereco: endereco.trim(),
      telefone: telefone.trim(),
      descricao: descricao.trim(),
      proprietario: true,
      createdAt: new Date().toISOString(),
    };

    arr.push(novo);
    await AsyncStorage.setItem("pesqueiros", JSON.stringify(arr));
    await AsyncStorage.setItem("pesqueiroAtual", JSON.stringify(novo));

    // Vai para PesqueiroInfo dentro do Drawer
    navigation.navigate("DrawerApp", { screen: "PesqueiroInfo", params: { pesqueiroId: novo.id } });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 12 }}>
          <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 12 }}>Registrar Pesqueiro</Text>

          <Text>Nome</Text>
          <TextInput style={styles.input} value={nome} onChangeText={setNome} />

          <Text>Endereço</Text>
          <TextInput style={styles.input} value={endereco} onChangeText={setEndereco} />

          <Text>Telefone</Text>
          <TextInput style={styles.input} value={telefone} onChangeText={setTelefone} keyboardType="phone-pad" />

          <Text>Descrição</Text>
          <TextInput style={[styles.input, { height: 120 }]} value={descricao} onChangeText={setDescricao} multiline />

          <TouchableOpacity style={styles.btn} onPress={salvar}>
            <Text style={styles.btnTxt}>Cadastrar e abrir página do pesqueiro</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: { borderWidth: 1, borderColor: "#ddd", padding: 8, borderRadius: 8, marginBottom: 12 },
  btn: { backgroundColor: "#2B8AF6", padding: 14, borderRadius: 10, marginTop: 10 },
  btnTxt: { color: "#fff", fontWeight: "700", textAlign: "center" },
});
