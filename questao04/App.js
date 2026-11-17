import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function App() {
  const [temperatura, setTemperatura] = useState('');
  const [sentido, setSentido] = useState('C_F');
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState('');

  // CONVERTER TEMPERATURA
  function converterTemperatura() {
    setErro('');
    setResultado(null);

    if (temperatura.trim() === '') {
      setErro('Digite uma temperatura.');
      return;
    }

    const valor = Number(temperatura.replace(',', '.'));

    if (!Number.isFinite(valor)) {
      setErro('Digite um valor numérico válido.');
      return;
    }

    let convertido;

    if (sentido === 'C_F') {
      // Celsius para Fahrenheit
      convertido = (valor * 9 / 5) + 32;
    } else {
      // Fahrenheit para Celsius
      convertido = (valor - 32) * 5 / 9;
    }

    setResultado(convertido);
  }

  // LIMPAR CAMPOS
  function limpar() {
    setTemperatura('');
    setResultado(null);
    setErro('');
    setSentido('C_F');
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar
        backgroundColor="#f1f5f9"
        barStyle="dark-content"
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>

            {/* CABEÇALHO */}

            <View style={styles.header}>
              <Text style={styles.icone}>🌡️</Text>

              <Text style={styles.titulo}>
                Conversor de Temperatura
              </Text>

              <Text style={styles.subtitulo}>
                Converta temperaturas entre Celsius e Fahrenheit.
              </Text>
            </View>

            {/* CAMPO DE TEMPERATURA */}

            <Text style={styles.label}>
              Digite a temperatura
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Ex.: 30"
              value={temperatura}
              onChangeText={setTemperatura}
              keyboardType="decimal-pad"
            />

            {/* SELEÇÃO DA CONVERSÃO */}

            <Text style={styles.label}>
              Sentido da conversão
            </Text>

            <TouchableOpacity
              style={[
                styles.opcao,
                sentido === 'C_F' && styles.opcaoSelecionada,
              ]}
              onPress={() => {
                setSentido('C_F');
                setResultado(null);
                setErro('');
              }}
            >
              <Text
                style={[
                  styles.opcaoTexto,
                  sentido === 'C_F' && styles.textoSelecionado,
                ]}
              >
                Celsius (°C) → Fahrenheit (°F)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.opcao,
                sentido === 'F_C' && styles.opcaoSelecionada,
              ]}
              onPress={() => {
                setSentido('F_C');
                setResultado(null);
                setErro('');
              }}
            >
              <Text
                style={[
                  styles.opcaoTexto,
                  sentido === 'F_C' && styles.textoSelecionado,
                ]}
              >
                Fahrenheit (°F) → Celsius (°C)
              </Text>
            </TouchableOpacity>

            {/* BOTÃO CONVERTER */}

            <TouchableOpacity
              style={styles.botaoConverter}
              onPress={converterTemperatura}
              activeOpacity={0.8}
            >
              <Text style={styles.botaoTexto}>
                Converter temperatura
              </Text>
            </TouchableOpacity>

            {/* ERRO */}

            {erro !== '' && (
              <View style={styles.erroBox}>
                <Text style={styles.erroTexto}>
                  {erro}
                </Text>
              </View>
            )}

            {/* RESULTADO */}

            {resultado !== null && (
              <View style={styles.resultadoBox}>

                <Text style={styles.resultadoTitulo}>
                  Resultado da conversão
                </Text>

                <Text style={styles.valorOriginal}>
                  {Number(temperatura.replace(',', '.'))}°
                  {sentido === 'C_F' ? 'C' : 'F'}
                </Text>

                <Text style={styles.seta}>
                  ↓
                </Text>

                <Text style={styles.resultadoValor}>
                  {resultado.toFixed(2).replace('.', ',')}°
                  {sentido === 'C_F' ? 'F' : 'C'}
                </Text>

                <Text style={styles.mensagem}>
                  {sentido === 'C_F'
                    ? 'Celsius convertido para Fahrenheit.'
                    : 'Fahrenheit convertido para Celsius.'}
                </Text>

              </View>
            )}

            {/* FÓRMULAS */}

            <View style={styles.formulas}>
              <Text style={styles.formulaTitulo}>
                Fórmulas utilizadas
              </Text>

              <Text style={styles.formula}>
                Fahrenheit = (Celsius × 9/5) + 32
              </Text>

              <Text style={styles.formula}>
                Celsius = (Fahrenheit − 32) × 5/9
              </Text>
            </View>

            {/* LIMPAR */}

            <TouchableOpacity
              style={styles.botaoLimpar}
              onPress={limpar}
            >
              <Text style={styles.limparTexto}>
                Limpar campos
              </Text>
            </TouchableOpacity>

            <Text style={styles.rodape}>
              Aplicativo de Conversão de Temperaturas
            </Text>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },

  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 18,
  },

  container: {
    backgroundColor: '#ffffff',
    padding: 22,
    borderRadius: 14,
    elevation: 4,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  header: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#cbd5e1',
    paddingBottom: 20,
    marginBottom: 20,
  },

  icone: {
    fontSize: 45,
    marginBottom: 8,
  },

  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0f172a',
    textAlign: 'center',
  },

  subtitulo: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 6,
    textAlign: 'center',
  },

  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0f172a',
    marginTop: 15,
    marginBottom: 8,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 18,
    color: '#0f172a',
    backgroundColor: '#ffffff',
  },

  opcao: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#ffffff',
  },

  opcaoSelecionada: {
    backgroundColor: '#dbeafe',
    borderColor: '#2563eb',
    borderWidth: 2,
  },

  opcaoTexto: {
    fontSize: 14,
    color: '#475569',
    fontWeight: '500',
    textAlign: 'center',
  },

  textoSelecionado: {
    color: '#1d4ed8',
    fontWeight: 'bold',
  },

  botaoConverter: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },

  botaoTexto: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },

  erroBox: {
    backgroundColor: '#fee2e2',
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
  },

  erroTexto: {
    color: '#b91c1c',
    fontWeight: 'bold',
    fontSize: 13,
  },

  resultadoBox: {
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#93c5fd',
    borderRadius: 10,
    padding: 20,
    marginTop: 22,
    alignItems: 'center',
  },

  resultadoTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e40af',
  },

  valorOriginal: {
    fontSize: 22,
    color: '#64748b',
    marginTop: 15,
  },

  seta: {
    fontSize: 25,
    color: '#2563eb',
    marginVertical: 5,
  },

  resultadoValor: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#2563eb',
  },

  mensagem: {
    fontSize: 13,
    color: '#475569',
    textAlign: 'center',
    marginTop: 12,
  },

  formulas: {
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 8,
    marginTop: 22,
  },

  formulaTitulo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 10,
  },

  formula: {
    fontSize: 12,
    color: '#475569',
    marginBottom: 8,
  },

  botaoLimpar: {
    backgroundColor: '#e2e8f0',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 18,
  },

  limparTexto: {
    color: '#0f172a',
    fontWeight: 'bold',
    fontSize: 14,
  },

  rodape: {
    textAlign: 'center',
    color: '#64748b',
    fontSize: 11,
    marginTop: 20,
  },
});


