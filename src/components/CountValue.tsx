import { useRef, useState } from 'react'
import { Dispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { CountAction, CountState } from '../redux/reducers/count'
import { Button } from './Button'

import { PencilAltIcon, SaveIcon, XIcon } from '@heroicons/react/solid'
import { Input } from './Input'

function CountValue() {
        const count = useSelector<CountState, CountState['count']>(state => state.count)
        const counts = useSelector<CountState, CountState['counts']>(state => state.counts)
        const dispatch: Dispatch<CountAction> = useDispatch()

        const name = useRef<HTMLInputElement|null>(null)

        const [editing, setEditing] = useState(false)

        const save = () => {
                if (name.current && count) {            
                        const { valueAsNumber } = name.current

                        dispatch({
                                type: 'UPDATE_COUNT',
                                payload: {
                                        data: {
                                                ...count,
                                                value: valueAsNumber || count.value
                                        },
                                        i: counts.indexOf(count)
                                }
                        })

                        setEditing(false)
                }
        }
    
        return (<div className={`flex items-center ${editing && 'justify-center flex-col'}`}>
                {count && <>
                        {!editing && <div className='flex flex-col justify-center items-center w-full'>
                                <h1 className='text-5xl text-center font-black mb-2'>
                                        {count.value}
                                </h1>

                                <Button onClick={() => setEditing(true)} type='primary'>
                                        <PencilAltIcon className='h-5' />
                                </Button>
                        </div>}
                        {editing && <>
                                <Input ref={name} defaultValue={count.value} autoFocus placeholder='Value'
                                        className='mb-2' type='number' />

                                <div className='flex justify-center'>
                                        <Button onClick={save} className='mr-2' type='primary'>
                                                <SaveIcon className='h-5' />
                                        </Button>
                                        <Button onClick={() => setEditing(false)} type='danger'>
                                                <XIcon className='h-5' />
                                        </Button>
                                </div>
                        </>}
                </>}
        </div>)
}

export { CountValue }