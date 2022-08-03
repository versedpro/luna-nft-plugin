import React from 'react';
// import { LunaCheckoutWidget } from '@sportigos/nft-checkout';
// import { LunaCheckoutWidget } from 'luna-nft-checkout';
import 'luna-nft-checkout/lib/esm/styles/IFrameBox.css';
import { LunaCheckoutWidget } from './lib';
import Web3 from 'web3';
import './App.css';

import { Web3ReactProvider, useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';

// const getLibrary = (provider: any): ethers.providers.Web3Provider => {
//     const library = new ethers.providers.Web3Provider(provider);
//     library.pollingInterval = 8000;
//     return library;
// };

function getLibrary(provider: any) {
    return new Web3(provider);
}

function App() {
    // const [collectionId, setCollectionId] = useState<string>('c2c439fd-ed51-456b-b110-a12c577454b2');
    // const [apiKey, setApiKey] = useState<string>('x3QcM7Ic4u0TBbWS6no0h');
    // const [secretKey, setSecretKey] = useState<string>('CXSCC0BIkvFOB2GdWj6a8bvWBF3HOFQu');

    // const [params, setParams] = useState<{ collectionId: string; apiKey: string; secretKey: string }>({
    //     collectionId: 'e6f3c13f-b632-43e9-8351-6663b0dd555e',
    //     apiKey: 'NO6GCvlc892yL0sQlHqmA',
    //     secretKey: '3kWcTwf8Q6J4kSCE9BCAk3pFlOTsQrxM'
    // });

    // const onUpdate = () => {
    //     setParams({ collectionId, apiKey, secretKey });
    // };

    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <div className="App">
                {/* <div style={{ display: 'flex', flexDirection: 'row', gap: 12, margin: '12px 0' }}>
                <div>
                    <span>CollectionID: </span>
                    <input
                        value={collectionId}
                        style={{ width: 280, height: 24 }}
                        onChange={(event) => setCollectionId(event.target.value)}
                    />
                </div>
                <div>
                    <span>API Key: </span>
                    <input
                        value={apiKey}
                        style={{ width: 200, height: 24 }}
                        onChange={(event) => setApiKey(event.target.value)}
                    />
                </div>
                <div>
                    <span>Secret Key: </span>
                    <input
                        value={secretKey}
                        style={{ width: 280, height: 24 }}
                        onChange={(event) => setSecretKey(event.target.value)}
                    />
                </div>
                <button onClick={onUpdate}>Update</button>
            </div> */}
                <LunaCheckoutWidget
                    collectionId="de65ccdd-e38a-4eb0-b619-08308659c960"
                    username="kuLCE6tVLjVY4o0vkN4Pt"
                    password="ukwIQKWQheFhFk9eeI8RIr8cUfjlamWT"
                    libraryType="web3"
                />
            </div>
        </Web3ReactProvider>
    );
}

export default App;
