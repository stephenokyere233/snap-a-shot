import { IAppContext, IAppProvider } from "@/interfaces"
import React, { useState } from "react"

export const AppContext = React.createContext<IAppContext | null>(null)


const AppProvider: React.FC<IAppProvider> = ({ children }) => {
    const [isShowwcaseDataFetched, setIsShowwcaseDataFetched] = useState<boolean>(false)
    const [isTwitterDataFetched, setIsTwitterDataFetched] = useState<boolean>(false)
    const [selectedBGColor, setSelectedBGColor] = useState<string>("linear-gradient(to right, #4776e6, #8e54e9)")
    return (
        <AppContext.Provider value={{ isShowwcaseDataFetched, setIsShowwcaseDataFetched, isTwitterDataFetched, setIsTwitterDataFetched, selectedBGColor, setSelectedBGColor }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider 