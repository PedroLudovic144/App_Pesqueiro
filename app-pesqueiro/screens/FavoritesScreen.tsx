import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function FavoritesScreen() {
  const [favoritos, setFavoritos] = useState<any[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const carregar = async () => {
      const dados = await AsyncStorage.getItem("favoritos");
      setFavoritos(dados ? JSON.parse(dados) : []);
    };
    const unsubscribe = navigation.addListener("focus", carregar);
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("DetailsFisher" as never, { pesqueiro: item } as never)}
    >
      <Image source={{ uri: item.imagem }} style={styles.image} />
      <Text style={styles.nome}>{item.nome}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* NAVBAR */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Favoritos</Text>
        <View style={{ width: 24 }} /> {/* espaço vazio para centralizar o título */}
      </View>

      <FlatList
        data={favoritos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={<Text>Nenhum pesqueiro favoritado ainda.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  // NavBar azul
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#007AFF",
    paddingHorizontal: 12,
    paddingTop: 45, // status bar
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },

  navTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },

  backButton: { padding: 6 },

  card: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  image: { width: 80, height: 80, borderRadius: 8, marginRight: 12 },
  nome: { fontSize: 18, fontWeight: "600" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
});
