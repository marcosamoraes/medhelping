import { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { SidebarContext } from "../config/Provider";

export default function TouchableBlur(){
    const { isOpen, setIsOpen } = useContext(SidebarContext);
    return (<>
    <TouchableOpacity onPress={()=> setIsOpen(false)} activeOpacity={1} className={`w-full ${isOpen? 'absolute' : 'hidden'} none z-[40] h-full bg-[#0000007d]`}>
    </TouchableOpacity>
    
    </>)
}