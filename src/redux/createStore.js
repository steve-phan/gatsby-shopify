import { createStore, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'
import rootReducer from './rootReducer'



const composeEnhancers = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middlewares = [logger]

export const  store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
)
