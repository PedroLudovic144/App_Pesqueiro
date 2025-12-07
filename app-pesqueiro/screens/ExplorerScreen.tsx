// screens/ExplorerScreen.tsx
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function ExplorerScreen() {
  const navigation = useNavigation<any>();
  const [pesqueiros, setPesqueiros] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    (async () => {
      await seedIfNeeded();
      await carregarPesqueiros();
    })();
  }, []);

  async function seedIfNeeded() {
  const lagosRaw = await AsyncStorage.getItem("lagos");
  if (lagosRaw) return; // Já existe, não recriar

  const structure = [
    {
      id: "L1",
      nome: "Lago Principal",
      pesqueiroId: "1", // MESMO ID do Pesqueiro Cantareira
      peixes: [
        { id: "P11", nome: "Carpa Cabeçuda" },
        { id: "P12", nome: "Tilápia" },
        { id: "P13", nome: "Pacu" }
      ],
    },
    {
      id: "L2",
      nome: "Lago Familiar",
      pesqueiroId: "2", // MESMO ID do Pesqueiro do Arnaldo
      peixes: [
        { id: "P21", nome: "Tambaqui" },
        { id: "P22", nome: "Dourado" }
      ],
    },
    {
      id: "L3",
      nome: "Lago Tranquilo",
      pesqueiroId: "3", // MESMO ID do Pesqueiro Paraíso
      peixes: [
        { id: "P31", nome: "Robalo" },
        { id: "P32", nome: "Pintado" }
      ],
    },
  ];

  await AsyncStorage.setItem("lagos", JSON.stringify(structure));
}


  async function carregarPesqueiros() {
    const base = [
      {
        id: "1",
        nome: "Pesqueiro Cantareira",
        avaliacao: 4.3,
        totalAvaliacoes: 667,
        imagem: require("../assets/images/pesqueirocantareira.png"),
        endereco: "Av. Luís Carlos Gentile de Laet, 2500 - Tremembé, SP",
        descricao: "Pesqueiro tradicional da zona norte de SP.",
      },
      {
        id: "2",
        nome: "Pesqueiro do Arnaldo",
        avaliacao: 4.8,
        totalAvaliacoes: 988,
        imagem: require("../assets/images/pesqueiroarnaldao.png"),
        endereco: "Rua do Lago Azul, 45 - Mairiporã, SP",
        descricao: "Ambiente familiar com ótimas estruturas.",
      },
      {
        id: "3",
        nome: "Pesqueiro Paraíso",
        avaliacao: 4.5,
        totalAvaliacoes: 542,
        imagem: require("../assets/images/pesqueiroparaiso.jpg"),
        endereco: "Estrada dos Pinheiros, 900 - Atibaia",
        descricao: "Ambiente tranquilo com boa variedade de peixes.",
      },
    ];

    setPesqueiros(base);
    setFiltered(base);
  }

  function buscar(texto: string) {
    setBusca(texto);

    if (!texto.trim()) {
      setFiltered(pesqueiros);
      return;
    }

    setFiltered(
      pesqueiros.filter((p) =>
        p.nome.toLowerCase().includes(texto.toLowerCase())
      )
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Pesqueiros Próximos</Text>
          <Text style={styles.subtitle}>Encontre o melhor local</Text>
        </View>

        {/* Botão Favoritos */}
        <TouchableOpacity
          style={styles.favBtn}
          onPress={() => navigation.navigate("Favoritos")}
        >
          <Ionicons name="heart" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Busca */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} color="#888" />
        <TextInput
          placeholder="Buscar pesqueiro..."
          value={busca}
          onChangeText={buscar}
          style={styles.searchInput}
          placeholderTextColor="#999"
        />
        {busca !== "" && (
          <TouchableOpacity onPress={() => buscar("")}>
            <Ionicons name="close-circle" size={18} color="#888" />
          </TouchableOpacity>
        )}
      </View>

      {/* Lista */}
      <FlatList
        data={filtered}
        keyExtractor={(i) => i.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("DetailsFisher", { pesqueiro: item })
            }
          >
            <Image source={item.imagem} style={styles.thumb} />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={styles.name}>{item.nome}</Text>
              <Text style={styles.addr} numberOfLines={1}>
                {item.endereco}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#ffffff" },
  header: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 20, fontWeight: "700" },
  subtitle: { color: "#666", marginTop: 2 },
  favBtn: { backgroundColor: "#E53935", padding: 10, borderRadius: 8 },
  searchBox: {
    marginHorizontal: 16,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f6f6f6",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  searchInput: { flex: 1, marginLeft: 8 },
  listContent: { paddingHorizontal: 12, paddingBottom: 80 },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 2,
    marginHorizontal: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  thumb: { width: 96, height: 64, borderRadius: 8 },
  name: { fontWeight: "700", fontSize: 16 },
  addr: { color: "#666", marginTop: 4 },
});
