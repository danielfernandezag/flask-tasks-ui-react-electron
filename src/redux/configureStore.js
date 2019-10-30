import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // esta es para desarrollo activa el redux extension

const configureStore = () => {
	// return createStore(reducer);
	return createStore(reducer, {}, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;
