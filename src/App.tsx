import React, { useState } from 'react';
// import { Widget } from "@luna-market-deployer/nft-checkout";
import { Widget } from './lib';
import './App.css';

function App() {
    const [nftCount, setNftCount] = useState<string>('');
    const [answers, setAnswers] = useState<string[]>(['', '', '']);

    const onNftCountChange = (value: string) => {
        if (!isNaN(Number(value))) {
            setNftCount(value);
        }
    };

    const onAnswersChange = (index: number, value: string) => {
        let updatedAnswers = [...answers];
        updatedAnswers[index] = value;
        setAnswers(updatedAnswers);
    };

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
                questions={['Question 1', 'Question 2', 'Question 3']}
                socialLinks={{ twitter: true, discord: true, facebook: true, instagram: true }}
                nftCount={nftCount}
                // onNftCountChange={setNftCount}
                onNftCountChange={onNftCountChange}
                answers={answers}
                onAnswersChange={onAnswersChange}
            />
        </div>
    );
}

export default App;
