import { TABS } from '@/constants/tabs';
import { AppContext } from '@/context';
import { IAppContext } from '@/interfaces';
import React from 'react'
import { FiMoon, FiSun } from 'react-icons/fi';
import { useContext } from 'react';
import { useTheme } from 'next-themes';

const Header = () => {
    const { platform, setPlatform } = useContext<IAppContext | null>(AppContext) as IAppContext

    const { theme, setTheme } = useTheme()
    const toggleTheme = () => {
        if (theme === 'dark') {
            setTheme('light')
        }
        else {
            setTheme("dark")
        }
    }
    return (
        <>
            <header className="flex items-center justify-between ">
                <b className='text-xl'>SNAP-A-SHOT</b>
                <ul className="bg-white dark:bg-dim dark:border-dimmer hidden w-max lg:flex items-center border border-r-0">
                    {TABS.map((item, index: number) => <li onClick={() => setPlatform(item)} className={`border border-l-0 dark:border-dimmer border-b-0 border-t-0 p-2 font-medium px-5 cursor-pointer transition-all ${platform === item ? 'bg-blue-400 text-white border-l-0' : 'text-blue-400'}`} key={index}>{item}</li>)}
                </ul>

                <div className='cursor-pointer'>
                    {
                        theme === "dark" ?
                            <FiSun onClick={toggleTheme} size={28} /> : <FiMoon onClick={toggleTheme} size={28} />
                    }
                </div>

            </header>
            <ul className="bg-white  dark:bg-dim dark:border-dimmer mt-2 w-max mx-auto flex lg:hidden items-center border border-r-0">
                {TABS.map((item, index: number) => <li onClick={() => setPlatform(item)} className={`border w-[150px] text-center  border-l-0 border-b-0 border-t-0 p-2 font-medium px-5 dark:border-dimmer cursor-pointer transition-all ${platform === item ? 'bg-blue-400 text-white border-l-0' : 'text-blue-400'}`} key={index}>{item}</li>)}
            </ul>
        </>
    )
}

export default Header
