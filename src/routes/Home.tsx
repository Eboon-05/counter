import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Dispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux'

import { CountAction, CountState } from '../redux/reducers/count'

// Icons
import { PlusIcon, MinusIcon, TrashIcon } from '@heroicons/react/solid'

// Components
import { Button } from '../components/Button'
import { Message } from '../components/Message'
import { Header } from '../components/Header'
import { Input } from '../components/Input'
import { CountName } from '../components/CountName'
import { CountValue } from '../components/CountValue'

function Home() {
        const count = useSelector<CountState, CountState['count']>(state => state.count)
        const counts = useSelector<CountState, CountState['counts']>(state => state.counts)
        const dispatch: Dispatch<CountAction> = useDispatch()

        const [searchParams, setSearchParams] = useSearchParams()

        const [error, setError] = useState<string|false>(false)

        const num = useRef<HTMLInputElement|null>(null)

        const handleSum = (n: number) => {
                if (count) {
                        dispatch({
                                type: 'UPDATE_COUNT',
                                payload: {
                                        ...count,
                                        value: count.value + n
                                }
                        })
                }
        }

        const handleSub = (n: number) => {
                if (count) {
                        dispatch({
                                type: 'UPDATE_COUNT',
                                payload: {
                                        ...count,
                                        value: count.value - n
                                }
                        })
                }
        }

        const handleCustom = (type: 'sub' | 'sum') => {
                if (num.current) {
                        const value = num.current.valueAsNumber

                        if (value) {
                                switch (type) {
                                case 'sum':
                                        return handleSum(value)
                                case 'sub':
                                        return handleSub(value)
                                }
                        } else {
                                setError('The value provided is not a number or is 0')		
                        }

                } else {
                        console.log('There is no num.current')			
                }
        }

        const deleteCount = () => {
                if (count) {
                        dispatch({
                                type: 'DELETE_COUNT',
                                payload: count
                        })
                }
        }

        useEffect(() => {
                if (counts.length > 0) {
                        const id = parseInt(searchParams.get('count') || '')

                        if (!Number.isNaN(id) && counts[id]) {
                                dispatch({
                                        type: 'SET_COUNT',
                                        payload: counts[id]
                                })
                        } else {
                                setSearchParams({ count: '0' })
                        }
                }
        }, [searchParams])

        return (<div>
                <Header />
                {count && <div className='bg-slate-200/40 m-2 p-2 rounded-lg text-white shadow-md
		grid grid-cols-1 gap-2
		min-h-[70vh] max-h-[90vh]'>
                        <CountName />

                        <CountValue />

                        <div className='grid gap-2 grid-rows-2 sm:grid-rows-1 sm:grid-cols-2'>
                                <Button className='sm:order-2 h-12' onClick={() => handleSum(1)} type='primary'>
                                        <PlusIcon className='h-5 mx-auto' />
                                </Button>
                                <Button className='h-12' onClick={() => handleSub(1)} type='primary'>
                                        <MinusIcon className='h-5 mx-auto' />
                                </Button>
                                {counts.length > 1 && <Button className='h-12' type='danger'
                                        onClick={deleteCount}>
                                        <TrashIcon className='h-5 mx-auto' />
                                </Button>
                                }
                        </div>

                        <div className='flex flex-col mt-2'>
                                <span className='font-mono'>Custom value</span>

                                <Input ref={num} className='mb-2' type="number" placeholder='Value' />

                                {error && <Message className='mb-2' onClose={setError} title='' description={error} type='error' />}

                                <div className='grid gap-2 grid-rows-2 sm:grid-rows-1 sm:grid-cols-2'>
                                        <Button className='sm:order-2 h-12' type='primary'
                                                onClick={() => handleCustom('sum')}>
                                                <PlusIcon className='h-5 mx-auto' />
                                        </Button>
                                        <Button className='h-12' type='primary'
                                                onClick={() => handleCustom('sub')}>
                                                <MinusIcon className='h-5 mx-auto' />
                                        </Button>
                                </div>
                        </div>
                </div>}
        </div>)
}

export { Home }