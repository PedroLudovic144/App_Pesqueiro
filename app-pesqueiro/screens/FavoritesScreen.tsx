// FavoritesScreen.tsx
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function FavoritesScreen({ navigation, route }: any) {
  const user = route?.params?.user ?? { id: "guest" };
  const [list, setList] = useState<any[]>([]);

  useEffect(()=>{ carregar(); const unsub = navigation.addListener('focus', carregar); return unsub; }, []);

  async function carregar() {
    const rawFav = await AsyncStorage.getItem(`favoritos_${user.id}`);
    const favArr = rawFav ? JSON.parse(rawFav) : [];
    const rawP = await AsyncStorage.getItem("pesqueiros");
    const pesq = rawP ? JSON.parse(rawP) : [];
    setList(pesq.filter((p:any)=> favArr.includes(p.id)));
  }

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={{padding:12}}>
        <Text style={{fontSize:18,fontWeight:"700"}}>Favoritos</Text>
        <FlatList data={list} keyExtractor={i=>i.id} renderItem={({item})=>(
          <View style={styles.card}>
            <Text style={{fontWeight:"700"}}>{item.nome}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("ClienteApp", { screen: "DetailsFisher", params: { pesqueiro: item } })}>
              <Text style={{marginTop:6}}>Ver</Text>
            </TouchableOpacity>
          </View>
        )} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card:{padding:12,borderWidth:1,borderColor:"#eee",borderRadius:8, marginBottom:8}
});
