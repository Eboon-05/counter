import { Reducer } from 'redux'

// INTERFACES

export interface Count {
    name: string,
    value: number
}

export interface CountState {
    readonly counts: Count[],
    readonly count?: Count
}

export interface CountAction {
    type: 'ADD_COUNT' | 'SET_COUNTS' | 'SET_COUNT' | 'UPDATE_COUNT' | 'DELETE_COUNT',
    payload: Count | Count[],
}

// INITIAL STATE

if (!localStorage.counts) {
	updateCounts([
		{
			name: 'Initial',
			value: 0
		}
	])
}

const initialState = {
	counts: JSON.parse(localStorage.counts) || [],
	// count: JSON.parse(localStorage.counts)[0] || undefined
}

// FUNCTIONS

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isCount (data: any): data is Count {
	return ('name' in data && 'value' in data)
}

function updateCounts (newCounts: Count[]) {
	console.log('Updating counts...')    
	localStorage.setItem('counts', JSON.stringify(newCounts))
}

export const countReducer: Reducer<CountState, CountAction> = (
	state = initialState,
	action
) => {
	switch (action.type) {
	case 'ADD_COUNT':
		if (isCount(action.payload)) {
			const payload = action.payload as Count

			if (state.counts.filter(c => c.name === payload.name).length) {
				console.error('That count already exists!')
				return state
			}

			const newState = {
				...state,
				counts: [
					...state.counts,
					action.payload
				],
				count: action.payload
			}

			updateCounts(newState.counts)
                
			return newState
		}

		console.error('action.payload is not a Count')
		return state
	case 'SET_COUNTS':
		if (Array.isArray(action.payload)) {

			updateCounts(action.payload)

			return {
				...state,
				counts: action.payload
			}
		}

		console.error('action.payload is not a Count array')
		return state
	case 'SET_COUNT':
		if (isCount(action.payload)) {
			return {
				...state,
				count: action.payload
			}
		}

		console.error('action.payload is not a Count')
		return state
	case 'UPDATE_COUNT':
		if (isCount(action.payload)) {
			const payload = action.payload as Count

			const filtered = state.counts.filter(c => c.name === payload.name)

			if (!filtered.length) {
				console.error('That count does not exist!')
				return state
			}

			const newCounts = [ ...state.counts ]
			const i = newCounts.indexOf(filtered[0])

			if (i === -1) {
				console.error('For some reason, the filtered element is not in newCounts')				
				return state
			}

			newCounts[i] = action.payload

			updateCounts(newCounts)
			
			return {
				...state,
				counts: newCounts,
				count: action.payload
			}
		}

		return state
	case 'DELETE_COUNT':
		if (isCount(action.payload)) {
			let i: number = state.counts.indexOf(action.payload)

			if (i > 0) {
				i--
			} else {
				i = 0
			}

			const filtered = state.counts.filter(c => c !== action.payload)

			updateCounts(filtered)

			return {
				...state,
				counts: filtered,
				count: filtered[i]
			}
		}
	
		return state
	default:
		return state
	}
}