import { Alert, ScrollView, View } from "react-native";
import Header from "../../sources/components/header";
import Footer from "../../sources/components/footer";
import CategoriaCard from "../../sources/components/categoriaCard";
import SidebarProvider from "../../sources/config/Provider";
import SideMenu from "../../sources/components/sideMenu";
import TouchableBlur from "../../sources/components/touchableBlur";
import { useState, useEffect } from "react";
import { api } from "../../sources/services/api";

export default function ListaCategorias(){

    const [categories, setCategories] = useState([])

    useEffect(()=>{
        api.get('articles').then((i)=>{
            setCategories(i)
        }).catch(()=>{
            Alert.alert('Erro', 'Ocorreu um erro, tente novamente', [{ text: 'OK' }])
        })
    },[])
    return(<>
    <SidebarProvider>
    <TouchableBlur/>
    <Header/>
    <SideMenu/></SidebarProvider>
    <ScrollView className="h-full bg-[#00021C]">
    <View className="px-6 py-6 h-full flex-row flex-wrap bg-[#00021C] w-screen">
    {categories.length? posts.map((i) => {<CategoriaCard categoryname=""/>}) : ''}
    </View></ScrollView>
    <Footer/>
    </>)
}