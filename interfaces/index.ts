import React from "react"

export interface IAppContext {
    isShowwcaseDataFetched: boolean
    setIsShowwcaseDataFetched: React.Dispatch<React.SetStateAction<boolean>>
    isTwitterDataFetched: boolean
    setIsTwitterDataFetched: React.Dispatch<React.SetStateAction<boolean>>
}

export interface IAppProvider {
    children: React.ReactNode
}