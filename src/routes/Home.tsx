import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { CountAction, CountState } from '../redux/reducers/count'

function Home() {
	const count = useSelector<CountState, CountState['count']>(state => state.count)
	const dispatch: Dispatch<CountAction> = useDispatch()

	const handleSum = () => {
		if (count) {
			dispatch({
				type: 'UPDATE_COUNT',
				payload: {
					...count,
					value: count.value + 1
				}
			})
		}
	}

	return (<div>
		{count && <>
			<h1 className="text-3xl font-bold underline">
				{count.name}: {count.value}
			</h1>
			<button onClick={handleSum}>+1</button>
		</>}
	</div>)
}

export { Home }