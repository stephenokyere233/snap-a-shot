import { TABS } from '@/constants/tabs';
import { AppContext } from '@/context';
import { IAppContext } from '@/interfaces';
import React from 'react'
import { FiSun } from 'react-icons/fi';
import { useContext } from 'react';

const Header = () => {
    const { platform, setPlatform } = useContext<IAppContext | null>(AppContext) as IAppContext
    return (
        <>
            <header className="flex items-center justify-between">
                <b>SNAP-A-SHOT</b>
                <ul className="bg-white hidden w-max lg:flex items-center border border-r-0">
                    {TABS.map((item, index: number) => <li onClick={() => setPlatform(item)} className={`border border-l-0 border-b-0 border-t-0 p-2 font-medium px-5 cursor-pointer transition-all ${platform === item ? 'bg-blue-400 text-white border-l-0' : 'text-blue-400'}`} key={index}>{item}</li>)}
                </ul>

                <FiSun />
            </header>
            <ul className="bg-white mt-2 w-full flex lg:hidden items-center border border-r-0">
                {TABS.map((item, index: number) => <li onClick={() => setPlatform(item)} className={`border w-[50%] text-center border-l-0 border-b-0 border-t-0 p-2 font-medium px-5 cursor-pointer transition-all ${platform === item ? 'bg-blue-400 text-white border-l-0' : 'text-blue-400'}`} key={index}>{item}</li>)}
            </ul>
        </>
    )
}

export default Header
