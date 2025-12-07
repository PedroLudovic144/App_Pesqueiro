// screens/PesqueiroInfoScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PesqueiroInfoScreen({ route, navigation }: any) {
  const pesqueiroId = route.params?.pesqueiroId ?? null;
  const [movs, setMovs] = useState<any[]>([]);
  const [lagos, setLagos] = useState<any[]>([]);
  const [totalPeixes, setTotalPeixes] = useState<number>(0);
  const [lucroMes, setLucroMes] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregar();
    const unsub = navigation.addListener("focus", carregar);
    return unsub;
  }, []);

  async function carregar() {
    setLoading(true);
    try {
      const rawMov = await AsyncStorage.getItem("movimentacoes");
      const arrMov = rawMov ? JSON.parse(rawMov) : [];
      setMovs(arrMov);

      const rawL = await AsyncStorage.getItem("lagos");
      const arrL = rawL ? JSON.parse(rawL) : [];
      const filtrados = pesqueiroId ? arrL.filter((l: any) => l.pesqueiroId === pesqueiroId) : arrL;
      setLagos(filtrados);

      const totalP = filtrados.reduce(
        (acc: number, l: any) =>
          acc +
          (l.peixes
            ? l.peixes.reduce((s: number, p: any) => s + (Number(p.quantidadeKg) || 0), 0)
            : 0),
        0
      );
      setTotalPeixes(totalP);

      // ======================
      // CORREÇÃO DO LUCRO
      // ======================
      const mes = new Date().getMonth();
      let entradas = 0;
      let saidas = 0;

      (arrMov || []).forEach((m: any) => {
        const d = m.data ? new Date(m.data) : new Date();
        if (d.getMonth() !== mes) return;

        const tipo = (m.tipo || "").toLowerCase();

        // Todas as formas possíveis de venda agora contam
        if (tipo.includes("venda") || tipo.includes("entrada") || tipo.includes("aluguel")) {
          entradas += Number(m.valor || 0);
        }

        if (tipo.includes("saida") || tipo.includes("compra")) {
          saidas += Number(m.valor || 0);
        }
      });

      setLucroMes(entradas - saidas);
    } catch (err) {
      console.log("erro carregar pesqueiro info", err);
    }
    setLoading(false);
  }

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#2B8AF6" />
      </View>
    );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Informações do Pesqueiro</Text>

      <View style={[styles.box, { marginTop: 12 }]}>
        <Text style={styles.label}>Lucro do mês</Text>
        <Text style={styles.valor}>R$ {lucroMes.toFixed(2)}</Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.label}>Total de lagos:</Text>
        <Text style={styles.valor}>{lagos.length}</Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.label}>Total de peixes (KG):</Text>
        <Text style={styles.valor}>{totalPeixes}</Text>
      </View>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Lagos", { pesqueiroId })}>
        <Text style={styles.btnTxt}>Gerenciar Lagos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btn, { backgroundColor: "#1abc9c" }]}
        onPress={() => navigation.navigate("ListaEquipamentos")}
      >
        <Text style={styles.btnTxt}>Gerenciar Equipamentos</Text>
      </TouchableOpacity>

      <Text style={{ marginTop: 12, fontWeight: "700" }}>Movimentações do mês</Text>

      {(movs || [])
        .filter((m: any) => {
          const d = m.data ? new Date(m.data) : new Date();
          return d.getMonth() === new Date().getMonth();
        })
        .map((m: any) => (
          <View key={m.id} style={styles.mov}>
            <Text style={{ fontWeight: "700" }}>{m.tipo}</Text>
            <Text>R$ {Number(m.valor || 0).toFixed(2)}</Text>
            <Text>{new Date(m.data).toLocaleString()}</Text>
          </View>
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#fff", flex: 1 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 12 },
  box: { backgroundColor: "#eef6ff", padding: 12, borderRadius: 10, marginBottom: 12 },
  label: { color: "#555" },
  valor: { fontSize: 20, fontWeight: "700", color: "#2B8AF6" },
  btn: { backgroundColor: "#2B8AF6", padding: 12, borderRadius: 10, marginBottom: 8 },
  btnTxt: { color: "#fff", fontWeight: "700", textAlign: "center" },
  mov: { padding: 8, borderWidth: 1, borderColor: "#eee", borderRadius: 8, marginTop: 8 },
});
