import { Alert, ScrollView, View } from "react-native";
import Header from "@components/header";
import Footer from "@components/footer";
import SidebarProvider from "@contexts/Sidebar";
import SideMenu from "@components/sideMenu";
import TouchableBlur from "@components/touchableBlur";
import { useState, useEffect } from "react";
import { api } from "@services/api";

export default function ListaCategorias(){
    const [categories, setCategories] = useState([])

    useEffect(()=>{
        api.get('articles').then((i:any)=>{
            setCategories(i)
        }).catch(()=>{
            Alert.alert('Erro', 'Ocorreu um erro, tente novamente', [{ text: 'OK' }])
        })
    },[])

    return(
        <>
            <SidebarProvider>
                <TouchableBlur/>
                <Header/>
                <SideMenu/>
            </SidebarProvider>
            <ScrollView className="h-full bg-[#00021C]">
                <View className="px-6 py-6 h-full flex-row flex-wrap bg-[#00021C] w-screen">
                    {/* {categories.length? posts.map(() => {<CategoriaCard categoryname=""/>}) : ''} */}
                </View>
            </ScrollView>
            <Footer/>
        </>
    )
}