import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { AliveScope } from 'react-activation'
import AV from 'leancloud-storage'
import 'aos/dist/aos.css'
import './index.css'
import App from './App'
import config from './config'
import { Nya } from '@/utils'
import reportWebVitals from './reportWebVitals'

AV.init(config.leancloud)

Nya()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <AliveScope>
    <HashRouter>
      <App />
    </HashRouter>
  </AliveScope>,
)

reportWebVitals()
