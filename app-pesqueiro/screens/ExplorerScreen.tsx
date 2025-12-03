// ExplorerScreen.tsx
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SAMPLE = [
  { id: "1", nome: "Pesqueiro Cantareira", endereco: "Av. Luís Carlos Gentile de Laet, 2500 - Tremembé, São Paulo", descricao: "Pesqueiro da zona norte de São Paulo. Contato: (11) 2204-7754", avaliacao: 4.3, totalAvaliacoes: 667 },
  { id: "2", nome: "Pesqueiro Três Lagos", endereco: "Estr. do M'Boi Mirim, 1200 - SP", descricao: "Ambiente familiar, 3 lagos.", avaliacao: 4.6, totalAvaliacoes: 124 },
  { id: "3", nome: "Pesqueiro Estância Pescador", endereco: "R. das Flores, 40 - Campinas", descricao: "Ótimo para campeonatos.", avaliacao: 4.1, totalAvaliacoes: 89 },
  { id: "4", nome: "Pesqueiro Paraíso dos Peixes", endereco: "Rod. dos Bandeirantes km 18", descricao: "Lagos bem cuidados.", avaliacao: 4.5, totalAvaliacoes: 201 },
  { id: "5", nome: "Pesqueiro Lago Azul", endereco: "Av. Central, 500 - Santos", descricao: "Vista para o lago.", avaliacao: 4.0, totalAvaliacoes: 54 },
  { id: "6", nome: "Pesqueiro Tilápia Real", endereco: "R. do Pescador, 99 - Guarujá", descricao: "Especializado em Tilápia.", avaliacao: 4.2, totalAvaliacoes: 140 },
  { id: "7", nome: "Pesqueiro Colinas do Sol", endereco: "Estr. Velha, 77 - Jundiaí", descricao: "Recanto na serra.", avaliacao: 4.7, totalAvaliacoes: 98 },
  { id: "8", nome: "Pesqueiro Vale Verde", endereco: "Av. Verde, 10 - Itu", descricao: "Natureza e churrasqueiras.", avaliacao: 4.4, totalAvaliacoes: 77 },
  { id: "9", nome: "Pesqueiro Recanto da Pesca", endereco: "R. Lagoa, 321 - Piracicaba", descricao: "Bom para família.", avaliacao: 4.1, totalAvaliacoes: 45 },
  { id: "10", nome: "Pesqueiro Boa Esperança", endereco: "Av. Esperança, 44 - São José", descricao: "Ambiente acolhedor.", avaliacao: 4.0, totalAvaliacoes: 34 },
  { id: "11", nome: "Pesqueiro Rancho do Pescador", endereco: "R. do Rancho, 13 - Bertioga", descricao: "Rancho com pesca esportiva.", avaliacao: 4.6, totalAvaliacoes: 210 },
  { id: "12", nome: "Pesqueiro Vitória Régia", endereco: "Av. das Águas, 88 - Itu", descricao: "Lagos ornamentais e grandes.", avaliacao: 4.8, totalAvaliacoes: 320 },
];

export default function ExplorerScreen({ navigation, route }: any) {
  const user = route?.params?.user ?? { id: "guest" };
  const [q, setQ] = useState("");
  const [pesqueiros, setPesqueiros] = useState<any[]>([]);
  const [favoritosSet, setFavoritosSet] = useState<Set<string>>(new Set());

  useEffect(() => {
    seedIfNeeded();
    carregar();
    const unsub = navigation.addListener("focus", carregar);
    return unsub;
  }, []);

  async function seedIfNeeded() {
    const raw = await AsyncStorage.getItem("pesqueiros");
    if (!raw) {
      await AsyncStorage.setItem("pesqueiros", JSON.stringify(SAMPLE));
    }
  }

  async function carregar() {
    const raw = await AsyncStorage.getItem("pesqueiros");
    const arr = raw ? JSON.parse(raw) : [];
    setPesqueiros(arr);

    const rawFav = await AsyncStorage.getItem(`favoritos_${user.id}`);
    setFavoritosSet(rawFav ? new Set(JSON.parse(rawFav)) : new Set());
  }

  async function toggleFav(id: string) {
    const key = `favoritos_${user.id}`;
    const rawFav = await AsyncStorage.getItem(key);
    const arr = rawFav ? JSON.parse(rawFav) : [];
    const idx = arr.indexOf(id);
    if (idx >= 0) arr.splice(idx, 1);
    else arr.push(id);
    await AsyncStorage.setItem(key, JSON.stringify(arr));
    setFavoritosSet(new Set(arr));
  }

  const lista = pesqueiros.filter((p) => p.nome?.toLowerCase().includes(q.toLowerCase()));

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <View style={{ padding: 12, flex: 1 }}>
          <TextInput placeholder="Buscar pesqueiro por nome" style={styles.input} value={q} onChangeText={setQ} />

          <FlatList
            data={lista}
            keyExtractor={(i) => i.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={{ fontWeight: "700" }}>{item.nome}</Text>
                <Text>{item.endereco}</Text>
                <Text numberOfLines={2} style={{ marginTop: 6 }}>{item.descricao}</Text>

                <View style={{ flexDirection: "row", marginTop: 10, alignItems: "center" }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("ClienteApp", { screen: "DetailsFisher", params: { pesqueiro: item } })}
                  >
                    <Text style={{ marginRight: 14 }}>Ver</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => toggleFav(item.id)} style={{ padding: 6 }}>
                    <Text>{favoritosSet.has(item.id) ? "❤️ Favoritado" : "♡ Favoritar"}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            ListEmptyComponent={() => <Text>Nenhum pesqueiro encontrado.</Text>}
          />

          <View style={{ height: 12 }} />
          <Button title="Meus Favoritos" onPress={() => navigation.navigate("ClienteApp", { screen: "Favoritos", params: { user } })} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: { borderWidth: 1, borderColor: "#ddd", padding: 8, borderRadius: 8, marginBottom: 12 },
  card: { padding: 12, borderWidth: 1, borderColor: "#eee", borderRadius: 8, marginBottom: 8 }
});
