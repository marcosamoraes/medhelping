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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function PublicarPlantao() {
  const [loading, setLoading] = useState<boolean>(false);
  const [careUnits, setCareUnits] = useState<ICareUnit[]>({} as ICareUnit[]);
  const [careUnit, setCareUnit] = useState<string|null>(null);
  const [city, setCity] = useState<string>('');
  const [date, setDate] = useState<Date|null>(null);
  const [showDate, setShowDate] = useState<boolean>(false);
  const [entryTime, setEntryTime] = useState<Date|null>(null);
  const [showEntryTime, setShowEntryTime] = useState<boolean>(false);
  const [outTime, setOutTime] = useState<Date|null>(null);
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
      console.error('publicarPlantao->fetchCareUnits: ', error.response.data.message ?? 'Ocorreu um erro, tente novamente')
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
      console.error('publicarPlantao->handleSubmit: ', error.response.data.error)
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
      color: 'white',
      borderRadius: 10,
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
    setDate(currentDate)
    setShowDate(false)
  };

  const handleEntryTimeChange = (event: any, selectedTime: any) => {
    const currentTime = selectedTime || entryTime;
    setEntryTime(currentTime)
    setShowEntryTime(false)
  };

  const handleOutTimeChange = (event: any, selectedTime: any) => {
    const currentTime = selectedTime || outTime;
    setOutTime(currentTime)
    setShowOutTime(false)
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
      <KeyboardAwareScrollView className="w-screen pt-6 px-6 bg-background">
          <View className="w-full p-3 rounded-xl bg-primary">
            <Text className="font-900 text-white">Publique seu plantão.</Text>
          </View>
          <View className="w-full px-2">
          
          <SelectPicker name="Unidade *" items={careUnits} value={careUnit} setValue={setCareUnit} marginTop={-200} />
          
          <TextInput
            style={styles.input}
            placeholder='Cidade *'
            className='h-10 w-full rounded-xl text-sm font-400 my-3 px-4'
            placeholderTextColor={'white'}
            value={city}
            onChangeText={setCity}
          />

          <Text
            style={styles.input}
            className={`h-10 w-full rounded-xl text-sm font-400 mt-5 pt-2.5 px-4 ${showDate ? 'mb-40' : 'mb-3'} `}
            onPress={() => setShowDate(true)}
          >
            { date ? dateFormatted : 'Data do plantão *' }
          </Text>
          {showDate && (
            <DateTimePicker
              value={date ?? new Date()}
              mode="date"
              display="spinner"
              locale="pt-BR"
              onChange={handleDateChange}
              style={{ 
                borderRadius: 15, 
                borderWidth: 1,
                borderColor: "white", 
                backgroundColor: "#FFF",
                marginTop: -150
              }}
            />
          )}

          <Text
            style={styles.input}
            className={`h-10 w-full rounded-xl text-sm font-400 mt-5 pt-2.5 px-4 ${showEntryTime ? 'mb-40' : 'mb-3'} `}
            onPress={() => setShowEntryTime(true)}
          >
            { entryTime ? entryTimeFormatted : 'Hora de Entrada *' }
          </Text>
          {showEntryTime && (
            <DateTimePicker
              value={entryTime ?? new Date()}
              mode="time"
              display="spinner"
              is24Hour={true}
              locale="pt-BR"
              onChange={handleEntryTimeChange}
              style={{ 
                borderRadius: 15, 
                borderWidth: 1,
                borderColor: "white", 
                backgroundColor: "#FFF",
                marginTop: -150
              }}
            />
          )}

          <Text
            style={styles.input}
            className={`h-10 w-full rounded-xl text-sm font-400 mt-5 pt-2.5 px-4 ${showOutTime ? 'mb-40' : 'mb-3'} `}
            onPress={() => setShowOutTime(true)}
          >
            { outTime ? outTimeFormatted : 'Hora de Saída *' }
          </Text>
          {showOutTime && (
            <DateTimePicker
              value={outTime ?? new Date()}
              mode="time"
              display="spinner"
              is24Hour={true}
              locale="pt-BR"
              onChange={handleOutTimeChange}
              style={{ 
                borderRadius: 15, 
                borderWidth: 1,
                borderColor: "white", 
                backgroundColor: "#FFF",
                marginTop: -150
              }}
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
            className='h-32 w-full align-text-top rounded-xl text-sm font-400 my-3 py-2 px-4'
            placeholderTextColor={'white'}
            value={description}
            onChangeText={setDescription}
          />
          {/* <View className="flex-row items-center my-4">
            <Checkbox
              value={anonymousPublication}
              onValueChange={(newValue) => setAnonymousPublication(newValue)} />
            <Text className="font-400 ml-3 pt-1 text-sm text-white">Publicar de Forma Anônima</Text>
          </View> */}
          <TouchableOpacity 
            disabled={loading} 
            onPress={()=>handleSubmit()} 
            activeOpacity={0.8} 
            className="flex-row w-full bg-primary justify-center py-2 rounded-xl my-3 items-center"
          >
            <Text className="text-white font-700 text-sm ml-2">Publicar Plantão</Text>
          </TouchableOpacity>
          <View className="h-10"></View>
        </View>
      </KeyboardAwareScrollView>
    </>
  )
}