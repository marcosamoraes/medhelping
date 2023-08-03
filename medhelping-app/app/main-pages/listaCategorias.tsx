import { ActivityIndicator, Alert, ScrollView, TextInput, View } from "react-native";
import Header from "@components/header";
import Footer from "@components/footer";
import SidebarProvider from "@contexts/Sidebar";
import SideMenu from "@components/sideMenu";
import TouchableBlur from "@components/touchableBlur";
import { useState, useEffect, useRef } from "react";
import { api } from "@services/api";
import CategoriaCard from "@components/categoriaCard";
import ICategory from "@interfaces/ICategory";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { debounce } from "lodash";

export default function ListaCategorias(){
    const [categories, setCategories] = useState<ICategory[]>({} as ICategory[]);
    const [loading, setLoading] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('')

    const debouncedFetch = useRef(
        debounce(async (text: string) => fetchCategories(text), 500)
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

    const fetchCategories = async (text?: string) => {
        setLoading(true)
        try {
            const { data } = await api.get(`/categories?search=${text ?? search}`)
            setCategories(data)
        } catch (error: any) {
            console.error('categories: ', error.response.data)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    return(
        <>
            <SidebarProvider>
                <TouchableBlur/>
                <Header/>
                <SideMenu/>
            </SidebarProvider>
            <KeyboardAwareScrollView className="h-full bg-background">
                <TextInput
                    placeholder='Digite para buscar...'
                    className='h-10 rounded-xl text-sm font-400 mt-5 mx-6 px-5 bg-background border border-white text-white'
                    placeholderTextColor={'white'}
                    onChangeText={(text) => handleSearch(text)}
                    value={search}
                />
                <View className="px-6 py-6 h-full flex-row flex-wrap bg-background w-screen">
                    {loading ? (
                        <ActivityIndicator color="white" size={40} className="flex-1 h-60" />
                    ) : (
                        categories.length > 0 && categories.map((category) => { 
                            return <CategoriaCard key={category.id} category={category} />
                        })
                    )}
                </View>
            </KeyboardAwareScrollView>
            <Footer/>
        </>
    )
}