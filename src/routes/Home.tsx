import React from 'react'
import { useSelector } from 'react-redux'
import { CountState } from '../redux/reducers/count'

function Home() {
    const data = useSelector<CountState, CountState['data']>(state => state.data)

    console.log(data)    

    return (
        <div>Home</div>
    )
}

export { Home }