import React, { useContext, useState } from 'react';
import { View, Image, StyleSheet, TextInput, Text, Alert, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useNavigation } from "expo-router";
import { AuthContext } from '@contexts/Auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SelectPicker from '@components/SelectPicker';

const logo = require('../../assets/images/medhelping_logo.png');

export default function Cadastro() {
  const [name, setName] = useState('');
  const [crm, setCrm] = useState('');
  const [state, setState] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const { register, loading, activeLoading } = useContext(AuthContext)

  const navigation = useNavigation();

  async function handleRegister() {
    if(passwordConfirmation !== password){
      Alert.alert('Erro', 'Senhas diferentes', [{ text: 'OK' }])
      return
    }

    activeLoading()

    try {
      await register(name, email, crm, state, password, passwordConfirmation)
    } catch (error: any) {
      Alert.alert('Erro', error, [{ text: 'OK' }])
    }
  }

  const styles = StyleSheet.create({
    container: {
      width: 1000,
      height: 280,
      top: -120,
      left: '50%',
      marginLeft: -500

    },
    logo: {
      borderColor: '#EEEEEE',
      borderWidth: 2
    },
    input: {
      borderColor: 'white',
      borderWidth: 1,
      color: 'white'
    }
  });

  const states = [
    { id: 'AC', name: 'Acre' },
    { id: 'AL', name: 'Alagoas' },
    { id: 'AP', name: 'Amapá' },
    { id: 'AM', name: 'Amazonas' },
    { id: 'BA', name: 'Bahia' },
    { id: 'CE', name: 'Ceará' },
    { id: 'DF', name: 'Distrito Federal' },
    { id: 'ES', name: 'Espírito Santo' },
    { id: 'GO', name: 'Goiás' },
    { id: 'MA', name: 'Maranhão' },
    { id: 'MT', name: 'Mato Grosso' },
    { id: 'MS', name: 'Mato Grosso do Sul' },
    { id: 'MG', name: 'Minas Gerais' },
    { id: 'PA', name: 'Pará' },
    { id: 'PB', name: 'Paraíba' },
    { id: 'PR', name: 'Paraná' },
    { id: 'PE', name: 'Pernambuco' },
    { id: 'PI', name: 'Piauí' },
    { id: 'RJ', name: 'Rio de Janeiro' },
    { id: 'RN', name: 'Rio Grande do Norte' },
    { id: 'RS', name: 'Rio Grande do Sul' },
    { id: 'RO', name: 'Rondônia' },
    { id: 'RR', name: 'Roraima' },
    { id: 'SC', name: 'Santa Catarina' },
    { id: 'SP', name: 'São Paulo' },
    { id: 'SE', name: 'Sergipe' },
    { id: 'TO', name: 'Tocantins' },
  ]

  return (
    <KeyboardAwareScrollView className="bg-background flex-1">
      <Image style={styles.logo}
        className="mx-auto w-28 h-28 z-10 border-2 rounded-3xl mt-24 mb-16"
        source={logo}
      />
      <LinearGradient
        colors={['#03DADB', '#07ACF7']}
        style={styles.container}
        className="absolute bg-[#3599C3] transform -rotate-12"
      />
      <TextInput
        style={styles.input}
        placeholder='Nome Completo'
        className='mx-auto h-10 w-4/5 rounded-xl text-sm font-400 my-3 px-4'
        placeholderTextColor={'white'}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder='Email'
        className='mx-auto h-10 w-4/5 rounded-xl text-sm font-400 my-3 px-4'
        placeholderTextColor={'white'}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder='CRM'
        className='mx-auto h-10 w-4/5 rounded-xl text-sm font-400 my-3 px-4'
        placeholderTextColor={'white'}
        value={crm}
        onChangeText={setCrm}
      />
      <View className='mx-auto w-4/5 rounded-xl text-sm font-400' style={{ marginTop: -10 }}>
        <SelectPicker name="Estado" items={states} value={state} setValue={setState} marginTop={-350} placeholder='Estado (UF)' />
      </View>
      <TextInput
        style={styles.input}
        placeholder='Senha'
        className='mx-auto h-10 w-4/5 rounded-xl text-sm font-400 my-3 px-4'
        placeholderTextColor={'white'}
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder='Confirmar senha'
        className='mx-auto h-10 w-4/5 rounded-xl text-sm font-400 my-3 px-4'
        placeholderTextColor={'white'}
        secureTextEntry={true}
        value={passwordConfirmation}
        onChangeText={setPasswordConfirmation}
      />
      <TouchableOpacity 
        disabled={loading} 
        onPress={() => handleRegister()} 
        activeOpacity={0.8} 
        className='mx-auto w-4/5 overflow-hidden bg-[#348CA9] my-5 h-11 justify-center items-center rounded-2xl'
      >
        <LinearGradient
          colors={['rgba(3, 218, 219, 0.7)', 'rgba(7, 172, 247, 0.7)']}
          className='w-full h-full flex justify-center items-center'
        >
          <Text className='font-900 text-white text-base'>
            {loading ? <ActivityIndicator color="white" /> : "Cadastrar"}
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity className='mx-auto mb-2' onPress={() => navigation.navigate('login')}>
        <Text className='font-900 text-white text-base my-5'>Fazer Login</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  )
}