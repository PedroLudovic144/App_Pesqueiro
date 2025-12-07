// screens/CriarMovimentacao.tsx
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

export default function CriarMovimentacao({ navigation }: any) {
  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState<"entrada" | "saida" | null>(null);

  async function salvar() {
    if (!descricao || !quantidade || !valor || !tipo) {
      return Alert.alert("Preencha todos os campos!");
    }

    const total = Number(quantidade) * Number(valor);

    const nova = {
      id: Date.now().toString(),
      descricao,
      quantidade: Number(quantidade),
      valor: Number(valor),
      total,
      tipo,
      data: new Date().toISOString(),
    };

    const raw = await AsyncStorage.getItem("movimentacoes");
    const arr = raw ? JSON.parse(raw) : [];

    arr.push(nova);
    await AsyncStorage.setItem("movimentacoes", JSON.stringify(arr));

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Movimentação</Text>

      <TextInput
        placeholder="Descrição"
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
      />

      <TextInput
        placeholder="Quantidade"
        keyboardType="numeric"
        style={styles.input}
        value={quantidade}
        onChangeText={setQuantidade}
      />

      <TextInput
        placeholder="Valor Unitário"
        keyboardType="numeric"
        style={styles.input}
        value={valor}
        onChangeText={setValor}
      />

      <Text style={styles.sub}>Tipo:</Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.tipoBtn, tipo === "entrada" && styles.sel]}
          onPress={() => setTipo("entrada")}
        >
          <Text style={styles.tipoTxt}>Entrada</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tipoBtn, tipo === "saida" && styles.selSaida]}
          onPress={() => setTipo("saida")}
        >
          <Text style={styles.tipoTxt}>Saída</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.save} onPress={salvar}>
        <Text style={styles.saveTxt}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
  },
  sub: { fontSize: 16, fontWeight: "600", marginBottom: 6 },
  row: { flexDirection: "row", gap: 10 },
  tipoBtn: {
    flex: 1,
    backgroundColor: "#dfe6e9",
    padding: 12,
    borderRadius: 8,
  },
  sel: { backgroundColor: "#55efc4" },
  selSaida: { backgroundColor: "#ff7675" },
  tipoTxt: { textAlign: "center", fontWeight: "700" },
  save: {
    backgroundColor: "#0984e3",
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
  },
  saveTxt: { textAlign: "center", color: "#fff", fontWeight: "700" },
});
