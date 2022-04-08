import React, { useState } from 'react'

// Icons
import { ChevronUpIcon } from '@heroicons/react/solid'

const links = [
    { name: 'Home', to: '/' },
    { name: 'Counts', to: '/c/0' },
]

function Header() {
    const [active, setActive] = useState<boolean>(false)

    const toggleActive = () => setActive(!active)

	return (<header 
    className='flex bg-black text-white p-3'>
        <div className='font-mono text-2xl'>
            Counter
        </div>

        <nav className={`fixed bg-black/90 transition-all duration-300
        ${active ? 'inset-0' : 'inset-x-0 top-[94vh] -bottom-full'}`}>
            <div onClick={toggleActive} 
            className={`${active && 'bg-slate-400/30'} flex justify-center items-center w-full cursor-pointer`}>
                <ChevronUpIcon  
                className={`m-auto h-[6vh] ${active && 'rotate-180'} transition-transform`} />
            </div>
            <ul className='flex flex-col justify-center h-full px-3'>
                {links.map((l, i) => <li 
                className='mb-3 last:mb-0' key={i}>
                    
                    <a 
                    className='inline-block w-full font-semibold hover:underline text-3xl
                    p-2 bg-slate-500/10 rounded-sm' href="">
                        {l.name}
                    </a>
                </li>)}
            </ul>
        </nav>
	</header>)
}

export { Header }