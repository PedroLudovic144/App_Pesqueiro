// screens/DetailsFisherScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

export default function DetailsFisherScreen({ route }: any) {
  const pesqueiro = route.params?.pesqueiro;

  const [favoritos, setFavoritos] = useState<string[]>([]);

  useEffect(() => {
    carregarFavoritos();
  }, []);

  async function carregarFavoritos() {
    const raw = await AsyncStorage.getItem("favoritos");
    setFavoritos(raw ? JSON.parse(raw) : []);
  }

  async function toggleFavorito(id: string) {
    const raw = await AsyncStorage.getItem("favoritos");
    let lista = raw ? JSON.parse(raw) : [];

    if (lista.includes(id)) {
      lista = lista.filter((x: string) => x !== id);
    } else {
      lista.push(id);
    }

    await AsyncStorage.setItem("favoritos", JSON.stringify(lista));
    setFavoritos(lista);
  }

  return (
    <ScrollView style={styles.container}>
      {/* FOTO */}
      <Image source={pesqueiro.imagem} style={styles.img} />

      {/* HEADER */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>{pesqueiro.nome}</Text>

        <TouchableOpacity onPress={() => toggleFavorito(pesqueiro.id)}>
          <Ionicons
            name={favoritos.includes(pesqueiro.id) ? "heart" : "heart-outline"}
            size={32}
            color="#E53935"
          />
        </TouchableOpacity>
      </View>

      {/* DESCRIÇÃO */}
      <Text style={styles.desc}>{pesqueiro.descricao}</Text>

      {/* ENDEREÇO */}
      <View style={styles.row}>
        <Ionicons name="location" size={18} color="#666" />
        <Text style={styles.endereco}>{pesqueiro.endereco}</Text>
      </View>

      {/* AVALIAÇÃO */}
      <View style={styles.row}>
        <Ionicons name="star" size={18} color="#f4c430" />
        <Text style={styles.avaliacao}>
          {pesqueiro.avaliacao} ({pesqueiro.totalAvaliacoes} avaliações)
        </Text>
      </View>

      {/* HORÁRIO CURTO */}
      <Text style={styles.sectionTitle}>Horário de Funcionamento</Text>

      <View style={styles.horarioBox}>
        <Text style={styles.horarioItem}>Seg–Sex: 07h às 17h</Text>
        <Text style={styles.horarioItem}>Sáb–Dom: 06h às 20h</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 12, backgroundColor: "#fff" },
  img: {
    width: "100%",
    height: 220,
    borderRadius: 10,
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 22, fontWeight: "700" },
  desc: {
    marginTop: 10,
    color: "#555",
    fontSize: 14,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  endereco: { marginLeft: 6, color: "#666" },
  avaliacao: { marginLeft: 6, color: "#444", fontWeight: "600" },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 8,
  },

  horarioBox: {
    backgroundColor: "#f7f7f7",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },

  horarioItem: {
    fontSize: 15,
    color: "#333",
    paddingVertical: 4,
  },
});
