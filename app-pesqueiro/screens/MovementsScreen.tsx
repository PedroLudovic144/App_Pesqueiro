// MovementsScreen.tsx
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AddMovementoModal from "./AddMovementoModal";

const genId = () => Date.now().toString() + Math.random().toString(16).slice(2);

export default function MovementsScreen({ navigation }: any) {
  const [movs, setMovs] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);

  useEffect(() => {
    carregar();
    const unsub = navigation.addListener("focus", carregar);
    return unsub;
  }, []);

  async function carregar() {
    const raw = await AsyncStorage.getItem("movimentacoes");
    const arr = raw ? JSON.parse(raw) : [];
    // normalizar tipo e ordenar por data/hora (assume dd/mm/yyyy)
    arr.forEach((m: any) => {
      if (m.tipo && typeof m.tipo === "string") m.tipo = m.tipo.toLowerCase();
    });
    arr.sort((a: any, b: any) => {
      // try to parse dd/mm/yyyy
      const pa = String(a.data || "").split("/");
      const pb = String(b.data || "").split("/");
      const da = pa.length === 3 ? new Date(+pa[2], +pa[1] - 1, +pa[0]) : new Date();
      const db = pb.length === 3 ? new Date(+pb[2], +pb[1] - 1, +pb[0]) : new Date();
      return db.getTime() - da.getTime();
    });
    setMovs(arr);
  }

  async function adicionar(m: any) {
    const raw = await AsyncStorage.getItem("movimentacoes");
    const arr = raw ? JSON.parse(raw) : [];
    m.id = genId();
    arr.push(m);
    await AsyncStorage.setItem("movimentacoes", JSON.stringify(arr));
    setModalVisible(false);
    carregar();
  }

  async function salvarEdicao(edited: any) {
    const raw = await AsyncStorage.getItem("movimentacoes");
    const arr = raw ? JSON.parse(raw) : [];
    const idx = arr.findIndex((x: any) => x.id === edited.id);
    if (idx >= 0) arr[idx] = edited;
    await AsyncStorage.setItem("movimentacoes", JSON.stringify(arr));
    setEditing(null);
    setModalVisible(false);
    carregar();
  }

  async function remover(id: string) {
    Alert.alert("Remover", "Deseja remover essa movimentação?", [
      { text: "Cancelar" },
      {
        text: "Remover",
        onPress: async () => {
          const raw = await AsyncStorage.getItem("movimentacoes");
          const arr = raw ? JSON.parse(raw) : [];
          const nova = arr.filter((x: any) => x.id !== id);
          await AsyncStorage.setItem("movimentacoes", JSON.stringify(nova));
          carregar();
        },
      },
    ]);
  }

  function abrirNovo() {
    setEditing(null);
    setModalVisible(true);
  }

  function abrirEditar(item: any) {
    setEditing(item);
    setModalVisible(true);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Movimentações</Text>
        <Button title="Adicionar" onPress={abrirNovo} />
      </View>

      <FlatList
        data={movs}
        keyExtractor={(i: any) => i.id}
        contentContainerStyle={{ padding: 12, paddingBottom: 40 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={styles.date}>{item.data} {item.hora ?? ""}</Text>
              <Text style={{ fontWeight: "700" }}>{item.tipo === "entrada" ? "➕ Entrada" : "➖ Saída"}</Text>
            </View>
            <Text>R$ {Number(item.valor).toFixed(2)}</Text>
            <Text>{item.produto}</Text>
            {item.observacao ? <Text style={{ color: "#666" }}>{item.observacao}</Text> : null}

            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Button title="Editar" onPress={() => abrirEditar(item)} />
              <View style={{ width: 8 }} />
              <Button title="Apagar" color="#cc3333" onPress={() => remover(item.id)} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => <View style={{ padding: 12 }}><Text>Nenhuma movimentação ainda.</Text></View>}
      />

      <AddMovementoModal
        visivel={modalVisible}
        onClose={() => { setModalVisible(false); setEditing(null); }}
        onSave={(m: any) => {
          if (editing) salvarEdicao({ ...editing, ...m });
          else adicionar(m);
        }}
        initialData={editing}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { padding: 12, backgroundColor: "#2B8AF6", flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  title: { color: "#fff", fontSize: 18, fontWeight: "700" },
  card: { padding: 12, borderWidth: 1, borderColor: "#eee", borderRadius: 8, marginBottom: 10 },
  date: { color: "#666" },
});
