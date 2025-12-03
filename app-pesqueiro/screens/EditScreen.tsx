// EditScreen.tsx
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EditScreen({ navigation }: any) {
  const [pesqueiro, setPesqueiro] = useState<any>(null);
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    carregar();
    navigation.addListener("focus", carregar);
  }, []);

  async function carregar() {
    const raw = await AsyncStorage.getItem("pesqueiroAtual");
    if (!raw) return;
    const p = JSON.parse(raw);
    setPesqueiro(p);
    setNome(p.nome ?? "");
    setEndereco(p.endereco ?? "");
    setTelefone(p.telefone ?? "");
    setDescricao(p.descricao ?? "");
  }

  async function salvar() {
    if (!pesqueiro) return;
    const raw = await AsyncStorage.getItem("pesqueiros");
    const arr = raw ? JSON.parse(raw) : [];
    const idx = arr.findIndex((x: any) => x.id === pesqueiro.id);
    if (idx >= 0) {
      arr[idx] = { ...arr[idx], nome, endereco, telefone, descricao };
      await AsyncStorage.setItem("pesqueiros", JSON.stringify(arr));
      await AsyncStorage.setItem("pesqueiroAtual", JSON.stringify(arr[idx]));
      Alert.alert("Sucesso", "Dados atualizados");
      navigation.goBack();
    } else {
      Alert.alert("Erro", "Pesqueiro não encontrado");
    }
  }

  if (!pesqueiro) return <SafeAreaView><Text>Carregando...</Text></SafeAreaView>;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 12 }}>
          <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 12 }}>Editar Pesqueiro</Text>

          <Text>Nome</Text>
          <TextInput style={styles.input} value={nome} onChangeText={setNome} />

          <Text>Endereço</Text>
          <TextInput style={styles.input} value={endereco} onChangeText={setEndereco} />

          <Text>Telefone</Text>
          <TextInput style={styles.input} value={telefone} onChangeText={setTelefone} keyboardType="phone-pad" />

          <Text>Descrição</Text>
          <TextInput style={[styles.input, { height: 120 }]} value={descricao} onChangeText={setDescricao} multiline />

          <TouchableOpacity style={styles.btn} onPress={salvar}>
            <Text style={styles.btnTxt}>Salvar alterações</Text>
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
