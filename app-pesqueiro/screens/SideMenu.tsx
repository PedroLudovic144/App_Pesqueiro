import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

export default function SideMenu({ navigation }: DrawerContentComponentProps) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://i.pravatar.cc/150' }}
        style={styles.avatar}
      />
      <Text style={styles.nome}>Rafiq Aboarrage</Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('Editar Informações')}
      >
        <Text style={styles.txtBotao}>Editar suas informações</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao}>
        <Text style={styles.txtBotao}>Mudar de conta</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao}>
        <Text style={styles.txtBotao}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#3498db', alignItems: 'center', paddingTop: 60 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 15 },
  nome: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 20 },
  botao: {
    width: '80%',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#5dade2',
    alignItems: 'center',
    marginVertical: 5
  },
  txtBotao: { color: '#fff', fontSize: 16, fontWeight: '600' }
});
