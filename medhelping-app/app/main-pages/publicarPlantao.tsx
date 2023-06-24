import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Header from "@components/header";
import SidebarProvider from "@contexts/Sidebar";
import SideMenu from "@components/sideMenu";
import TouchableBlur from "@components/touchableBlur";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { api } from "@services/api";

export default function PublicarPlantao() {
  const [loading, setLoading] = useState(false);
  const [care_unities, setCareUnities] = useState<{ [key: string]: string }>({});
  const [selected_unity, setSelectedUnity] = useState('');
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');
  const [entry_time, setEntryTime] = useState('');
  const [out_time, setOutTime] = useState('');
  const [value, setValue] = useState('');
  const [payment_method, setPaymentMethod] = useState('')
  const [description, setDescription] = useState('');

  const navigation = useNavigation();
  //SEGUINTE CODIGO PEGA AS CARE UNITIES DA API
  useEffect(()=>{
    api.get('/care-units').then((i:any)=>{
        setCareUnities(i)
    }).catch(()=>{
        Alert.alert('Erro', 'Ocorreu um erro, tente novamente', [{ text: 'OK' }])
    })
},[])

//SEGUINTE CODIGO ACONTECE AO APERTAR O BOTAO
  function postPlant() {
    //aqui eu checo se a unity_selected (unidade que o usuario colocou no input) é uma das 5 da api. talvez seja melhor trocar por um select
    const selectedId = Object.keys(care_unities).find((key) => care_unities[key] === selected_unity);
    if (!selectedId) {
      Alert.alert('Erro', 'Unidade inválida', [{ text: 'OK' }])
    return  
    }
    setLoading(true)
    const obj = {
      city,
      care_unity_id: selectedId,
      date,
      entry_time,
      out_time,
      value,
      payment_method,
      description
    }
    api.post('/shifts', obj).then(reqSuccess).catch(reqFailure)
  }

  function reqSuccess() {
    setLoading(false)
    navigation.navigate("home")
  }

  function reqFailure() {
    Alert.alert('Erro', 'Ocorreu um erro, tente novamente', [{ text: 'OK' }])
    setLoading(false)
  }
  const styles = StyleSheet.create({
    input:{
      borderColor: 'white',
      borderWidth: 1,
      color: 'white'
    },
    inputD:{
      borderColor: 'white',
      borderWidth: 1,
      color: 'white',
      textAlignVertical: 'top'
    }
  });

  return(
    <>
      <SidebarProvider>
        <TouchableBlur/>
        <Header/>
        <SideMenu/>
      </SidebarProvider>
      <ScrollView className="w-screen pt-6 px-6 bg-[#00021C]">
          <View className="w-full p-3 rounded-xl bg-[#03dadbb2]">
            <Text className="font-900 text-white">Publique seu plantão.</Text>
          </View>
          <View className="w-full px-2">
          <TextInput
            style={styles.input}
            placeholder='Unidade *'
            className='h-10 w-full rounded-xl text-sm font-400 mb-3 mt-5 px-4'
            placeholderTextColor={'white'}
            value={selected_unity}
            onChangeText={setSelectedUnity}
          />
          <TextInput
            style={styles.input}
            placeholder='Cidade *'
            className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
            placeholderTextColor={'white'}
            value={city}
            onChangeText={setCity}
          />
          <TextInput
            style={styles.input}
            placeholder='Data *'
            className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
            placeholderTextColor={'white'}
            value={date}
            onChangeText={setDate}
          />
          <TextInput
            style={styles.input}
            placeholder='Hora de Entrada *'
            className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
            placeholderTextColor={'white'}
            value={entry_time}
            onChangeText={setEntryTime}
          />
          <TextInput
            style={styles.input}
            placeholder='Hora de Saída *'
            className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
            placeholderTextColor={'white'}
            value={out_time}
            onChangeText={setOutTime}
          />
          <TextInput
            style={styles.input}
            placeholder='Valor *'
            className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
            placeholderTextColor={'white'}
            value={value}
            onChangeText={setValue}
          />
          <TextInput
            style={styles.input}
            placeholder='Método de pagamento *'
            className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
            placeholderTextColor={'white'}
            value={payment_method}
            onChangeText={setPaymentMethod}
          />
          <TextInput
            style={styles.inputD}
            placeholder='Descrição'
            multiline={true}
            className='h-14 w-full align-text-top rounded-xl text-sm font-400 my-3 py-2 px-4'
            placeholderTextColor={'white'}
            value={description}
            onChangeText={setDescription}
          />
          <TouchableOpacity 
            disabled={loading} 
            onPress={()=>postPlant()} 
            activeOpacity={0.8} 
            className="flex-row w-full bg-[#03dadbb2] justify-center py-2 rounded-xl my-3 items-center"
          >
            <Text className="text-white font-700 text-sm ml-2">Publicar Diagnóstico</Text>
          </TouchableOpacity>
          <View className="h-10"></View>
        </View>
      </ScrollView>
    </>
  )
}