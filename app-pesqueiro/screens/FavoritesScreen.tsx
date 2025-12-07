// /screens/FavoritesScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function FavoritesScreen({ navigation }: any) {
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [lista, setLista] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", carregar);
    carregar();
    return unsubscribe;
  }, []);

  async function carregar() {
    const rawFav = await AsyncStorage.getItem("favoritos");
    const favArr = rawFav ? JSON.parse(rawFav) : [];
    setFavoritos(favArr);

    // base igual ao Explorer
    const base = [
      { id: "1", nome: "Pesqueiro Cantareira", cidade: "São Paulo", foto: require("../assets/images/pesqueirocantareira.png") },
      { id: "2", nome: "Pesqueiro do Arnaldo", cidade: "Mairiporã", foto: require("../assets/images/pesqueiroarnaldao.png") },
      { id: "3", nome: "Pesqueiro Paraíso", cidade: "Atibaia", foto: require("../assets/images/pesqueiroparaiso.jpg") },
    ];

    setLista(base.filter((p) => favArr.includes(p.id)));
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={styles.title}>Favoritos</Text>

      <FlatList
        data={lista}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("DetailsFisher", { pesqueiro: item })}>
            <Image source={item.foto} style={styles.img} />
            <View style={{ marginLeft: 12 }}>
              <Text style={styles.name}>{item.nome}</Text>
              <Text style={{ color: "#666" }}>{item.cidade}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => <Text style={{ color: "#666" }}>Nenhum favorito.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: "700", marginBottom: 12 },
  card: { flexDirection: "row", backgroundColor: "#fff", padding: 10, borderRadius: 10, marginBottom: 12, alignItems: "center" },
  img: { width: 90, height: 70, borderRadius: 8 },
  name: { fontSize: 16, fontWeight: "700" },
});
