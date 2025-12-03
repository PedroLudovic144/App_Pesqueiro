import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface Pesqueiro {
  id: string;
  nome: string;
  avaliacao: number;
  totalAvaliacoes: number;
  imagem: any;
  endereco: string;
  descricao: string;
}

export default function ListOfNextFishers() {
  const [pesqueiros, setPesqueiros] = useState<Pesqueiro[]>([]);
  const navigation = useNavigation<any>();

  useEffect(() => {
    const dados: Pesqueiro[] = [
      {
        id: "1",
        nome: "Pesqueiro Cantareira",
        avaliacao: 4.3,
        totalAvaliacoes: 667,
        imagem: require("../assets/images/pesqueirocantareira.png"),
        endereco: "Av. Luís Carlos Gentile de Laet, 2500 - Tremembé, São Paulo",
        descricao:
          "Pesqueiro da zona norte de São Paulo. Av. Luís Carlos Gentile de Laet, 2500. Contato: 2204-7754",
      },
      {
        id: "2",
        nome: "Pesqueiro do Arnaldo",
        avaliacao: 4.8,
        totalAvaliacoes: 988,
        imagem: require("../assets/images/pesqueiroarnaldao.png"),
        endereco: "Rua do Lago Azul, 45 - Mairiporã, São Paulo",
        descricao:
          "Ambiente familiar com restaurante e lagoas bem cuidadas. Ideal para finais de semana.",
      },
      {
        id: "3",
        nome: "Pesqueiro Paraíso",
        avaliacao: 4.5,
        totalAvaliacoes: 542,
        imagem: require("../assets/images/pesqueiroparaiso.jpg"),
        endereco: "Estrada dos Pinheiros, 900 - Atibaia, São Paulo",
        descricao:
          "Pesqueiro tranquilo com excelente estrutura e boa variedade de peixes.",
      },
    ];
    setPesqueiros(dados);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Pesqueiros próximos</Text>

      <FlatList
        data={pesqueiros}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("ClienteApp", {
  screen: "DetailsFisher",
  params: { pesqueiro: item }
})}

          >
            <View style={styles.info}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.avaliacao}>
                {item.avaliacao} ★ ({item.totalAvaliacoes})
              </Text>
            </View>

            <Image source={item.imagem} style={styles.imagem} />
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  info: {
    flex: 1,
    marginRight: 10,
  },
  nome: {
    fontSize: 16,
    fontWeight: "bold",
  },
  avaliacao: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  imagem: {
    width: 80,
    height: 60,
    borderRadius: 8,
  },
});
