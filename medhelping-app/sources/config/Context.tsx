import { createContext } from "react";

const AppContext = createContext({
    isOpen: false,
    setIsOpen: () => {}
})

export default AppContext;