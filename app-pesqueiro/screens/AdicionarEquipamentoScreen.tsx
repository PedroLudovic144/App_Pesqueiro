import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function AdicionarEquipamentoScreen() {
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [tipo, setTipo] = useState("");
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if ((route.params as any)?.item) {
      const { item } = route.params as any;
      setNome(item.nome);
      setQuantidade(item.quantidade);
      setTipo(item.tipo);
    }
  }, [route.params]);

  const salvarEquipamento = async () => {
  if (!nome || !quantidade || !tipo) {
    Alert.alert("Erro", "Preencha todos os campos!");
    return;
  }

  const novoEquipamento = { nome, quantidade, tipo };
  const equipamentosSalvos = JSON.parse(await AsyncStorage.getItem("equipamentos") || "[]");

  if ((route.params as any)?.index !== undefined) {
    equipamentosSalvos[(route.params as any).index] = novoEquipamento;
  } else {
    equipamentosSalvos.push(novoEquipamento);
  }

  await AsyncStorage.setItem("equipamentos", JSON.stringify(equipamentosSalvos));
  Alert.alert("Sucesso", "Equipamento salvo!");
  navigation.navigate("ListaEquipamentos"); // 👈 volta direto para a lista
};


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Adicionar Equipamento</Text>

      <TextInput placeholder="Nome do equipamento" style={styles.input} value={nome} onChangeText={setNome} />
      <TextInput
        placeholder="Quantidade disponível"
        style={styles.input}
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
      />
      <TextInput placeholder="Tipo de aluguel (hora, diária...)" style={styles.input} value={tipo} onChangeText={setTipo} />

      <TouchableOpacity style={styles.button} onPress={salvarEquipamento}>
        <Text style={styles.buttonText}>Salvar Equipamento</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 10, padding: 10, marginBottom: 15 },
  button: { backgroundColor: "#22c55e", padding: 15, borderRadius: 10, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
