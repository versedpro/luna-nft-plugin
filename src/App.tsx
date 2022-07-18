import React, { useState } from 'react';
// import { LunaCheckoutWidget } from '@sportigos/nft-checkout';
import { LunaCheckoutWidget } from './lib';
import './App.css';

function App() {
    const [collectionId, setCollectionId] = useState<string>('c2c439fd-ed51-456b-b110-a12c577454b2');
    const [apiKey, setApiKey] = useState<string>('x3QcM7Ic4u0TBbWS6no0h');
    const [secretKey, setSecretKey] = useState<string>('CXSCC0BIkvFOB2GdWj6a8bvWBF3HOFQu');

    const [params, setParams] = useState<{ collectionId: string; apiKey: string; secretKey: string }>({
        collectionId: 'c2c439fd-ed51-456b-b110-a12c577454b2',
        apiKey: 'x3QcM7Ic4u0TBbWS6no0h',
        secretKey: 'CXSCC0BIkvFOB2GdWj6a8bvWBF3HOFQu'
    });

    const onUpdate = () => {
        setParams({ collectionId, apiKey, secretKey });
    };

    return (
        <div className="App">
            <div style={{ display: 'flex', flexDirection: 'row', gap: 12, margin: '12px 0' }}>
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
            </div>
            <LunaCheckoutWidget
                collectionId={params.collectionId}
                username={params.apiKey}
                password={params.secretKey}
            />
        </div>
    );
}

export default App;
