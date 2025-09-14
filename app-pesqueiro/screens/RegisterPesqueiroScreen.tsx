import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

type Props = {
  onCadastrar?: () => void;
  onEntrarComoCliente?: () => void;
  logoSource?: any;
};

export default function RegisterPesqueiroScreen({
  onCadastrar,
  onEntrarComoCliente,
  logoSource,
}: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Image
          source={
            logoSource || require('../assets/images/logo.png')
          }
          style={styles.logo}
          resizeMode="contain"
          accessibilityLabel="Logo do pesqueiro"
        />

        <Text style={styles.title}>Registre seu pesqueiro</Text>

        <View style={styles.subtitleWrap}>
          <Text style={styles.subtitle}>Gerencie seu negocio</Text>
          <Text style={styles.subtitle}>Apenas por 29,99</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => onCadastrar && onCadastrar()}
          accessibilityRole="button"
          accessibilityLabel="Cadastrar">
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onEntrarComoCliente && onEntrarComoCliente()}
          accessibilityRole="link">
          <Text style={styles.linkText}>
            É cliente? <Text style={styles.linkBlue}>Entre agora para ver os
            pesqueiros próximos a você</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  container: {
    alignItems: 'center',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  logo: {
    width: Math.min(300, width * 0.55), 
    height: Math.min(300, width * 0.55),
  },
  title: {
    fontSize: 33, 
    fontWeight: '700',
    color: '#0B0B0B',
    marginBottom: 14,
    textAlign: 'center',
  },
  subtitleWrap: {
    alignItems: 'center',
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 28, // maior
    color: '#8F8F8F',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2B8AF6',
    paddingVertical: 16, // maior
    paddingHorizontal: 40,
    borderRadius: 10,
    minWidth: 220, // mais largo
    alignItems: 'center',
    marginVertical: 16,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18, // maior
    fontWeight: '600',
  },
  linkText: {
    color: '#222',
    fontSize: 15, // maior
    marginTop: 10,
    textAlign: 'center',
  },
  linkBlue: {
    color: '#0B84E6',
    textDecorationLine: 'underline',
    fontSize: 15, // maior também
    fontWeight: '500',
  },
});

