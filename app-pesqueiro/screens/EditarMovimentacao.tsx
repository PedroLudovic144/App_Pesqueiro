// screens/EditarMovimentacao.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EditarMovimentacao({ route, navigation }: any) {
  const { mov } = route.params;

  const [descricao, setDescricao] = useState(mov.descricao);
  const [quantidade, setQuantidade] = useState(String(mov.quantidade));
  const [valor, setValor] = useState(String(mov.valor));
  const [tipo, setTipo] = useState<"entrada" | "saida">(mov.tipo);

  async function salvar() {
    const total = Number(quantidade) * Number(valor);

    const raw = await AsyncStorage.getItem("movimentacoes");
    const arr = raw ? JSON.parse(raw) : [];

    const index = arr.findIndex((x: any) => x.id === mov.id);
    arr[index] = {
      ...mov,
      descricao,
      quantidade: Number(quantidade),
      valor: Number(valor),
      total,
      tipo,
    };

    await AsyncStorage.setItem("movimentacoes", JSON.stringify(arr));

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Movimentação</Text>

      <TextInput
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
      />

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={quantidade}
        onChangeText={setQuantidade}
      />

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={valor}
        onChangeText={setValor}
      />

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
        <Text style={styles.saveTxt}>Salvar Alterações</Text>
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
    backgroundColor: "#6c5ce7",
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
  },
  saveTxt: { textAlign: "center", color: "#fff", fontWeight: "700" },
});
