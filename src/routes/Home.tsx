import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { CountAction, CountState } from '../redux/reducers/count'

function Home() {
    const data = useSelector<CountState, CountState['data']>(state => state.data)
    const dispatch: Dispatch<CountAction> = useDispatch()

    // This should log an error
    // dispatch({
    //     type: 'ADD_COUNT',
    //     payload: []
    // })

    return (
        <div>Home</div>
    )
}

export { Home }