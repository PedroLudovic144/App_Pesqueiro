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
  const route = useRoute<any>();
  const pesqueiro = route.params?.pesqueiro;

  const [favorito, setFavorito] = useState(false);

  if (!pesqueiro) {
    return (
      <View style={styles.container}>
        <Text>Erro: pesqueiro não encontrado</Text>
      </View>
    );
  }

  useEffect(() => {
    const checkFavorito = async () => {
      try {
        const dados = await AsyncStorage.getItem("favoritos");
        const favoritos = dados ? JSON.parse(dados) : [];
        const isFavorito = favoritos.some((f: any) => f.id === pesqueiro.id);
        setFavorito(isFavorito);
      } catch (e) {
        console.error(e);
      }
    };
    checkFavorito();
  }, [pesqueiro]);

  const toggleFavorito = async () => {
    try {
      const dados = await AsyncStorage.getItem("favoritos");
      let favoritos = dados ? JSON.parse(dados) : [];

      if (favorito) {
        favoritos = favoritos.filter((f: any) => f.id !== pesqueiro.id);
      } else {
        favoritos.push(pesqueiro);
        Vibration.vibrate(50);
      }

      await AsyncStorage.setItem("favoritos", JSON.stringify(favoritos));
      setFavorito(!favorito);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
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

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={pesqueiro.imagem} style={styles.image} />
        <Text style={styles.title}>{pesqueiro.nome}</Text>
        <Text style={styles.rating}>
          {`⭐ ${pesqueiro.avaliacao} (${pesqueiro.totalAvaliacoes} avaliações)`}
        </Text>
        <Text style={styles.address}>{pesqueiro.endereco}</Text>
        <Text style={styles.description}>{pesqueiro.descricao}</Text>
      </ScrollView>
    </View>
  );
}

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
