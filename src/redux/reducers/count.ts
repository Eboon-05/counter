import { Reducer } from "redux"

export interface Count {
    name: string,
    value: number
}

export interface CountState {
    readonly data: Count[],
    readonly count?: Count
}

export interface CountAction {
    type: 'ADD_COUNT' | 'SET_COUNTS',
    payload: Count | Count[] | string,
}

const initialState = {
    data: []
}

function isCount (data: any): data is Count {
    return ('name' in data && 'value' in data)
}

export const countReducer: Reducer<CountState, CountAction> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case 'ADD_COUNT':
            if (isCount(action.payload)) {
                return {
                    ...state,
                    data: [...state.data, action.payload]
                }
            } else {
                console.error(`action.payload is not a Count`)
                return state
            }
        default:
            return state
    }
}