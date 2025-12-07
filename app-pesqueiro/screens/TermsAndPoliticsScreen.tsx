// TermsAndPoliticsScreen.tsx
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'TermsAndPolitics'>;

const { width } = Dimensions.get('window');

export default function TermsAndPoliticsScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        <Text style={styles.title}>Termos de Uso</Text>

        <View style={styles.card}>
          <Text style={styles.text}>
            2.9 Lei nº 13.709/2018 – Lei Geral de Proteção de Dados{"\n\n"}
            A Lei 13.709/2018, também chamada de Lei Geral de Proteção de Dados,
            regulamenta o tratamento de dados pessoais com o objetivo de protegê-los,
            uma vez que a Constituição Federal reconhece a proteção de dados pessoais
            como direito fundamental.{"\n\n"}
            A LGPD aplica-se a qualquer operação de tratamento de dados pessoais
            realizada por pessoa natural ou jurídica, independentemente do meio,
            desde que o titular esteja no território nacional.{"\n\n"}
            Ela define conceitos como controlador, operador, titular, banco de dados,
            consentimento, eliminação, tratamento e várias outras responsabilidades
            legais para proteger dados pessoais.{"\n\n"}
            Diante disso, torna-se necessária a adequação à LGPD, garantindo
            transparência, segurança e responsabilidade no uso de dados pessoais.
          </Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>
            Já é cliente? <Text style={styles.linkBlue}>Entre aqui</Text>
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },

  scrollContainer: {
    padding: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },

  title: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 20,
    color: '#0B0B0B',
    textAlign: 'center',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 18,
    width: '100%',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 25,
  },

  text: {
    fontSize: 16,
    color: '#444',
    lineHeight: 22,
    textAlign: 'left',
  },

  linkText: {
    color: '#222',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 30,
  },

  linkBlue: {
    color: '#0B84E6',
    textDecorationLine: 'underline',
    fontSize: 15,
    fontWeight: '600',
  },
});
  