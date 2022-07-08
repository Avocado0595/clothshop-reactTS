import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter ,HashRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import 'bootstrap/dist/css/bootstrap.css';
import LoadingPage from './pages/loading-page/LoadingPage';
const persistor = persistStore(store);
ReactDOM.render(
	
		<Provider store={store}>
			<PersistGate persistor={persistor} loading={<LoadingPage />}>
				<BrowserRouter basename='/'>
					<App />
				</BrowserRouter>
			</PersistGate>
		</Provider>
,
	document.getElementById('root')
);
