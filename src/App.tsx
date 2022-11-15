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
      <h1 className="flex justify-center my-5">Single NFT</h1>
      <div>
        <CheckoutWidget collectionId="c091b03f-b366-4729-ba99-359ae4a45366" libraryType="web3" view="normal" />
      </div>
      <div className="mt-10">
        <CheckoutWidget collectionId="c091b03f-b366-4729-ba99-359ae4a45366" libraryType="web3" view="mini" />
      </div>
      <h1 className="flex justify-center my-5">Multiple NFT</h1>
      <div>
        <CheckoutWidget collectionId="da3b4ebc-ceb9-4693-9418-98024056b666" libraryType="web3" view="normal" />
      </div>
      <div className="mt-10">
        <CheckoutWidget collectionId="da3b4ebc-ceb9-4693-9418-98024056b666" libraryType="web3" view="mini" />
      </div>
    </Web3ReactProvider>
  );
}

export default App;
