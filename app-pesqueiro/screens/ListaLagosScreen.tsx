// ListaLagosScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ListaLagosScreen({ navigation }: any) {
  const [lagos, setLagos] = useState<any[]>([]);

  useEffect(() => {
    carregar();
    navigation.addListener("focus", carregar);
  }, []);

  async function carregar() {
    const raw = await AsyncStorage.getItem("lagos");
    const arr = raw ? JSON.parse(raw) : [];
    setLagos(arr);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lagos do seu Pesqueiro</Text>

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => navigation.navigate("AdicionarLago")}
      >
        <Text style={styles.addTxt}>➕ Criar Novo Lago</Text>
      </TouchableOpacity>

      <FlatList
        data={lagos}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("PeixesDoLago", { lagoId: item.id })}
          >
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.info}>
              {item.peixes.length} tipos de peixes cadastrados
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 12 },
  addBtn: {
    backgroundColor: "#2B8AF6",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  addTxt: { color: "#fff", textAlign: "center", fontWeight: "700" },
  card: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
  },
  nome: { fontSize: 18, fontWeight: "700" },
  info: { marginTop: 4, color: "#666" },
});
