import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SearchPesqueirosScreen() {
  const navigation = useNavigation<any>();
  const [pesqueiros, setPesqueiros] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    const dadosBase = [
      {
        id: "1",
        nome: "Pesqueiro Cantareira",
        avaliacao: 4.3,
        totalAvaliacoes: 667,
        imagem: require("../assets/images/pesqueirocantareira.png"),
        endereco: "Av. Luís Carlos Gentile de Laet, 2500 - Tremembé, São Paulo",
        descricao: "Pesqueiro famoso da zona norte, ideal para família.",
      },
      {
        id: "2",
        nome: "Pesqueiro do Arnaldo",
        avaliacao: 4.8,
        totalAvaliacoes: 988,
        imagem: require("../assets/images/pesqueiroarnaldao.png"),
        endereco: "Rua do Lago Azul, 45 - Mairiporã",
        descricao: "Ambiente familiar com ótimos lagos.",
      },
      {
        id: "3",
        nome: "Pesqueiro Paraíso",
        avaliacao: 4.5,
        totalAvaliacoes: 542,
        imagem: require("../assets/images/pesqueiroparaiso.jpg"),
        endereco: "Estrada dos Pinheiros, 900 - Atibaia",
        descricao: "Lugar calmo com excelente variedade de peixes.",
      },
    ];

    const favoritosSalvos = await AsyncStorage.getItem("favoritos");
    setFavoritos(favoritosSalvos ? JSON.parse(favoritosSalvos) : []);

    setPesqueiros(dadosBase);
    setFiltered(dadosBase);
  }

  function buscar(texto: string) {
    setBusca(texto);

    if (texto.trim() === "") {
      return setFiltered(pesqueiros);
    }

    setFiltered(
      pesqueiros.filter((p) =>
        p.nome.toLowerCase().includes(texto.toLowerCase())
      )
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pesqueiros</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("Favoritos")}
          style={styles.favBtn}
        >
          <Ionicons name="heart" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="#aaa" />
        <TextInput
          placeholder="Buscar por nome..."
          value={busca}
          onChangeText={buscar}
          style={styles.searchInput}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("DetailsFisher", { pesqueiro: item })
            }
          >
            <Image source={item.imagem} style={styles.img} />
            <View style={{ flex: 1 }}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.endereco}>{item.endereco}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: { fontSize: 22, fontWeight: "700" },
  favBtn: {
    backgroundColor: "#E53935",
    padding: 10,
    borderRadius: 10,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    marginHorizontal: 16,
    padding: 10,
    borderRadius: 8,
  },
  searchInput: { flex: 1, marginLeft: 10 },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    elevation: 3,
    padding: 12,
    margin: 12,
    borderRadius: 10,
  },
  img: { width: 80, height: 60, borderRadius: 8, marginRight: 12 },
  nome: { fontSize: 16, fontWeight: "700" },
  endereco: { fontSize: 12, color: "#555" },
});
