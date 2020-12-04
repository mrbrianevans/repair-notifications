import * as React from 'react'
import ReactDOM from 'react-dom'
import './style.scss'
import './generic.css'

const rootElement = document.createElement('div')
document.querySelector('body').appendChild(rootElement)

ReactDOM.render(<p>I am repair notification</p>, rootElement)
