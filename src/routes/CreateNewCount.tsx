import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Dispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { CountAction, CountState } from '../redux/reducers/count'

import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { Message } from '../components/Message'

import { XIcon, CheckIcon } from '@heroicons/react/solid'

function CreateNewCount() {
    const name = useRef<HTMLInputElement|null>(null)
    const value = useRef<HTMLInputElement|null>(null)

    const navigate = useNavigate()

	const counts = useSelector<CountState, CountState['counts']>(state => state.counts)
    const dispatch: Dispatch<CountAction> = useDispatch()

    const [error, setError] = useState<string|false>(false)

    const onSubmit = () => {
        if (name.current && value.current) {
            // If name and value fields aren't empty
            if (name.current.value && !Number.isNaN(value.current.valueAsNumber)) {
                // Filtered array with the counts that have the same name
                // No matter lower or upper case
                const filtered = counts.filter(c => c.name.toLowerCase() === name.current?.value.toLowerCase())

                // If the count doesn't exist
                if (filtered.length === 0) {
                    dispatch({
                        type: 'ADD_COUNT',
                        payload: {
                            name: name.current.value,
                            value: value.current.valueAsNumber
                        }
                    })

                    // Go to Home, with index of the count sent as argument
                    navigate(`/?count=${counts.length}`)
                } else {
                    setError(`"${name.current.value}" already exists`)
                }
            } else {
                setError('Fields can\'t be empty')
            }
        }
    }

    useEffect(() => {
        const el = document.getElementById('name')
        
        const handler = (ev: KeyboardEvent) => {
            if (ev.code === 'Enter') onSubmit()
        }

        if (el) {   
            el.onkeyup = handler
        }


        return () => {
            if (el) {
                el.onkeyup = null
            }
        }
    }, [])

    return (<div className='min-h-screen flex flex-col justify-center items-stretch'>
        <div className='bg-slate-200/40 m-2 p-2 rounded-lg text-white shadow-md
        flex flex-col justify-between min-h-[50vh]'>
            <h1 className='text-2xl font-bold'>
                Create a new count
            </h1>

            <div className='flex flex-col'>
                <Input ref={name} className='my-2' placeholder='Name' autoFocus id='name'/>
                <Input ref={value} className='mb-2' placeholder='Initial Value' type='number' defaultValue={0} />
                {error && <Message onClose={setError} description={error} title='' type='error' />}
            </div>

            <div className='flex flex-col'>
                <Button onClick={onSubmit} className='mb-2' type='primary'>
                    <CheckIcon className='h-5 mr-2' />
                    Create
                </Button>
                <Button type='danger' className='p-0'>
                    <Link className='flex items-center justify-center w-full py-2' to='/'>
                        <XIcon className='h-5 mr-2' />
                        Cancel
                    </Link>
                </Button>
            </div>
        </div>
    </div>)
}

export { CreateNewCount }