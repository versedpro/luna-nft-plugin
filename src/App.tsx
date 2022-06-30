import React from 'react';
// import { Widget } from "@luna-market-deployer/nft-checkout";
import { Widget } from './lib';
import './App.css';

function App() {
    return (
        <div className="App">
            <Widget
                nftImgUrl="/assets/background.png"
                collectionImgUrl="/assets/cyberkongz.png"
                lunaLogo="/assets/luna-logo.svg"
                collectionTitle="Curry Brand - Into the Metaverse"
                nftTitle="Into The Metaverse"
                nftDescription="This is a short description of the “Into the Metaverse” NFT project. This is a short description of the “Into the Metaverse” NFT project. "
                price={0.08}
                mintsRemain={10000}
                mintBtnDisabled={true}
                questions={[
                    'question1question1question1question1question1question1question1question1question1question1',
                    'question2question2question2question2question2question2',
                    'question3question3question3question3question3question3question3question3question3question3',
                ]}
            />
        </div>
    );
}

export default App;
