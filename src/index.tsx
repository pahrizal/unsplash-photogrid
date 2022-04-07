import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import PageNotFound from './components/page-not-found'
import './index.css'
import 'animate.css'

// get the root element
const container = document.getElementById('root') as Element

// Create a root.
const root = ReactDOMClient.createRoot(container)

const Root = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

// Render the root.
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)
