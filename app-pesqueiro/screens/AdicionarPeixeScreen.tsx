import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

export default function AdicionarPeixeScreen({ route, navigation }: any) {
  const lagoId = route.params?.lagoId;

  const [nome, setNome] = useState("");
  const [pesoKg, setPesoKg] = useState("");
  const [precoCompraKg, setPrecoCompraKg] = useState("");
  const [precoVendaKg, setPrecoVendaKg] = useState("");

  async function salvar() {
    if (!nome || !pesoKg || !precoCompraKg || !precoVendaKg) {
      Alert.alert("Preencha todos os campos!");
      return;
    }

    const raw = await AsyncStorage.getItem("lagos");
    const lagos = raw ? JSON.parse(raw) : [];

    const index = lagos.findIndex((l: any) => l.id === lagoId);
    if (index === -1) return;

    const novoPeixe = {
      id: uuid.v4(),
      nome,
      quantidadeKg: parseFloat(pesoKg),
      precoCompraKg: parseFloat(precoCompraKg),
      precoVendaKg: parseFloat(precoVendaKg),
    };

    lagos[index].peixes.push(novoPeixe);

    await AsyncStorage.setItem("lagos", JSON.stringify(lagos));

    navigation.navigate("PeixesDoLago", { lagoId });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Peixe</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Quantidade em KG"
        keyboardType="numeric"
        value={pesoKg}
        onChangeText={setPesoKg}
      />

      <TextInput
        style={styles.input}
        placeholder="Preço COMPRA (R$/kg)"
        keyboardType="numeric"
        value={precoCompraKg}
        onChangeText={setPrecoCompraKg}
      />

      <TextInput
        style={styles.input}
        placeholder="Preço VENDA (R$/kg)"
        keyboardType="numeric"
        value={precoVendaKg}
        onChangeText={setPrecoVendaKg}
      />

      <TouchableOpacity style={styles.btn} onPress={salvar}>
        <Text style={styles.btnTxt}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 12 },
  input: {
    backgroundColor: "#eee",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  btn: { backgroundColor: "#2B8AF6", padding: 14, borderRadius: 10 },
  btnTxt: { textAlign: "center", fontWeight: "700", color: "#fff" },
});
