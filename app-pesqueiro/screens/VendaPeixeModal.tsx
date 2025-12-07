// screens/VendaPeixeModal.tsx
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

export default function VendaPeixeModal({ route, navigation }: any) {
  const { lagoId, peixe } = route.params;
  const [kgVenda, setKgVenda] = useState("");

  async function registrarMovimentacao(total: number, kg: number) {
  const raw = await AsyncStorage.getItem("movimentacoes");
  const arr = raw ? JSON.parse(raw) : [];

  const nova = {
    id: Date.now().toString(),
    tipo: "venda_peixe",
    peixe: peixe.nome,
    quantidade: kg,     // ← CORRIGIDO AQUI!
    valor: total,
    data: new Date().toISOString(),
  };

  arr.push(nova);
  await AsyncStorage.setItem("movimentacoes", JSON.stringify(arr));
}

  async function confirmarVenda() {
    const kg = parseFloat(kgVenda);

    if (!kgVenda || isNaN(kg) || kg <= 0) {
      Alert.alert("Digite a quantidade válida em KG");
      return;
    }

    if (kg > peixe.quantidadeKg) {
      Alert.alert("Quantidade maior que o disponível!");
      return;
    }

    const total = kg * peixe.precoVendaKg;

    const raw = await AsyncStorage.getItem("lagos");
    let arr = raw ? JSON.parse(raw) : [];

    const idx = arr.findIndex((l: any) => l.id === lagoId);
    if (idx === -1) return;

    const pidx = arr[idx].peixes.findIndex((p: any) => p.id === peixe.id);
    if (pidx === -1) return;

    // Subtrai do estoque
    arr[idx].peixes[pidx].quantidadeKg -= kg;

    await AsyncStorage.setItem("lagos", JSON.stringify(arr));

    // REGISTRA A MOVIMENTAÇÃO
    await registrarMovimentacao(total, kg);

    Alert.alert("Venda realizada!", `Total: R$ ${total.toFixed(2)}`, [
      {
        text: "OK",
        onPress: () =>
          navigation.navigate("DrawerApp", {
            screen: "PeixesDoLago",
            params: { lagoId },
          }),
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vender {peixe.nome}</Text>

      <Text style={styles.label}>Disponível: {peixe.quantidadeKg} KG</Text>
      <Text style={styles.label}>
        Preço de venda: R$ {peixe.precoVendaKg}/kg
      </Text>

      <TextInput
        placeholder="KG para vender"
        value={kgVenda}
        onChangeText={setKgVenda}
        keyboardType="numeric"
        style={styles.input}
      />

      {kgVenda ? (
        <Text style={styles.total}>
          Total: R$ {(Number(kgVenda) * peixe.precoVendaKg).toFixed(2)}
        </Text>
      ) : null}

      <TouchableOpacity style={styles.btn} onPress={confirmarVenda}>
        <Text style={styles.btnTxt}>Confirmar Venda</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btn, { backgroundColor: "#777", marginTop: 8 }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.btnTxt}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 18, flex: 1, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 14 },
  label: { fontSize: 16, marginTop: 4 },
  input: {
    backgroundColor: "#eee",
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  total: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  btn: {
    backgroundColor: "#2B8AF6",
    padding: 14,
    borderRadius: 10,
    marginTop: 24,
  },
  btnTxt: { color: "#fff", textAlign: "center", fontWeight: "700" },
});
