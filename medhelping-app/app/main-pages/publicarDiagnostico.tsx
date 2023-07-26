import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, Image } from "react-native";
import Header from "@components/header";
import { Feather } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import SidebarProvider from "@contexts/Sidebar";
import SideMenu from "@components/sideMenu";
import TouchableBlur from "@components/touchableBlur";
import { api } from "@services/api";
import ICategory from "@interfaces/ICategory";
import SelectPicker from "@components/SelectPicker";
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function PublicarDiagnostico() {
    const [loading, setLoading] = useState<boolean>(false);
    const [categories, setCategories] = useState<ICategory[]>({} as ICategory[]);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [category, setCategory] = useState<string|null>(null);
    const [categoryTwo, setCategoryTwo] = useState<string|null>(null);
    const [categoryThree, setCategoryThree] = useState<string|null>(null);
    const [anonymousPublication, setAnonymousPublication] = useState<boolean>(false)
    const [preview, setPreview] = useState<string|null>(null)

    const navigation = useNavigation();

    const fetchCategories = async () => {
        try {
            const { data } = await api.get(`/categories`)
            setCategories(data)
        } catch (error: any) {
            console.error('publicarDiagnostico->fetchCategories: ', error.response.data.message ?? 'Ocorreu um erro, tente novamente')
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    const handleSubmit = async () => {
        setLoading(true)
        
        try {
            const obj = {
                title,
                description,
                categories: [
                    category,
                    categoryTwo,
                    categoryThree
                ],
                anonymous_publication: anonymousPublication
            } as any

            if (preview) {
                const uploadFormData = new FormData()

                uploadFormData.append('file', {
                    uri: preview,
                    name: 'image.jpg',
                    type: 'image/jpg'
                } as any)

                const { data } = await api.post('/upload/articles', uploadFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
            
                obj['image'] = data
            }

            const data = await api.post('/articles', obj)

            Alert.alert('Sucesso', 'Artigo cadastrado com sucesso.', [{ text: 'OK' }])
            navigation.navigate('home')
        } catch (error: any) {
            console.error('publicarDiagnostico->handleSubmit: ', error.response.data.error)
            const message = error.response.data.message ?? 'Ocorreu um erro, tente novamente';
            Alert.alert('Erro', message, [{ text: 'OK' }])
        } finally {
            setLoading(false)
        }
    }

    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                quality: 1,
            });
        
            if (!result.canceled && result.assets[0]) {
                setPreview(result.assets[0].uri);
            }
        } catch (error: any) {
            console.error('publicarDiagnostico->pickImage: ', error);
        }
    };

    const styles = StyleSheet.create({
        input: {
            borderColor: 'white',
            borderWidth: 1,
            color: 'white'
        },
        inputD: {
            borderColor: 'white',
            borderWidth: 1,
            color: 'white',
            textAlignVertical: 'top'
        }
    });

    return (
        <>
            <SidebarProvider>
                <TouchableBlur/>
                <Header/>
                <SideMenu/>
            </SidebarProvider>
            <KeyboardAwareScrollView className="w-screen pt-6 px-6 bg-background">
                <View className="w-full p-4 rounded-xl bg-primary">
                    <Text className="font-900 mb-3 text-white">Publique seu caso clínico.</Text>
                    <Text className="font-700 text-white">Pergunte a comunidade MedHelping.</Text>
                </View>
                <View className="w-full px-2">
                    <TextInput
                        style={styles.input}
                        placeholder='Título'
                        className='h-10 w-full rounded-xl text-sm font-400 mb-3 mt-5 px-4'
                        placeholderTextColor={'white'}
                        value={title}
                        onChangeText={setTitle}
                    />
                    <TextInput
                        style={styles.inputD}
                        placeholder='Descrição'
                        multiline={true}
                        className='h-32 w-full align-text-top rounded-xl text-sm font-400 my-3 py-2 px-4'
                        placeholderTextColor={'white'}
                        value={description}
                        onChangeText={setDescription}
                    />

                    <TouchableOpacity 
                        activeOpacity={0.8} 
                        className="flex-row w-full bg-primary justify-center py-2 rounded-xl my-3 items-center"
                        onPress={pickImage}
                    >
                        <Feather name="paperclip" size={18} color="white" />
                        <Text className="text-white font-700 text-sm ml-2">Enviar Imagem ou Vídeo</Text>
                    </TouchableOpacity>

                    {preview && (
                        <View className="border border-1 border-white border-radius rounded-lg my-5 p-3">
                            <Image source={{ uri: preview }} className="w-full h-40" />
                        </View>
                    )}

                    <SelectPicker name="Categoria 1 *" items={categories} value={category} setValue={setCategory} />
                    <SelectPicker name="Categoria 2" items={categories} value={categoryTwo} setValue={setCategoryTwo} />
                    <SelectPicker name="Categoria 3" items={categories} value={categoryThree} setValue={setCategoryThree} />

                    <View className="flex-row items-center my-4">
                        <Checkbox
                            value={anonymousPublication}
                            onValueChange={(newValue) => setAnonymousPublication(newValue)} />
                        <Text className="font-400 ml-3 pt-1 text-sm text-white">Publicar de Forma Anônima</Text>
                    </View>
                    <View className="w-full p-4 rounded-xl bg-yellow-300">
                        <Text className="font-500 text-yellow-900">Certifique-se de que os posts não contenham dados/fotos 
                        ou vídeos que possam identificar o paciente, mantendo sua privacidade. Conteúdos fora dessa normativa, 
                        após devidamente analisados e identificados, serão excluídos.</Text>
                    </View>
                    <TouchableOpacity 
                        disabled={loading} 
                        onPress={()=> handleSubmit()} 
                        activeOpacity={0.8} 
                        className="flex-row w-full bg-primary justify-center py-2 rounded-xl my-3 items-center"
                    >
                        <Text className="text-white font-700 text-sm ml-2">
                            {loading ? <ActivityIndicator color="white" /> : "Publicar Caso"}
                        </Text>
                    </TouchableOpacity>
                    <View className="h-10"></View>
                </View>
            </KeyboardAwareScrollView>
        </>
    )
}