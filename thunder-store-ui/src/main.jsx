import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyle from './Component/GlobalStyle';

import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <GlobalStyle>
            <PersistGate persistor={persistor}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </PersistGate>
        </GlobalStyle>
    </Provider>,
);
