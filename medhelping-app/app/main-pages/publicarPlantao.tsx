import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Button } from "react-native";
import Header from "@components/header";
import SidebarProvider from "@contexts/Sidebar";
import SideMenu from "@components/sideMenu";
import TouchableBlur from "@components/touchableBlur";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { api } from "@services/api";
import ICareUnit from "@interfaces/ICareUnit";
import SelectPicker from "@components/SelectPicker";
import Checkbox from "expo-checkbox";

export default function PublicarPlantao() {
  const [loading, setLoading] = useState<boolean>(false);
  const [careUnits, setCareUnits] = useState<ICareUnit[]>({} as ICareUnit[]);
  const [careUnit, setCareUnit] = useState<string|null>(null);
  const [city, setCity] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [entryTime, setEntryTime] = useState<string>('');
  const [outTime, setOutTime] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('')
  const [description, setDescription] = useState<string>('');
  const [anonymousPublication, setAnonymousPublication] = useState<boolean>(false)

  const navigation = useNavigation();

  const fetchCareUnits = async () => {
    try {
      const { data } = await api.get(`/care-units`)
      
      const fetchedCareUnits = Object.entries(data).map(([id, name]) => ({
        id: parseInt(id),
        name: name as string,
      }));
      
      setCareUnits(fetchedCareUnits)
    } catch (error: any) {
      console.error(error.response.data.message ?? 'Ocorreu um erro, tente novamente')
    }
  }

  useEffect(() => {
    fetchCareUnits()
  }, [])

  const handleSubmit = async () => {
    setLoading(true)
    
    try {
      const obj = {
        care_unit_id: careUnit,
        city,
        date,
        entry_time: entryTime,
        out_time: outTime,
        value,
        payment_method: paymentMethod,
        description,
        anonymous_publication: anonymousPublication
      } as any

      await api.post('/shifts', obj)

      Alert.alert('Sucesso', 'Plantão cadastrado com sucesso.', [{ text: 'OK' }])
      navigation.navigate('shifts')
    } catch (error: any) {
      console.error(error.response.data.error)
      const message = error.response.data.message ?? 'Ocorreu um erro, tente novamente';
      Alert.alert('Erro', message, [{ text: 'OK' }])
    } finally {
      setLoading(false)
    }
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
      <ScrollView className="w-screen pt-6 px-6 bg-background">
          <View className="w-full p-3 rounded-xl bg-primary">
            <Text className="font-900 text-white">Publique seu plantão.</Text>
          </View>
          <View className="w-full px-2">
          
          <SelectPicker name="Unidade *" items={careUnits} value={careUnit} setValue={setCareUnit} />
          
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
            value={entryTime}
            onChangeText={setEntryTime}
          />
          <TextInput
            style={styles.input}
            placeholder='Hora de Saída *'
            className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
            placeholderTextColor={'white'}
            value={outTime}
            onChangeText={setOutTime}
          />
          <TextInput
            style={styles.input}
            placeholder='Valor'
            className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
            placeholderTextColor={'white'}
            value={value}
            onChangeText={setValue}
          />
          <TextInput
            style={styles.input}
            placeholder='Método de pagamento'
            className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
            placeholderTextColor={'white'}
            value={paymentMethod}
            onChangeText={setPaymentMethod}
          />
          <TextInput
            style={styles.inputD}
            placeholder='Descrição *'
            multiline={true}
            className='h-14 w-full align-text-top rounded-xl text-sm font-400 my-3 py-2 px-4'
            placeholderTextColor={'white'}
            value={description}
            onChangeText={setDescription}
          />
          <View className="flex-row items-center my-4">
            <Checkbox
              value={anonymousPublication}
              onValueChange={(newValue) => setAnonymousPublication(newValue)} />
            <Text className="font-400 ml-3 pt-1 text-sm text-white">Publicar de Forma Anônima</Text>
          </View>
          <TouchableOpacity 
            disabled={loading} 
            onPress={()=>handleSubmit()} 
            activeOpacity={0.8} 
            className="flex-row w-full bg-primary justify-center py-2 rounded-xl my-3 items-center"
          >
            <Text className="text-white font-700 text-sm ml-2">Publicar Diagnóstico</Text>
          </TouchableOpacity>
          <View className="h-10"></View>
        </View>
      </ScrollView>
    </>
  )
}