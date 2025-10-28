import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useIsFocused } from "@react-navigation/native";

export default function ListaPeixesScreen() {
  const [peixes, setPeixes] = useState<any[]>([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    const carregarPeixes = async () => {
      const data = await AsyncStorage.getItem("peixes");
      if (data) setPeixes(JSON.parse(data));
    };
    carregarPeixes();
  }, [isFocused]);

  const deletarPeixe = async (index: number) => {
    Alert.alert("Confirmar", "Deseja realmente deletar este peixe?", [
      { text: "Cancelar" },
      {
        text: "Deletar",
        onPress: async () => {
          const novaLista = [...peixes];
          novaLista.splice(index, 1);
          setPeixes(novaLista);
          await AsyncStorage.setItem("peixes", JSON.stringify(novaLista));
        },
      },
    ]);
  };

  const editarPeixe = (index: number, item: any) => {
    navigation.navigate("AdicionarPeixe" as never, { index, item } as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Lista de Peixes</Text>

      <FlatList
        data={peixes}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <Text style={styles.itemText}>🐟 Espécie: {item.especie}</Text>
            <Text>📦 Quantidade: {item.quantidade} kg</Text>
            <Text>📅 Data: {item.data}</Text>

            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <TouchableOpacity style={styles.editButton} onPress={() => editarPeixe(index, item)}>
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.deleteButton} onPress={() => deletarPeixe(index)}>
                <Text style={styles.buttonText}>Deletar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate("AdicionarPeixe" as never)}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  card: { backgroundColor: "#f3f4f6", padding: 15, borderRadius: 10, marginBottom: 10 },
  itemText: { fontWeight: "bold" },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#3b82f6",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  fabText: { color: "#fff", fontSize: 30 },
  editButton: { backgroundColor: "#f59e0b", padding: 10, borderRadius: 8, marginRight: 10 },
  deleteButton: { backgroundColor: "#ef4444", padding: 10, borderRadius: 8 },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
