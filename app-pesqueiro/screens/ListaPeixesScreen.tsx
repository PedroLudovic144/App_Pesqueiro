// ListaPeixesScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ListaPeixesScreen() {
  const [lagos, setLagos] = useState<any[]>([]);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    const raw = await AsyncStorage.getItem("lagos");
    const arr = raw ? JSON.parse(raw) : [];
    setLagos(arr);
  }

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <Text style={styles.title}>Peixes por Lago</Text>

      <FlatList
        data={lagos}
        keyExtractor={(i: any) => i.id}
        renderItem={({ item }) => (
          <View style={styles.lagoCard}>
            <Text style={styles.lagoNome}>{item.nome}</Text>
            {item.peixes.length === 0 ? (
              <Text style={{ color: "#888" }}>Nenhum peixe neste lago.</Text>
            ) : (
              item.peixes.map((p: any) => (
                <Text key={p.id} style={styles.peixeItem}>
                  • {p.nome} — {p.quantidade} unidades — R$ {p.valor}
                </Text>
              ))
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: "700", marginBottom: 12 },
  lagoCard: { borderWidth: 1, padding: 12, borderRadius: 10, marginBottom: 12 },
  lagoNome: { fontSize: 18, fontWeight: "700", marginBottom: 6 },
  peixeItem: { paddingLeft: 8, marginTop: 4 },
});
