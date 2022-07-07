import React, { useState } from 'react';
// import { Widget } from "@luna-market-deployer/nft-checkout";
import { LunaCheckoutWidget } from './lib';
import './App.css';

function App() {
    return (
        <div className="App">
            <LunaCheckoutWidget />
        </div>
    );
}

export default App;
