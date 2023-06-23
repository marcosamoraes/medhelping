import { useContext } from "react";
import { LayoutAnimation, Platform, TouchableOpacity, UIManager } from "react-native";
import { SidebarContext } from "@contexts/Sidebar";

export default function TouchableBlur(){
    const { isOpen, setIsOpen } = useContext(SidebarContext);
    if (
        Platform.OS === 'android' &&
        UIManager.setLayoutAnimationEnabledExperimental
      ) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    return (<>
    <TouchableOpacity 
      onPress={()=> {LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);setIsOpen(false)}} 
      activeOpacity={1} 
      className={`w-full ${isOpen? 'absolute' : 'hidden'} none z-[40] h-full bg-[#0000007d]`}
    >
    </TouchableOpacity>
    
    </>)
}