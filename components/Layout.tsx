"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MenuData } from '@/lib/MenuData';


interface IMenuWraper {
    Title: string;
    children: React.ReactNode;
}

const MenuWraper = ({ Title, children }: IMenuWraper) => {
    return <div className="flex flex-col p-2 md:p-4 items-center bg-gradient-to-t from-white to-pink-100 rounded-lg">
        <h1 className='w-full text-start text-xs font-bold text-gray-500 italic'>{Title}</h1>
        <div className="flex flex-col items-start">
            {children}
        </div>
    </div>
}


interface IMenuItem {
    Href: string;
    Title: string;
    Menu: (data: boolean) => void;
}
const MenuItem = ({ Href, Title, Menu }: IMenuItem) => {
    const router = useRouter();
    const cmdClick = () => {
        router.push(Href);
        Menu(false);
    }
    return (
        <button onClick={cmdClick} className="px-1 mb-2 hover:border-l-2 border-indigo-400 underline-offset-4 decoration-4 decoration-indigo-300 hover:text-indigo-400">{Title}</button>
    )
}



interface ILayout {
    children: React.ReactNode;
}
const Layout = ({ children }: ILayout) => {
    const [dataExists, setDataExists] = useState<boolean>(false);
    const [menu, setMenu] = useState<boolean>(false);


    return (
        <>
            <header id="top" className="fixed h-[60px] top-0 left-0 right-0 px-4 lg:px-6 bg-gray-100 border-b-2 border-white flex justify-between items-center shadow-lg z-10">
                <div className="text-lg font-bold">
                    {menu ? (<h1>Menu</h1>) : (<Link href="/">Aslam</Link>)}
                </div>
                <button onClick={() => menu ? setMenu(false) : setMenu(true)}>
                    {menu ? (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    )}
                </button>
            </header>

            {menu && (
                <nav className="fixed w-full top-[60px] overflow-auto z-10">
                    <div className='w-full p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 bg-gray-400 shadow-lg transition duration-500'>
                        {
                            MenuData.map((m, i) => {
                                const btn = m.group;
                                return (
                                    <MenuWraper Title={m.title} key={i}>
                                        {btn.map((b, j) => <MenuItem Href={b.url} Title={b.label} Menu={(data) => setMenu(data)} key={j} />)}
                                    </MenuWraper>
                                )
                            })
                        }
                    </div>
                </nav>)}


            <main className="w-full mt-[60px] bg-white overflow-auto">
                {children}
                <div className='my-40'></div>
            </main>


            <footer className="w-full py-10 text-center text-sm bg-gray-100 border-t-2 border-white">
                <p className='text-center'>Copyright @ 2024 Aslam Zaman. Email: aslamcmes@gmail.com</p>
            </footer>
        </>
    )
}

export default Layout



