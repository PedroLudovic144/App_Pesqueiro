import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Vibration,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DetailsFisherScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { pesqueiro } = route.params as any;

  const [favorito, setFavorito] = useState(false);

  // Verifica se já está favoritado
  useEffect(() => {
    const checkFavorito = async () => {
      const dados = await AsyncStorage.getItem("favoritos");
      const favoritos = dados ? JSON.parse(dados) : [];
      const isFavorito = favoritos.some((f: any) => f.id === pesqueiro.id);
      setFavorito(isFavorito);
    };
    checkFavorito();
  }, [pesqueiro]);

  // Alterna favorito e vibra ao favoritar
  const toggleFavorito = async () => {
    try {
      const dados = await AsyncStorage.getItem("favoritos");
      let favoritos = dados ? JSON.parse(dados) : [];

      if (favorito) {
        favoritos = favoritos.filter((f: any) => f.id !== pesqueiro.id);
      } else {
        favoritos.push(pesqueiro);
        Vibration.vibrate(50); // vibração de 50ms
      }

      await AsyncStorage.setItem("favoritos", JSON.stringify(favoritos));
      setFavorito(!favorito);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      {/* NAVBAR */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>{pesqueiro.nome}</Text>
        <TouchableOpacity onPress={toggleFavorito} style={styles.favoriteButton}>
          <Ionicons
            name={favorito ? "heart" : "heart-outline"}
            size={26}
            color={favorito ? "#ff4d4d" : "#fff"}
          />
        </TouchableOpacity>
      </View>

      {/* CONTEÚDO SCROLLÁVEL */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={{ uri: pesqueiro.imagem }} style={styles.image} />
        <Text style={styles.title}>{pesqueiro.nome}</Text>

        {/* Avaliação */}
        <Text style={styles.rating}>
          {`⭐ ${pesqueiro.avaliacao} (${pesqueiro.totalAvaliacoes} avaliações)`}
        </Text>

        {/* Endereço */}
        <Text style={styles.address}>{pesqueiro.endereco}</Text>

        {/* Descrição */}
        <Text style={styles.description}>{pesqueiro.descricao}</Text>
      </ScrollView>
    </View>
  );
}

// ESTILOS
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#007AFF",
    paddingHorizontal: 12,
    paddingTop: 45,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  navTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  backButton: { padding: 6 },
  favoriteButton: { padding: 6 },
  scrollContent: { padding: 16, paddingBottom: 40 },
  image: { width: "100%", height: 220, borderRadius: 12, marginBottom: 16 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 8 },
  rating: { fontSize: 16, color: "#555", marginBottom: 4 },
  address: { fontSize: 16, color: "#777", marginBottom: 12 },
  description: { fontSize: 16, lineHeight: 22, color: "#444" },
});
