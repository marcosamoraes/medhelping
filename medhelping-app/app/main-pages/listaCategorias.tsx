import { ScrollView, View } from "react-native";
import Header from "../../sources/components/header";
import Footer from "../../sources/components/footer";
import CategoriaCard from "../../sources/components/categoriaCard";
import SidebarProvider from "../../sources/config/Provider";
import SideMenu from "../../sources/components/sideMenu";
import TouchableBlur from "../../sources/components/touchableBlur";

export default function ListaCategorias(){
    return(<>
    <SidebarProvider>
    <TouchableBlur/>
    <Header/>
    <SideMenu/></SidebarProvider>
    <ScrollView className="h-full bg-[#00021C]">
    <View className="px-6 py-6 h-full flex-row flex-wrap bg-[#00021C] w-screen">
        <CategoriaCard categoryname="Categoria 1"/>
        <CategoriaCard categoryname="Categoria 1"/>
        <CategoriaCard categoryname="Categoria 1"/>
        <CategoriaCard categoryname="Categoria 1"/>
        <CategoriaCard categoryname="Categoria 1"/>

        <CategoriaCard categoryname="Categoria 1"/>

        <CategoriaCard categoryname="Categoria 1"/>
        <CategoriaCard categoryname="Categoria 1"/>
        <CategoriaCard categoryname="Categoria 1"/>

        <CategoriaCard categoryname="Categoria 1"/>
        <CategoriaCard categoryname="Categoria 1"/>
        <CategoriaCard categoryname="Categoria 1"/>

        <CategoriaCard categoryname="Categoria 1"/>
    </View></ScrollView>
    <Footer/>
    </>)
}