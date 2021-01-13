import React from 'react'
import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faPlus, faChevronLeft, faTrashAlt, faCheckDouble
} from '@fortawesome/free-solid-svg-icons'
import { BrowserRouter } from 'react-router-dom'
// import 'typeface-roboto'
import './index.css'
import App from './App/App'
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

library.add(faPlus, faChevronLeft, faTrashAlt, faCheckDouble)

ReactDOM.render(
  <ErrorBoundary><BrowserRouter>
    <App />
  </BrowserRouter></ErrorBoundary>,
  document.getElementById('root')
)