import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { CountAction, CountState } from '../redux/reducers/count'

function Home() {
	const count = useSelector<CountState, CountState['count']>(state => state.count)
	// const dispatch: Dispatch<CountAction> = useDispatch()

	return (<div>
		{count && <h1 className="text-3xl font-bold underline">
			{count.name}: {count.value}
		</h1>}
	</div>)
}

export { Home }