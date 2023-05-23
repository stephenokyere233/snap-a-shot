import { TABS } from "@/constants/tabs"
import { IAppContext, IAppProvider } from "@/interfaces"
import React, { useState } from "react"

export const AppContext = React.createContext<IAppContext | null>(null)


const AppProvider: React.FC<IAppProvider> = ({ children }) => {
    const [isShowwcaseDataFetched, setIsShowwcaseDataFetched] = useState<boolean>(false)
    const [isTwitterDataFetched, setIsTwitterDataFetched] = useState<boolean>(false)
    const [selectedBGColor, setSelectedBGColor] = useState<string>("linear-gradient(to right, #4776e6, #8e54e9)")
    const [showStats, setShowStats] = useState<boolean>(true)
    const [platform, setPlatform] = useState<string>(TABS[0])
    return (
        <AppContext.Provider value={{ isShowwcaseDataFetched, setIsShowwcaseDataFetched, isTwitterDataFetched, setIsTwitterDataFetched, selectedBGColor, setSelectedBGColor, showStats, setShowStats, platform, setPlatform }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider 