import React, { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { CountState } from '../redux/reducers/count'

// Icons
import { ChevronUpIcon, PlusIcon, CollectionIcon } from '@heroicons/react/solid'

function Header() {
    const [active, setActive] = useState<boolean>(false)
    const counts = useSelector<CountState, CountState['counts']>(state => state.counts)

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [__, setSearchParams] = useSearchParams()

    const toggleActive = () => setActive(!active)

    const textClasses = 'font-semibold text-2xl'
    const liClasses = `mb-3 last:mb-0 w-full flex justify-start items-center cursor-pointer hover:underline ${textClasses}`

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
                <li className={liClasses}>
                    <Link to='/new' className='flex items-center'>
                        <PlusIcon className='mr-2 h-5' />
                        Create a new count
                    </Link>
                </li>
                <li className='bg-slate-400/30 rounded-lg -mx-1 px-1'>
                    <div className='flex justify-start items-center mb-2'>
                        <CollectionIcon className='mr-2 h-5' />
                        <span className={`${textClasses}`}>Counts</span>
                    </div>
                    <ul className='list-disc'>
                        {counts.map((c, i) => <li key={i}
                        onClick={() => {
                            setSearchParams({ count: `${i}` })
                            setActive(false)
                        }}
                        className='cursor-pointer mb-2 -mx-1 p-1 flex justify-between
                        hover:bg-slate-200/50 transition-all duration-500'>

                            <span>{c.name}</span>
                            <span className='text-black bg-white rounded-md px-2 text-center'>
                                {c.value}
                            </span>

                        </li>)}
                    </ul>
                </li>
            </ul>
        </nav>
	</header>)
}

export { Header }