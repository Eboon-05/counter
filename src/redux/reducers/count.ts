import { Reducer } from "redux"

export interface CountState {
    data: string[]
}

interface Action {
    type: 'ADD_COUNT',
    payload: string
}

const initialState = {
    data: []
}

export const countReducer: Reducer<CountState, Action> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case 'ADD_COUNT':
            return {
                ...state,
                data: [...state.data, action.payload]
            }
        default:
            return state
    }
}