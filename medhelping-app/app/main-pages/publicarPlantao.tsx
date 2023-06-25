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
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";

export default function PublicarPlantao() {
  const [loading, setLoading] = useState<boolean>(false);
  const [careUnits, setCareUnits] = useState<ICareUnit[]>({} as ICareUnit[]);
  const [careUnit, setCareUnit] = useState<string|null>(null);
  const [city, setCity] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [showDate, setShowDate] = useState<boolean>(false);
  const [entryTime, setEntryTime] = useState<Date>(new Date());
  const [showEntryTime, setShowEntryTime] = useState<boolean>(false);
  const [outTime, setOutTime] = useState<Date>(new Date());
  const [showOutTime, setShowOutTime] = useState<boolean>(false);
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
        date: moment(date).format('YYYY-MM-DD'),
        entry_time: moment(entryTime).format('HH:mm'),
        out_time: moment(outTime).format('HH:mm'),
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

  const handleDateChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShowDate(false)
    setDate(currentDate)
  };

  const handleEntryTimeChange = (event: any, selectedTime: any) => {
    const currentTime = selectedTime || entryTime;
    setShowEntryTime(false)
    setEntryTime(currentTime)
  };

  const handleOutTimeChange = (event: any, selectedTime: any) => {
    const currentTime = selectedTime || outTime;
    setShowOutTime(false)
    setOutTime(currentTime)
  };

  const dateFormatted = moment(date).format('DD/MM/YYYY')
  const entryTimeFormatted = moment(entryTime).format('HH:mm')
  const outTimeFormatted = moment(outTime).format('HH:mm')

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
            value={dateFormatted}
            onFocus={() => setShowDate(true)}
          />
          {showDate && (
            <DateTimePicker
              value={date}
              mode="date"
              display="spinner"
              onChange={handleDateChange}
            />
          )}

          <TextInput
            style={styles.input}
            placeholder='Hora de Entrada *'
            className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
            placeholderTextColor={'white'}
            value={entryTimeFormatted}
            onFocus={() => setShowEntryTime(true)}
          />
          {showEntryTime && (
            <DateTimePicker
              value={entryTime}
              mode="time"
              display="spinner"
              is24Hour={true}
              onChange={handleEntryTimeChange}
            />
          )}

          <TextInput
            style={styles.input}
            placeholder='Hora de Saída *'
            className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
            placeholderTextColor={'white'}
            value={outTimeFormatted}
            onFocus={() => setShowOutTime(true)}
          />
          {showOutTime && (
            <DateTimePicker
              value={outTime}
              mode="time"
              display="spinner"
              is24Hour={true}
              onChange={handleOutTimeChange}
            />
          )}

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