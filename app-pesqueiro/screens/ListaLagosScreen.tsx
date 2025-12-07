// screens/ListaLagosScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ListaLagosScreen({ navigation, route }: any) {
  const pesqueiroId = route?.params?.pesqueiroId ?? null;
  const [lagos, setLagos] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [novoNome, setNovoNome] = useState("");

  useEffect(() => {
    carregar();
    const unsub = navigation.addListener("focus", carregar);
    return unsub;
  }, []);

  async function carregar() {
    const raw = await AsyncStorage.getItem("lagos");
    const arr = raw ? JSON.parse(raw) : [];
    const filtrados = pesqueiroId
      ? arr.filter((l: any) => l.pesqueiroId === pesqueiroId)
      : arr;
    setLagos(filtrados);
  }

  async function deletarLago(id: string) {
    Alert.alert(
      "Excluir lago?",
      "Você perderá todos os peixes deste lago!",
      [
        { text: "Cancelar" },
        {
          text: "OK",
          onPress: async () => {
            const raw = await AsyncStorage.getItem("lagos");
            let arr = raw ? JSON.parse(raw) : [];
            arr = arr.filter((l: any) => l.id !== id);
            await AsyncStorage.setItem("lagos", JSON.stringify(arr));
            carregar();
          },
        },
      ]
    );
  }

  function abrirEdicao(item: any) {
    setEditingId(item.id);
    setNovoNome(item.nome);
  }

  async function salvarNome() {
    if (!novoNome.trim()) return Alert.alert("Digite um nome válido!");

    const raw = await AsyncStorage.getItem("lagos");
    let arr = raw ? JSON.parse(raw) : [];

    const index = arr.findIndex((l: any) => l.id === editingId);
    if (index !== -1) {
      arr[index].nome = novoNome.trim();
    }

    await AsyncStorage.setItem("lagos", JSON.stringify(arr));
    setEditingId(null);
    setNovoNome("");
    carregar();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lagos</Text>

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => navigation.navigate("AdicionarLago", { pesqueiroId })}
      >
        <Text style={styles.addTxt}>➕ Criar Lago</Text>
      </TouchableOpacity>

      {/* POP-UP DE EDIÇÃO */}
      {editingId && (
        <View style={styles.editBox}>
          <Text style={styles.editTitle}>Editar Nome do Lago</Text>

          <TextInput
            style={styles.input}
            value={novoNome}
            onChangeText={setNovoNome}
            placeholder="Novo nome..."
          />

          <View style={styles.rowBtns}>
            <TouchableOpacity style={styles.saveBtn} onPress={salvarNome}>
              <Text style={styles.saveTxt}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => {
                setEditingId(null);
                setNovoNome("");
              }}
            >
              <Text style={styles.cancelTxt}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <FlatList
        data={lagos}
        keyExtractor={(i: any) => i.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nome}>{item.nome}</Text>

            <View style={styles.btnRow}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() =>
                  navigation.navigate("PeixesDoLago", { lagoId: item.id })
                }
              >
                <Text style={styles.btnTxt}>Peixes</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.editBtn}
                onPress={() => abrirEdicao(item)}
              >
                <Text style={styles.editTxt}>Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => deletarLago(item.id)}
              >
                <Text style={styles.removeTxt}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <Text style={{ color: "#777" }}>Nenhum lago criado.</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 12 },
  addBtn: {
    backgroundColor: "#2B8AF6",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  addTxt: { color: "#fff", fontWeight: "700", textAlign: "center" },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 10,
  },
  nome: { fontSize: 18, fontWeight: "700" },
  btnRow: { flexDirection: "row", marginTop: 10 },
  btn: {
    backgroundColor: "#2B8AF6",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 6,
  },
  btnTxt: { color: "#fff", fontWeight: "700" },
  editBtn: {
    backgroundColor: "#f39c12",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 6,
  },
  editTxt: { color: "#fff", fontWeight: "700" },
  removeBtn: {
    backgroundColor: "#E53935",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  removeTxt: { color: "#fff", fontWeight: "700" },

  // MODAL DE EDIÇÃO
  editBox: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
  },
  editTitle: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#bbb",
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
  },
  rowBtns: { flexDirection: "row", justifyContent: "space-between" },
  saveBtn: {
    flex: 1,
    backgroundColor: "#27ae60",
    padding: 10,
    borderRadius: 8,
    marginRight: 8,
  },
  saveTxt: { color: "#fff", textAlign: "center", fontWeight: "700" },
  cancelBtn: {
    flex: 1,
    backgroundColor: "#b2bec3",
    padding: 10,
    borderRadius: 8,
  },
  cancelTxt: { color: "#2d3436", textAlign: "center", fontWeight: "700" },
});
