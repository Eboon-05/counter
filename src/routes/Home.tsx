import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { CountAction, CountState } from '../redux/reducers/count'

// Icons
import { PlusIcon, MinusIcon } from '@heroicons/react/solid'

// Components
import { Button } from '../components/Button'
import { Message } from '../components/Message'

function Home() {
	const count = useSelector<CountState, CountState['count']>(state => state.count)
	const dispatch: Dispatch<CountAction> = useDispatch()

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

	return (<div>
		{count && <div className='bg-slate-200/40 m-2 p-2 rounded-lg text-white shadow-md
		grid grid-cols-1 gap-2
		min-h-[70vh] max-h-[90vh]'>
			<h1 className="text-3xl font-semibold">
				{count.name}
			</h1>
			<h1 className='text-5xl text-center font-black'>
				{count.value}
			</h1>
			<div className='grid gap-2 grid-rows-2 sm:grid-rows-1 sm:grid-cols-2'>
				<Button className='sm:order-2 h-12' onClick={() => handleSum(1)} type='primary'>
					<PlusIcon className='h-5 mx-auto' />
				</Button>
				<Button className='h-12' onClick={() => handleSub(1)} type='primary'>
					<MinusIcon className='h-5 mx-auto' />
				</Button>
			</div>

			<div className='flex flex-col mt-2'>
				<span className='font-mono'>Custom value</span>

				<input ref={num} type="number" id="custom" placeholder='Value'
				className='outline-none p-3 pb-1 mb-2 border-solid border-white/30 border-b-2 
				transition duration-500 placeholder:text-slate-100/90 placeholder:font-mono
				bg-transparent text-white
				focus:border-white'/>

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