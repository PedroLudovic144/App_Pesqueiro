// RegisterPesqueiroScreen.tsx
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, Button, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const genId = () => Date.now().toString() + Math.random().toString(16).slice(2);

export default function RegisterPesqueiroScreen({ navigation, route }: any) {
  const user = route?.params?.user ?? { id: "owner" };
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");

  async function salvar() {
    if (!nome.trim()) { Alert.alert("Erro","Informe o nome"); return; }
    const raw = await AsyncStorage.getItem("pesqueiros");
    const arr = raw ? JSON.parse(raw) : [];
    const novo = { id: genId(), nome: nome.trim(), endereco: endereco.trim(), proprietarioId: user.id, createdAt: new Date().toISOString() };
    arr.push(novo);
    await AsyncStorage.setItem("pesqueiros", JSON.stringify(arr));
    await AsyncStorage.setItem("pesqueiroAtual", JSON.stringify(novo));
    navigation.navigate("PesqueiroInfo", { pesqueiroId: novo.id });
  }

  return (
    <SafeAreaView style={{flex:1}}>
      <KeyboardAvoidingView behavior={Platform.OS==='ios'? 'padding': undefined} style={{flex:1}}>
        <ScrollView contentContainerStyle={{padding:12}}>
          <Text style={{fontSize:18,fontWeight:"700"}}>Registrar novo pesqueiro</Text>
          <Text>Nome</Text>
          <TextInput style={styles.input} value={nome} onChangeText={setNome} />
          <Text>Endereço</Text>
          <TextInput style={styles.input} value={endereco} onChangeText={setEndereco} />
          <Button title="Registrar e abrir página do pesqueiro" onPress={salvar} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ input:{borderWidth:1,borderColor:"#ddd",padding:8,borderRadius:8, marginBottom:10} });
