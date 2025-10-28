import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useIsFocused } from "@react-navigation/native";

export default function ListaEquipamentosScreen() {
  const [equipamentos, setEquipamentos] = useState<any[]>([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    const carregarEquipamentos = async () => {
      const data = await AsyncStorage.getItem("equipamentos");
      if (data) setEquipamentos(JSON.parse(data));
    };
    carregarEquipamentos();
  }, [isFocused]);

  const deletarEquipamento = async (index: number) => {
    Alert.alert("Confirmar", "Deseja realmente deletar este equipamento?", [
      { text: "Cancelar" },
      {
        text: "Deletar",
        onPress: async () => {
          const novaLista = [...equipamentos];
          novaLista.splice(index, 1);
          setEquipamentos(novaLista);
          await AsyncStorage.setItem("equipamentos", JSON.stringify(novaLista));
        },
      },
    ]);
  };

  const editarEquipamento = (index: number, item: any) => {
    navigation.navigate("AdicionarEquipamento" as never, { index, item } as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Lista de Equipamentos</Text>

      <FlatList
        data={equipamentos}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <Text style={styles.itemText}>🎣 {item.nome}</Text>
            <Text>📦 Quantidade: {item.quantidade}</Text>
            <Text>💰 Tipo: {item.tipo}</Text>

            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <TouchableOpacity style={styles.editButton} onPress={() => editarEquipamento(index, item)}>
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.deleteButton} onPress={() => deletarEquipamento(index)}>
                <Text style={styles.buttonText}>Deletar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate("AdicionarEquipamento" as never)}>
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
    backgroundColor: "#22c55e",
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
