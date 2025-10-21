import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

export default function SideMenu({ navigation }: DrawerContentComponentProps) {
  return (
    <View style={styles.container}>
      {/* Seção principal */}
      <View style={styles.navSection}>
        <Text style={styles.sectionTitle}>Movimentações</Text>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Movimentacoes')}
        >
          <Text style={styles.navText}>Ver Movimentações</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Record')}
        >
          <Text style={styles.navText}>Registrar Movimentação</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Editar')}
        >
          <Text style={styles.navText}>Editar Pesqueiro</Text>
        </TouchableOpacity>
      </View>

      {/* Seção do perfil */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/150' }}
          style={styles.avatar}
        />
        <Text style={styles.nome}>Rafiq Aboarrage</Text>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate('Editar')}
        >
          <Text style={styles.txtBotao}>Editar suas informações</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao}>
          <Text style={styles.txtBotao}>Mudar de conta</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botao, { backgroundColor: '#e74c3c' }]}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.txtBotao}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db',
    justifyContent: 'space-between',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  navSection: {
    marginTop: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
  },
  navItem: {
    paddingVertical: 10,
  },
  navText: {
    color: '#eaf2f8',
    fontSize: 16,
  },
  profileSection: {
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
    paddingTop: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  botao: {
    width: '100%',
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#5dade2',
    alignItems: 'center',
    marginVertical: 5,
  },
  txtBotao: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});
