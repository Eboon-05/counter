import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from './redux/store'

// Styles
import './styles/main.css'

// Routes
import { Home } from './routes/Home'

// Components
import { Header } from './components/Header'

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<Header />
			<Router>
				<Routes>
					<Route path='/' element={<Home />} />
				</Routes>
			</Router>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
)
