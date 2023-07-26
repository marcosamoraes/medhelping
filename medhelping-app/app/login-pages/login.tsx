import React, { useContext, useState } from 'react';
import { View, Image, StyleSheet, TextInput, Text, TouchableOpacity, Alert, ActivityIndicator, KeyboardAvoidingView, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "expo-router";
import { AuthContext } from '@contexts/Auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const logo = require('../../assets/images/medhelping_logo.png');

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signIn, loading, activeLoading } = useContext(AuthContext)

    const navigation = useNavigation();

    async function handleLogin() {
        activeLoading()

        try {
            await signIn(email, password)
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

    return (
        <KeyboardAwareScrollView className="bg-background flex-1">
            <Image style={styles.logo}
                className="w-28 mx-auto h-28 z-10 border-2 rounded-3xl mt-24 mb-20"
                source={logo}
            />
            <LinearGradient
                colors={['#03DADB', '#07ACF7']}
                style={styles.container}
                className="absolute bg-[#3599C3] transform -rotate-12"
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
                placeholder='Senha'
                className='mx-auto h-10 w-4/5 rounded-xl text-sm font-400 my-3 px-4'
                placeholderTextColor={'white'}
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity
                disabled={loading}
                onPress={() => handleLogin()}
                activeOpacity={0.8}
                className='mx-auto w-4/5 overflow-hidden bg-[#348CA9] my-5 h-11 justify-center items-center rounded-2xl'
            >
                <LinearGradient
                    colors={['rgba(3, 218, 219, 0.7)', 'rgba(7, 172, 247, 0.7)']}
                    className='w-full h-full flex justify-center items-center'
                >
                    <Text className='font-900 text-white text-base'>
                        {loading ? <ActivityIndicator color="white" /> : "Entrar"}
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity className='mx-auto my-5' onPress={() => navigation.navigate("forgotPassword")}>
                <Text className='font-900 text-white text-base my-5'>
                    Esqueci minha senha
                </Text>
            </TouchableOpacity>
            <TouchableOpacity className='mx-auto mb-3' onPress={() => navigation.navigate('register')}>
                <Text className='font-900 text-[#03DADB] text-base mt-5 mb-3'>
                    Novo no app? Criar conta!
                </Text>
            </TouchableOpacity>
        </KeyboardAwareScrollView>
    )
}