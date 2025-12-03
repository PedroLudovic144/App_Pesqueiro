// DetailsFisherScreen.tsx
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";

export default function DetailsFisherScreen({ route, navigation }: any) {
  const pesqueiro = route?.params?.pesqueiro;
  if (!pesqueiro) return <SafeAreaView><Text>Pesqueiro não encontrado</Text></SafeAreaView>;

  return (
    <SafeAreaView style={{flex:1}}>
      <ScrollView contentContainerStyle={{padding:12}}>
        <Text style={{fontSize:20,fontWeight:"700"}}>{pesqueiro.nome}</Text>
        <Text style={{marginTop:8}}>{pesqueiro.descricao}</Text>
        <Text style={{marginTop:8}}>Endereço: {pesqueiro.endereco}</Text>
        <Text style={{marginTop:8}}>Avaliação: {pesqueiro.avaliacao} ({pesqueiro.totalAvaliacoes} avaliações)</Text>
        <View style={{height:12}} />
        <Button title="Ver perfil completo" onPress={() => navigation.navigate("PesqueiroInfo", { pesqueiroId: pesqueiro.id })} />
      </ScrollView>
    </SafeAreaView>
  );
}
