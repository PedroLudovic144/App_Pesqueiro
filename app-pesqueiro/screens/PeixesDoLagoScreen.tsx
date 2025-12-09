// screens/PeixesDoLagoScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PeixesDoLagoScreen({ route, navigation }: any) {
  const lagoId = route.params?.lagoId;
  const [lago, setLago] = useState<any>(null);

  useEffect(() => {
    carregar();
    const unsub = navigation.addListener("focus", carregar);
    return unsub;
  }, []);

  async function carregar() {
    const raw = await AsyncStorage.getItem("lagos");
    const arr = raw ? JSON.parse(raw) : [];
    const encontrado = arr.find((l: any) => l.id === lagoId);
    setLago(encontrado);
  }

  async function deletarPeixe(idPeixe: string) {
    Alert.alert("Excluir peixe?", "Isso não pode ser desfeito.", [
      { text: "Cancelar" },
      {
        text: "OK",
        onPress: async () => {
          const raw = await AsyncStorage.getItem("lagos");
          let arr = raw ? JSON.parse(raw) : [];
          const idx = arr.findIndex((l: any) => l.id === lagoId);
          if (idx === -1) return;

          arr[idx].peixes = (arr[idx].peixes || []).filter(
            (p: any) => p.id !== idPeixe
          );

          await AsyncStorage.setItem("lagos", JSON.stringify(arr));
          carregar();
        },
      },
    ]);
  }

  async function removerMorte(idPeixe: string) {
    const raw = await AsyncStorage.getItem("lagos");
    let arr = raw ? JSON.parse(raw) : [];

    const idx = arr.findIndex((l: any) => l.id === lagoId);
    if (idx === -1) return;

    const pidx = arr[idx].peixes.findIndex((p: any) => p.id === idPeixe);
    if (pidx === -1) return;

    arr[idx].peixes[pidx].quantidadeKg = Math.max(
      0,
      arr[idx].peixes[pidx].quantidadeKg - 1
    );

    await AsyncStorage.setItem("lagos", JSON.stringify(arr));
    carregar();
  }

  function venderPeixe(peixe: any) {
    navigation.navigate("VendaPeixeModal", { lagoId, peixe });
  }

  if (!lago)
    return (
      <View style={{ padding: 16 }}>
        <Text>Carregando...</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Peixes do Lago {lago.nome}</Text>

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => navigation.navigate("AdicionarPeixe", { lagoId })}
      >
        <Text style={styles.addTxt}>+ Adicionar Peixe</Text>
      </TouchableOpacity>

      <FlatList
        data={lago.peixes || []}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text>Quantidade (KG): {item.quantidadeKg}</Text>
              <Text>Preço COMPRA (R$/kg): {item.precoCompraKg}</Text>
              <Text>Preço VENDA (R$/kg): {Number(item.precoVendaKg || 0).toFixed(2)}</Text>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: "#2B8AF6" }]}
                onPress={() => venderPeixe(item)}
              >
                <Text style={styles.actionTxt}>Vender</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: "#FFA726" }]}
                onPress={() => removerMorte(item.id)}
              >
                <Text style={styles.actionTxt}>-1 KG</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: "#E53935" }]}
                onPress={() => deletarPeixe(item.id)}
              >
                <Text style={styles.actionTxt}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <Text style={{ marginTop: 20, color: "#666" }}>
            Nenhum peixe registrado.
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 12 },
  addBtn: {
    backgroundColor: "#2B8AF6",
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  addTxt: { color: "#fff", textAlign: "center", fontWeight: "700" },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#eee",
    flexDirection: "row",
  },
  nome: { fontSize: 18, fontWeight: "700", marginBottom: 4 },
  actions: { justifyContent: "space-between", alignItems: "flex-end" },
  actionBtn: { padding: 8, borderRadius: 8, marginBottom: 6 },
  actionTxt: { color: "#fff", fontWeight: "700" },
});
