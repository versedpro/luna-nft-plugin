import React from 'react';
// import { LunaCheckoutWidget } from '@sportigos/nft-checkout';
import { LunaCheckoutWidget } from './lib';
import './App.css';

function App() {
    return (
        <div className="App">
            <LunaCheckoutWidget
                collectionId="27180e70-6030-4bda-936d-f1a2699040c3"
                username="lWUYhxDJMTuXhzgMUHIIH"
                password="1NIoTWBBD7sHKqwvTRR60hF8DNc3tF7U"
            />
        </div>
    );
}

export default App;
