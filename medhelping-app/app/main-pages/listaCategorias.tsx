import { ActivityIndicator, Alert, ScrollView, View } from "react-native";
import Header from "@components/header";
import Footer from "@components/footer";
import SidebarProvider from "@contexts/Sidebar";
import SideMenu from "@components/sideMenu";
import TouchableBlur from "@components/touchableBlur";
import { useState, useEffect } from "react";
import { api } from "@services/api";
import CategoriaCard from "@components/categoriaCard";
import ICategory from "@interfaces/ICategory";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function ListaCategorias(){
    const [categories, setCategories] = useState<ICategory[]>({} as ICategory[]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchCategories = async () => {
        setLoading(true)
        try {
            const { data } = await api.get('/categories')
            setCategories(data)
        } catch (error) {
            console.error('listaCategorias: ', error)
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