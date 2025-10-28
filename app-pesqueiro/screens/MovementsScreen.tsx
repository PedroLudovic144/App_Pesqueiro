import React from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Movimentacao {
  id: string;
  dataHora: string;
  tipo: "Entrada" | "Saída";
  valor: number;
}

const dadosExemplo: Movimentacao[] = [
  { id: "1", dataHora: "31/03/2025\n14:23", tipo: "Entrada", valor: 450 },
  { id: "2", dataHora: "30/03/2025\n18:41", tipo: "Saída", valor: 600 },
  { id: "3", dataHora: "28/03/2025\n10:29", tipo: "Entrada", valor: 450 },
];

const MovimentacoesScreen: React.FC = () => {
  const renderItem = ({ item }: { item: Movimentacao }) => (
    <View
      style={[
        styles.row,
        item.tipo === "Entrada" ? styles.rowEntrada : styles.rowSaida,
      ]}
    >
      <Text style={[styles.cell, { flex: 2 }]}>{item.dataHora}</Text>
      <Text style={[styles.cell, { flex: 1 }]}>{item.tipo}</Text>
      <Text style={[styles.cell, { flex: 1 }]}>
          {item.valor.toFixed(2) + ',00'}
      </Text>

    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header azul */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image
            source={{ uri: "https://i.pravatar.cc/100" }}
            style={styles.avatar}
          />
          <Text style={styles.headerText}>Rafiq Aboarrage </Text>
        </View>
      </View>

      
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Movimentações</Text>
      </View>

      
      <View style={[styles.row, styles.headerRow]}>
        <Text style={[styles.headerCell, { flex: 2 }]}>Data/Hora</Text>
        <Text style={[styles.headerCell, { flex: 1 }]}>Transação</Text>
        <Text style={[styles.headerCell, { flex: 1 }]}>Valor Total</Text>
      </View>

      
      <FlatList
        data={dadosExemplo}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default MovimentacoesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // Header azul
  header: {
    backgroundColor: "#2B8AF6",
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  // Título
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },

  // Tabela
  row: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#000",
    marginLeft: 20,
    marginRight: 20,
  },
  headerRow: {
    backgroundColor: "#ddd",
    marginLeft: 20,
    marginRight: 20,
  },
  cell: {
    padding: 10,
    textAlign: "center",
    color: "#000",
  },
  headerCell: {
    padding: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  rowEntrada: {
    backgroundColor: "#00ff0044",
    marginLeft: 20,
    marginRight: 20,
  },
  rowSaida: {
    backgroundColor: "#ff000044",
    marginLeft: 20,
    marginRight: 20,
  },
});
