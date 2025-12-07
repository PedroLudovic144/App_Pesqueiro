// screens/ListaPeixesScreen.tsx
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ListaPeixesScreen({ route }: any) {
  const lagoId = route.params?.lagoId;
  const [peixes, setPeixes] = useState<any[]>([]);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    const raw = await AsyncStorage.getItem("lagos");
    const lagos = raw ? JSON.parse(raw) : [];
    const lago = lagos.find((l: any) => l.id === lagoId);
    setPeixes(lago?.peixes ?? []);
  }

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <Text style={styles.title}>Peixes do Lago</Text>

      <FlatList
        data={peixes}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nome}>{item.nome}</Text>

            <Text style={styles.info}>Disponível: {item.pesoKg} kg</Text>
            <Text style={styles.info}>Compra: R$ {item.precoCompraKg}/kg</Text>
            <Text style={styles.info}>Venda: R$ {item.precoVendaKg}/kg</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: "700", marginBottom: 12 },
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  nome: { fontSize: 18, fontWeight: "700" },
  info: { marginTop: 4, color: "#555" },
});
