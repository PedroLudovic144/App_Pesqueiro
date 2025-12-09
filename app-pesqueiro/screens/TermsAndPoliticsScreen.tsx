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
            Termos de Uso{"\n"}
            O uso do site e aplicativo Meu Pesqueiro está condicionado à aceitação
            e ao cumprimento destes “Termos e Condições de Uso”, descritos abaixo:
            {"\n\n"}

            1. Condições Gerais do Uso da Plataforma{"\n"}
            1.1. O uso do site, aplicativo e de todas as informações, telas,
            exibições e produtos, incluindo mecanismos de busca, assim como todos
            os serviços oferecidos, estão sujeitos às condições constantes deste
            Termo.{"\n\n"}

            1.2. Estas condições poderão ser alteradas a qualquer momento, sem
            necessidade de aviso prévio específico. Todas as alterações constarão
            neste Termo, devendo o Usuário revisá-lo periodicamente.{"\n\n"}

            1.3. O presente Termo tem como objetivo regular a utilização pelos
            Usuários (doravante “Usuário”) do site e aplicativo Meu Pesqueiro.
            {"\n\n"}

            1.4. Para utilizar os conteúdos e serviços oferecidos, o Usuário
            deverá ler atentamente e concordar expressamente com este Termo.
            {"\n\n"}

            1.5. Determinados serviços poderão possuir regras próprias
            (doravante “Termos Específicos”), que poderão substituir, complementar
            ou alterar o presente Termo.{"\n\n"}

            1.6. O site e aplicativo reservam-se o direito de modificar, suprimir
            e/ou ampliar este Termo de Uso, a qualquer tempo, sem comunicação
            prévia.{"\n\n"}

            1.7. O site e aplicativo oferecem a maioria de seus serviços de forma
            gratuita. Porém, alguns recursos próprios ou de terceiros poderão ser
            cobrados, conforme Termos Específicos.{"\n\n"}

            1.8. A utilização de alguns serviços não exige cadastro (Serviços
            Abertos). No entanto, funcionalidades como cadastro de pesqueiros,
            reservas, avaliações, favoritos e gerenciamento exigem registro do
            Usuário (Serviços Fechados).{"\n\n"}

            2. Obrigações do Usuário{"\n"}
            2.1. O Usuário concorda e se compromete a utilizar os Serviços
            corretamente, somente para os fins permitidos, em conformidade com
            este Termo, Termos Específicos, legislação vigente, moral e bons
            costumes, comprometendo-se a:{"\n\n"}

            • não acessar, nem tentar acessar, qualquer serviço por meio diverso
            da interface disponibilizada;{"\n"}
            • não utilizar mecanismos automatizados sem autorização;{"\n"}
            • não interferir, interromper ou prejudicar serviços, servidores ou
            redes conectadas;{"\n"}
            • não reproduzir, duplicar, copiar, vender ou revender os serviços sem
            autorização formal;{"\n"}
            • não publicar conteúdos ofensivos, ilegais, indevidos, falsos,
            discriminatórios, pornográficos ou que infrinjam direitos de terceiros;
            {"\n"}
            • não enviar fotos ou textos que violem propriedade intelectual ou
            direitos autorais.{"\n\n"}

            3. Responsabilidades do Usuário{"\n"}
            3.1. O Usuário é o único responsável pelo descumprimento de suas
            obrigações, respondendo por perdas, danos ou prejuízos eventualmente
            causados ao site, aplicativo ou a terceiros.{"\n\n"}

            3.2. O Usuário reconhece que acessa e utiliza o sistema por sua conta
            e risco, compreendendo que os serviços são oferecidos conforme
            disponibilidade, sem garantias de desempenho contínuo.{"\n\n"}

            4. Limitação de Responsabilidade{"\n"}
            4.1. O site e aplicativo se eximem de qualquer responsabilidade por
            perdas, danos ou prejuízos decorrentes de:{"\n\n"}

            • falta de disponibilidade dos serviços;{"\n"}
            • erros de funcionamento;{"\n"}
            • falhas de conexão;{"\n"}
            • indisponibilidade de servidores;{"\n"}
            • uso inadequado da plataforma pelo Usuário.{"\n\n"}

            5. Conteúdos Enviados pelos Usuários{"\n"}
            5.1. Fotos, avaliações e comentários enviados pelo Usuário são de sua
            total responsabilidade.{"\n\n"}

            O Usuário declara possuir direitos sobre todo conteúdo enviado e
            autoriza sua exibição dentro da plataforma. Conteúdos poderão ser
            removidos caso violem este Termo.{"\n\n"}

            6. Reservas, Agendamentos e Pesqueiros Cadastrados{"\n"}
            6.1. A Plataforma apenas intermedia o contato e exibição das
            informações dos pesqueiros.{"\n\n"}

            Regras, valores, horários e funcionamento são responsabilidade
            exclusiva do proprietário do pesqueiro.{"\n\n"}

            7. Cadastro e Segurança{"\n"}
            7.1. O Usuário se responsabiliza pela veracidade das informações
            fornecidas e guarda de sua senha.{"\n\n"}

            8. Tratamento de Dados (LGPD){"\n"}
            8.1. A plataforma realiza coleta e tratamento conforme Lei nº 13.709/2018.
            {"\n\n"}

            9. Legislação Aplicável{"\n"}
            Este Termo é regido pelas leis da República Federativa do Brasil,
            foro São Paulo – SP.{"\n\n"}

            {/* --- POLÍTICA DE PRIVACIDADE --- */}

            Política de Privacidade e Proteção de Dados Pessoais{"\n"}
            Esta Política explica como o sistema coleta, armazena e trata os dados
            pessoais do Usuário.{"\n\n"}

            1. Disposições Gerais{"\n"}
            1.1. Ao utilizar o sistema, o Usuário concorda com esta Política.{"\n\n"}

            2. Dados Coletados{"\n"}
            • Nome, CPF/CNPJ, e-mail, telefone{"\n"}
            • Fotos, comentários, avaliações{"\n"}
            • IP, dispositivo, registros de acesso{"\n\n"}

            3. Finalidades{"\n"}
            • Criar contas{"\n"}
            • Mostrar pesqueiros{"\n"}
            • Autenticar{"\n"}
            • Melhorar segurança{"\n\n"}

            4. Compartilhamento{"\n"}
            Somente quando necessário para reservas, obrigações legais ou
            segurança.{"\n\n"}

            5. Segurança{"\n"}
            • Dados armazenados em ambiente protegido{"\n"}
            • Senhas criptografadas{"\n\n"}

            6. Direitos do Usuário{"\n"}
            • Acessar dados{"\n"}
            • Corrigir{"\n"}
            • Excluir{"\n"}
            • Revogar consentimento{"\n\n"}

            7. Cookies{"\n"}
            Usados para sessão e desempenho.{"\n\n"}

            8. Exclusão{"\n"}
            Dados apagados mediante solicitação, exceto obrigações legais.{"\n\n"}

            9. Responsabilidade{"\n"}
            Conteúdos enviados são responsabilidade do Usuário.{"\n\n"}

            10. Contato{"\n"}
            carpacabeçudatcc@gmail.com{"\n\n"}

            11. Foro{"\n"}
            São Paulo – SP.
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
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
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
