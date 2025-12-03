// PeixesDoLagoScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import VendaPeixeModal from "./VendaPeixeModal";

export default function PeixesDoLagoScreen({ route, navigation }: any) {
  const { lagoId } = route.params;
  const [lago, setLago] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [peixeSelecionado, setPeixeSelecionado] = useState<any>(null);

  useEffect(() => {
    carregar();
    navigation.addListener("focus", carregar);
  }, []);

  async function carregar() {
    const raw = await AsyncStorage.getItem("lagos");
    const arr = raw ? JSON.parse(raw) : [];

    const lagoAtual = arr.find((l: any) => l.id === lagoId);
    setLago(lagoAtual);
  }

  function abrirVenda(peixe: any) {
    setPeixeSelecionado(peixe);
    setModalVisible(true);
  }

  async function venderPeixe(idPeixe: string, qtd: number) {
    const raw = await AsyncStorage.getItem("lagos");
    const arr = raw ? JSON.parse(raw) : [];

    const idx = arr.findIndex((l: any) => l.id === lagoId);
    if (idx < 0) return;

    const peixeIdx = arr[idx].peixes.findIndex((p: any) => p.id === idPeixe);
    if (peixeIdx < 0) return;

    arr[idx].peixes[peixeIdx].quantidade -= qtd;

    if (arr[idx].peixes[peixeIdx].quantidade <= 0) {
      arr[idx].peixes.splice(peixeIdx, 1); // remove peixe
    }

    await AsyncStorage.setItem("lagos", JSON.stringify(arr));

    carregar();
  }

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <Text style={styles.title}>Peixes do lago "{lago?.nome}"</Text>

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => navigation.navigate("AdicionarPeixe", { lagoId })}
      >
        <Text style={styles.addTxt}>➕ Adicionar Peixe</Text>
      </TouchableOpacity>

      <FlatList
        data={lago?.peixes ?? []}
        keyExtractor={(i: any) => i.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text>{item.quantidade} unidades</Text>
            <Text>R$ {item.valor}</Text>

            <TouchableOpacity
              style={styles.venderBtn}
              onPress={() => abrirVenda(item)}
            >
              <Text style={styles.venderTxt}>Vender</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <VendaPeixeModal
        visible={modalVisible}
        peixe={peixeSelecionado}
        onClose={() => setModalVisible(false)}
        onConfirm={(qtd: number) => {
          venderPeixe(peixeSelecionado.id, qtd);
          setModalVisible(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: "700", marginBottom: 12 },
  card: { padding: 12, borderWidth: 1, borderColor: "#ddd", borderRadius: 10, marginBottom: 10 },
  nome: { fontSize: 18, fontWeight: "700" },
  addBtn: { backgroundColor: "#2B8AF6", padding: 12, borderRadius: 10, marginBottom: 12 },
  addTxt: { color: "#fff", textAlign: "center", fontWeight: "700" },
  venderBtn: { backgroundColor: "#28a745", padding: 10, borderRadius: 8, marginTop: 10 },
  venderTxt: { color: "#fff", textAlign: "center", fontWeight: "700" },
});
