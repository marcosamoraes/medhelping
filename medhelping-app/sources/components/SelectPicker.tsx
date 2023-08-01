import { Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native"
import { Picker } from '@react-native-picker/picker';
import { useState } from "react";

type Item = {
  id: number;
  name: string;
}

type SelectPickerProps = {
  name: string;
  items: Item[];
  value: string|null;
  setValue: (value: any) => void;
  marginTop?: number;
}

export default function SelectPicker({ name, value, setValue, items, marginTop = -150 } : SelectPickerProps) {
  const [ isOpen, setIsOpen ] = useState<boolean>(false)
  const [ inputValue, setInputValue ] = useState<string>('')

  const styles = StyleSheet.create({
    input: {
        borderColor: 'white',
        borderWidth: 1,
        color: 'white',
        borderRadius: 10,
    },
  });

  const handleValueChange = (value: any) => {
    setValue(value)
    setInputValue(items.find(item => item.id === value)?.name ?? '')
    setIsOpen(false)
  }

  return (
    <>
      <Text className="pt-3 text-white">{ name }</Text>
      {Platform.OS === 'ios' ? (
        <>
          <Text
            style={styles.input}
            className={`h-10 w-full rounded-xl text-sm font-400 mt-5 pt-2.5 px-4 ${isOpen ? 'mb-40' : 'mb-3'} `}
            onPress={() => setIsOpen(true)}
          >
            { inputValue !== '' ? inputValue : 'Selecione...' }
          </Text>

          {isOpen && (
            <View style={{ 
              borderRadius: 15, 
              borderWidth: 1,
              borderColor: "white", 
              backgroundColor: "#FFF",
              marginTop: marginTop
            }} >
              <Picker
                selectedValue={value}
                onValueChange={(itemValue, itemIndex) => handleValueChange(itemValue)}
              >
                <Picker.Item label="Selecione..." value={null} />
                {items.length > 0 && items.map((item, index) => (
                  <Picker.Item key={index} label={item.name} value={item.id} />
                ))}
              </Picker>
            </View>
          )}
        </>
      ) : (
        <View style={{ 
          borderRadius: 15, 
          borderWidth: 1,
          borderColor: "white", 
          marginTop: 10,
          marginBottom: 10,
          display: 'flex',
          justifyContent: 'center',
        }} >
          <Picker
            style={{
              width: '100%',
              color: 'white',
              height: 40,
            }}
            selectedValue={value}
            onValueChange={(itemValue, itemIndex) => handleValueChange(itemValue)}
          >
            <Picker.Item label="Selecione..." value={null} />
            {items.length > 0 && items.map((item, index) => (
              <Picker.Item key={index} label={item.name} value={item.id} />
            ))}
          </Picker>
        </View>
      )}
    </>
  )
}