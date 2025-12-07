// screens/ListaEquipamentosScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ListaEquipamentosScreen({ navigation }: any) {
  const [equipamentos, setEquipamentos] = useState<any[]>([]);

  useEffect(() => {
    carregar();
    const unsub = navigation.addListener("focus", carregar);
    return unsub;
  }, []);

  async function carregar() {
    const raw = await AsyncStorage.getItem("equipamentos");
    setEquipamentos(raw ? JSON.parse(raw) : []);
  }

  async function excluirEquipamento(id: string) {
    Alert.alert("Excluir equipamento?", "Isso removerá o item permanentemente.", [
      { text: "Cancelar" },
      { text: "OK", onPress: async () => {
        const raw = await AsyncStorage.getItem("equipamentos");
        let arr = raw ? JSON.parse(raw) : [];
        arr = arr.filter((e: any) => e.id !== id);
        await AsyncStorage.setItem("equipamentos", JSON.stringify(arr));
        carregar();
      } }
    ]);
  }

  async function removerUmaUnidade(id: string) {
    Alert.alert("Remover 1 unidade?", undefined, [
      { text: "Cancelar" },
      { text: "OK", onPress: async () => {
        const raw = await AsyncStorage.getItem("equipamentos");
        let arr = raw ? JSON.parse(raw) : [];
        const idx = arr.findIndex((e: any) => e.id === id);
        if (idx === -1) return;
        arr[idx].quantidade = Math.max(0, (Number(arr[idx].quantidade) || 0) - 1);
        await AsyncStorage.setItem("equipamentos", JSON.stringify(arr));
        carregar();
      } }
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Equipamentos</Text>

      <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate("AdicionarEquipamento")}>
        <Text style={styles.addTxt}>+ Adicionar Equipamento</Text>
      </TouchableOpacity>

      <FlatList
        data={equipamentos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text>Qtd: {item.quantidade}</Text>
              <Text>Aluguel: R$ {Number(item.precoAluguel || 0).toFixed(2)}</Text>
            </View>

            <View style={{ alignItems: "flex-end" }}>
              <TouchableOpacity style={[styles.btn, { backgroundColor: item.quantidade > 0 ? "#2B8AF6" : "#999" }]} disabled={item.quantidade === 0} onPress={() => navigation.navigate("Aluguel", { equipamentoId: item.id })}>
                <Text style={styles.btnTxtSmall}>{item.quantidade === 0 ? "Indisponível" : "Aluguéis"}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.btn, { marginTop: 8 }]} onPress={() => removerUmaUnidade(item.id)}>
                <Text style={styles.btnTxtSmall}>-1</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.btn, { marginTop: 8, backgroundColor: "#E53935" }]} onPress={() => excluirEquipamento(item.id)}>
                <Text style={styles.btnTxtSmall}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={() => <Text style={{ color: "#666" }}>Nenhum equipamento cadastrado.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 12 },
  addBtn: { backgroundColor: "#2B8AF6", padding: 12, borderRadius: 10, marginBottom: 12 },
  addTxt: { color: "#fff", fontWeight: "700", textAlign: "center" },
  card: { backgroundColor: "#fff", padding: 12, borderRadius: 10, borderWidth: 1, borderColor: "#eee", marginBottom: 10, flexDirection: "row" },
  nome: { fontSize: 18, fontWeight: "700" },
  btn: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, backgroundColor: "#2B8AF6" },
  btnTxtSmall: { color: "#fff", fontWeight: "700" },
});
