import { IAppContext, IAppProvider } from "@/interfaces"
import React, { useState } from "react"

export const AppContext = React.createContext<IAppContext | null>(null)


const AppProvider: React.FC<IAppProvider> = ({ children }) => {
    const [isShowwcaseDataFetched, setIsShowwcaseDataFetched] = useState<boolean>(false)
    const [isTwitterDataFetched, setIsTwitterDataFetched] = useState<boolean>(false)
    return (
        <AppContext.Provider value={{ isShowwcaseDataFetched, setIsShowwcaseDataFetched, isTwitterDataFetched, setIsTwitterDataFetched }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider 