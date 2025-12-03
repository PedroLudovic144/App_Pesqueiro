// ListaEquipamentosScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ListaEquipamentosScreen({ navigation }: any) {
  const [equipamentos, setEquipamentos] = useState([]);

  useEffect(() => {
    carregar();
    navigation.addListener("focus", carregar);
  }, []);

  async function carregar() {
    const raw = await AsyncStorage.getItem("equipamentos");
    setEquipamentos(raw ? JSON.parse(raw) : []);
  }

  async function excluir(id: string) {
    const novo = equipamentos.filter((e: any) => e.id !== id);
    await AsyncStorage.setItem("equipamentos", JSON.stringify(novo));
    setEquipamentos(novo);
  }

  async function marcarAlugado(equip: any) {
    const novo = equipamentos.map((e: any) =>
      e.id === equip.id ? { ...e, alugado: !e.alugado } : e
    );

    await AsyncStorage.setItem("equipamentos", JSON.stringify(novo));
    setEquipamentos(novo);
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => navigation.navigate("AdicionarEquipamento")}
      >
        <Text style={styles.addTxt}>➕ Adicionar Equipamento</Text>
      </TouchableOpacity>

      <FlatList
        data={equipamentos}
        keyExtractor={(i: any) => i.id}
        renderItem={({ item }: any) => (
          <View style={styles.card}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text>Preço aluguel: R$ {item.valor}</Text>
            <Text>Status: {item.alugado ? "🟥 Alugado" : "🟩 Disponível"}</Text>

            <TouchableOpacity
              style={styles.btn}
              onPress={() => marcarAlugado(item)}
            >
              <Text style={styles.btnTxt}>
                {item.alugado ? "Marcar como devolvido" : "Marcar como alugado"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.delBtn}
              onPress={() =>
                Alert.alert("Excluir", "Deseja excluir?", [
                  { text: "Cancelar" },
                  { text: "Excluir", onPress: () => excluir(item.id) },
                ])
              }
            >
              <Text style={styles.delTxt}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  addBtn: {
    backgroundColor: "#2B8AF6",
    padding: 12,
    borderRadius: 10,
    marginBottom: 14,
  },
  addTxt: { textAlign: "center", color: "#fff", fontWeight: "700" },

  card: {
    backgroundColor: "#f5f5f5",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },
  nome: { fontSize: 18, fontWeight: "700" },

  btn: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  btnTxt: { color: "#fff", textAlign: "center", fontWeight: "700" },

  delBtn: {
    backgroundColor: "#c0392b",
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
  },
  delTxt: { color: "#fff", textAlign: "center", fontWeight: "700" },
});
