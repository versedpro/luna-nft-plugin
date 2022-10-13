import React from 'react';
// import { CheckoutWidget } from '@sportigos/nft-checkout';
import { CheckoutWidget } from 'luna-nft-checkout';
import 'luna-nft-checkout/lib/esm/styles/style.css';
// import { CheckoutWidget } from './lib';
import Web3 from 'web3';
import './App.css';

import { Web3ReactProvider, useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';

// const getLibrary = (provider: any): ethers.providers.Web3Provider => {
//   const library = new ethers.providers.Web3Provider(provider);
//   library.pollingInterval = 8000;
//   return library;
// };

function getLibrary(provider: any) {
  return new Web3(provider);
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div className="App">
        <CheckoutWidget collectionId="ef7e2df4-3b2b-409e-8a78-35dd845fd8d4" libraryType="web3" />
      </div>
    </Web3ReactProvider>
  );
}

export default App;
