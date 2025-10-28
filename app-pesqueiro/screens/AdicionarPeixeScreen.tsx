import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function AdicionarPeixeScreen() {
  const [especie, setEspecie] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [data, setData] = useState("");
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if ((route.params as any)?.item) {
      const { item } = route.params as any;
      setEspecie(item.especie);
      setQuantidade(item.quantidade);
      setData(item.data);
    }
  }, [route.params]);

  const salvarPeixe = async () => {
    if (!especie || !quantidade || !data) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    const novoPeixe = { especie, quantidade, data };
    const peixesSalvos = JSON.parse(await AsyncStorage.getItem("peixes") || "[]");

    if ((route.params as any)?.index !== undefined) {
      peixesSalvos[(route.params as any).index] = novoPeixe;
    } else {
      peixesSalvos.push(novoPeixe);
    }

    await AsyncStorage.setItem("peixes", JSON.stringify(peixesSalvos));
    Alert.alert("Sucesso", "Peixe salvo!");
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Adicionar Peixe</Text>

      <TextInput placeholder="Espécie" style={styles.input} value={especie} onChangeText={setEspecie} />
      <TextInput
        placeholder="Quantidade (kg)"
        style={styles.input}
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
      />
      <TextInput placeholder="Data de inserção (dd/mm/aaaa)" style={styles.input} value={data} onChangeText={setData} />

      <TouchableOpacity style={styles.button} onPress={salvarPeixe}>
        <Text style={styles.buttonText}>Salvar Peixe</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 10, padding: 10, marginBottom: 15 },
  button: { backgroundColor: "#3b82f6", padding: 15, borderRadius: 10, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
