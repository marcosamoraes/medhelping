import { ScrollView, View, Text, ActivityIndicator } from "react-native";
import Footer from "@components/footer";
import Header from "@components/header";
import SideMenu from "@components/sideMenu";
import SidebarProvider from "@contexts/Sidebar";
import TouchableBlur from "@components/touchableBlur";
import { useEffect, useRef, useState } from "react";
import { api } from "@services/api";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "expo-router";
import { debounce } from "lodash";
import IShift from "@interfaces/IShift";
import ShiftCard from "@components/ShiftCard";

export default function Shifts() {
    const [shifts, setShifts] = useState<IShift[]>({} as IShift[])
    const [loading, setLoading] = useState<boolean>(false)
    const [search, setSearch] = useState<string>('')

    const navigation = useNavigation()
    
    const debouncedFetch = useRef(
        debounce(async (text: string) => fetchShifts(text), 500)
    ).current

    useEffect(() => {
        return () => {
            debouncedFetch.cancel()
        }
    }, [debouncedFetch])

    const handleSearch = (text: string) => {
        setSearch(text)
        debouncedFetch(text)
    }

    const fetchShifts = async (text?: string) => {
        setLoading(true)
        console.log(text)
        try {
            const { data: { data } } = await api.get(`/shifts?search=${text ?? search}`)
            setShifts(data)
        } catch (error: any) {
            console.log(error.response)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        return navigation.addListener('focus', () => {
            fetchShifts()
        });
    }, [navigation]);

    useEffect(() => {
        fetchShifts()
    }, [])

    return (
        <SidebarProvider>
            <TouchableBlur />
            <Header />
            <SideMenu />

            <ScrollView className="w-screen py-6 px-6 bg-background">
                {shifts.length > 0 && (
                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("publishShift")}>
                        <View className="w-full p-4 rounded-xl bg-primary">
                            <Text className="font-900 mb-3 text-white">Publique um plantão.</Text>
                        </View>
                    </TouchableOpacity>
                )}
                <TextInput
                    placeholder='Busque pelo título, cidade ou unidade'
                    className='h-10 w-full rounded-xl text-sm font-400 mt-5 px-4 bg-background border border-white text-white'
                    placeholderTextColor={'white'}
                    onChangeText={(text) => handleSearch(text)}
                    value={search}
                />
                <View className="flex-row flex-wrap pt-6 pb-4 px-1 justify-between">
                    {loading ? (
                        <ActivityIndicator color="white" size={40} className="flex-1 h-60" />
                    ) : (
                        shifts.length > 0 ? shifts.map((shift) => (
                            <ShiftCard key={shift.id} shift={shift} />
                        )) : (
                            <View className="w-full p-4 rounded-xl bg-primary">
                                <Text className="font-700 text-white">Nenhum plantão encontrado.</Text>
                            </View>
                        )
                    )}
                </View>
            </ScrollView>
            <Footer />
        </SidebarProvider>
    )
}