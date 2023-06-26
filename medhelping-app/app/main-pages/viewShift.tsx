import { Image, ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Share, ActivityIndicator } from "react-native";
import Header from "@components/header";
import SidebarProvider from "@contexts/Sidebar";
import SideMenu from "@components/sideMenu";
import TouchableBlur from "@components/touchableBlur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { api } from "@services/api";
import { useNavigation } from "expo-router";
import IShift from "@interfaces/IShift";
import Footer from "@components/footer";

const examBackground = require("../../assets/images/img-fundo-exame.png");

export default function ViewShift() {
    const route = useRoute();
    const { id } : any = route.params;

    const [shift, setShift] = useState<IShift>({} as IShift);
    const [refetch, setRefetch] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false)

    const navigation = useNavigation();

    const fetchShift = async () => {
        setLoading(true)
        try {
            const { data: { shift } } = await api.get(`/shifts/${id}`);
            setShift(shift);
        } catch (error: any) {
            const message = error.response.data.message ?? 'Ocorreu um erro, tente novamente';
            Alert.alert('Erro', message, [{ text: 'OK' }])
            navigation.goBack()
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchShift()
    }, [refetch])

    const { bottom } = useSafeAreaInsets()
    const styles = StyleSheet.create({
        input: {
            borderColor: 'white',
            borderWidth: 1,
            color: 'white'
        }
    })

    return (
        <>
            <SidebarProvider>
                <TouchableBlur />
                <Header />
                <SideMenu />
            </SidebarProvider>
            <ScrollView className="w-screen bg-background">
                {!loading ? (
                    <>
                        <Image className="w-full h-40 object-cover" source={examBackground} />
                        <View className="p-4 border-b mb-4 border-b-[#1F2935]">
                            <Text className="text-white text-center font-900 text-xl py-2">
                                {`${shift.care_unit?.name} - ${shift.city}`}
                            </Text>
                            {shift.user && !shift.anonymous_publication ? (
                                <TouchableOpacity 
                                    className="flex flex-row justify-center"
                                    onPress={() => navigation.navigate('viewProfile', {id: shift.user?.id})}
                                >
                                    <Text className="text-blue-500 text-center font-700 text-sm py-2">
                                        {shift.user?.name}
                                    </Text>
                                    <Text className="text-white text-center font-500 text-sm py-2">
                                        {''} em {shift.created_at?.substring(0, 10)}
                                    </Text>
                                </TouchableOpacity>
                            ) : (
                                <Text className="text-white text-center font-500 text-sm py-2">
                                    Anônimo em {shift.created_at?.substring(0, 10)}
                                </Text>
                            )}
                            <Text className="text-white text-center font-500 text-sm py-2">
                                Data do plantão: {shift.date}
                            </Text>
                            <Text className="text-white text-center font-500 text-sm py-2">
                                Horário: {shift.entry_time}hrs às {shift.out_time}hrs
                            </Text>
                            {shift.value && (
                                <Text className="text-white text-center font-500 text-sm py-2">
                                    Valor: R${shift.value.replace('.', ',')}
                                </Text>
                            )}
                            {shift.payment_method && (
                                <Text className="text-white text-center font-500 text-sm py-2">
                                    Método de pagamento: {shift.payment_method}
                                </Text>
                            )}
                            <Text className="text-white text-center font-500 text-sm py-2">
                                {shift.description}
                            </Text>
                        </View>
                    </>
                ) : (
                    <View className="flex-1 justify-center h-40">
                        <ActivityIndicator size="large" color="white" />
                    </View>
                )}
            </ScrollView>
            <Footer />
        </>
    )
}