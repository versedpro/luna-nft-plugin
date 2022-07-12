import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from 'ethers';

const getLibrary = (provider: any): ethers.providers.Web3Provider => {
    const library = new ethers.providers.Web3Provider(provider);
    library.pollingInterval = 8000;
    return library;
};

ReactDOM.render(
    <React.StrictMode>
        <Web3ReactProvider getLibrary={getLibrary}>
            <App />
        </Web3ReactProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
