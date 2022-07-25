import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from './redux/store'

// Styles & assets
import './styles/main.css'
import gradient from './assets/gradient-bg-1.svg'

// Routes
import { Home } from './routes/Home'
import { CreateNewCount } from './routes/CreateNewCount'

ReactDOM.render(
        <React.StrictMode>
                <Provider store={store}>
                        <img className='fixed min-w-[1000px] min-h-[110vh] md:min-w-[180vw] -left-5 -inset-y-5 -z-10 blur-lg' src={gradient} />
                        <Router>
                                <Routes>
                                        <Route path='/' element={<Home />} />
                                        <Route path='/new' element={<CreateNewCount />} />
                                </Routes>
                        </Router>
                </Provider>
        </React.StrictMode>,
        document.getElementById('root')
)
