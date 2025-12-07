// screens/MovementsScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MovementsScreen({ navigation }: any) {
  const [movs, setMovs] = useState<any[]>([]);

  useEffect(() => {
    const unsub = navigation.addListener("focus", carregar);
    return unsub;
  }, []);

  async function carregar() {
    const raw = await AsyncStorage.getItem("movimentacoes");
    setMovs(raw ? JSON.parse(raw) : []);
  }

  async function excluirMov(id: string) {
    const dados = movs.filter((m) => m.id !== id);
    await AsyncStorage.setItem("movimentacoes", JSON.stringify(dados));
    setMovs(dados);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movimentações</Text>

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => navigation.navigate("CriarMovimentacao")}
      >
        <Text style={styles.addTxt}>+ Nova Movimentação</Text>
      </TouchableOpacity>

      <FlatList
        data={movs}
        keyExtractor={(i: any) => i.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.tipo}>
              {item.tipo === "entrada" ? "🟢 ENTRADA" : "🔴 SAÍDA"}
            </Text>

            <Text style={styles.desc}>{item.descricao}</Text>
            <Text style={styles.info}>Qtd: {item.quantidade}</Text>
            <Text style={styles.info}>
              Valor: R$ {Number(item.valor).toFixed(2)}
            </Text>
            <Text style={styles.info}>
              Total: R$ {Number(item.total).toFixed(2)}
            </Text>

            <Text style={styles.data}>
              {new Date(item.data).toLocaleString()}
            </Text>

            <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
              <TouchableOpacity
                style={styles.editBtn}
                onPress={() =>
                  navigation.navigate("EditarMovimentacao", { mov: item })
                }
              >
                <Text style={styles.editTxt}>Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => excluirMov(item.id)}
              >
                <Text style={styles.removeTxt}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <Text style={{ textAlign: "center", marginTop: 20, color: "#666" }}>
            Nenhuma movimentação cadastrada.
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 12 },
  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  tipo: { fontSize: 16, fontWeight: "700", marginBottom: 4 },
  desc: { fontSize: 16, marginBottom: 4 },
  info: { fontSize: 14 },
  data: { fontSize: 12, color: "#555", marginTop: 6 },
  removeBtn: {
    backgroundColor: "#d63031",
    padding: 8,
    borderRadius: 8,
    flex: 1,
  },
  removeTxt: { color: "#fff", textAlign: "center", fontWeight: "700" },
  editBtn: {
    backgroundColor: "#0984e3",
    padding: 8,
    borderRadius: 8,
    flex: 1,
  },
  editTxt: { color: "#fff", textAlign: "center", fontWeight: "700" },
  addBtn: {
    backgroundColor: "#00b894",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  addTxt: { color: "#fff", fontWeight: "700", textAlign: "center" },
});
