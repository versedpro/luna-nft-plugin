import React, { useState, useEffect } from 'react';
import IFrameBox from '../IFrameBox';
import { getMintInfo, answerMintQuestions } from '../../api/mint';
import { Web3ReactProvider, useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { testConnectors } from '../../utils/connector';
// import { useContract } from '../../utils/useContract';
import NFT_ABI from '../../assets/abi/erc1155.json';
import { FirstPartyAnswers } from '../../type';
import { getContract } from '../../utils';
import { Contract } from '@ethersproject/contracts';

const getLibrary = (provider: any): ethers.providers.Web3Provider => {
    const library = new ethers.providers.Web3Provider(provider);
    library.pollingInterval = 8000;
    return library;
};

type ComponentProps = {
    collectionId: string;
    username: string;
    password: string;
};

const LunaCheckoutWidget: React.FC<ComponentProps> = ({ collectionId, username, password }): JSX.Element => {
    const { account, activate, deactivate, active, library, chainId } = useWeb3React();
    const [mintInfo, setMintInfo] = useState<any>();

    const [twitterEnabled, setTwitterEnabled] = useState<boolean>(false);
    const [discordEnabled, setDiscordEnabled] = useState<boolean>(false);
    const [facebookEnabled, setFacebookEnabled] = useState<boolean>(false);
    const [instagramEnabled, setInstagramEnabled] = useState<boolean>(false);

    const [contract, setContract] = useState<Contract>();

    const [mintPrice, setMintPrice] = useState<number>(0);
    const [mintRemain, setMintRemain] = useState<number | undefined>();

    const [nftCount, setNftCount] = useState<string>('');
    const [nftCountError, setNftCountError] = useState<boolean>(false);
    const [answers, setAnswers] = useState<string[]>([]);
    const [answersError, setAnswersError] = useState<boolean[]>([false, false, false]);

    useEffect(() => {
        getMintInfo(collectionId, username, password)
            .then(async (response: any) => {
                console.log('getMintInfo response:', response);
                setMintInfo(response);

                let twitterObj = response.social_links.find((item: any) => item.name === 'twitter');
                setTwitterEnabled(twitterObj ? twitterObj.enabled : false);

                let discordObj = response.social_links.find((item: any) => item.name === 'discord');
                setDiscordEnabled(discordObj ? discordObj.enabled : false);

                let facebookObj = response.social_links.find((item: any) => item.name === 'facebook');
                setFacebookEnabled(facebookObj ? facebookObj.enabled : false);

                let instagramObj = response.social_links.find((item: any) => item.name === 'instagram');
                setInstagramEnabled(instagramObj ? instagramObj.enabled : false);
            })
            .catch((error) => {
                console.log('getMintInfo error:', error);
                setMintInfo(null);

                setTwitterEnabled(false);
                setDiscordEnabled(false);
                setFacebookEnabled(false);
                setInstagramEnabled(false);
            });
    }, [collectionId, username, password]);

    useEffect(() => {
        const get = () => {
            if (!mintInfo?.contract_address || !NFT_ABI || !library || !chainId) return undefined;
            let address: string | undefined;
            if (typeof mintInfo?.contract_address === 'string') address = mintInfo?.contract_address;
            else address = mintInfo?.contract_address[chainId];
            if (!address) return undefined;
            try {
                return getContract(address, NFT_ABI, library, account ? account : undefined);
            } catch (error) {
                console.error('Failed to get contract', error);
                return undefined;
            }
        };
        const contract = get();
        setContract(contract);
    }, [mintInfo, library, chainId, account]);

    // const contract = useContract(mintInfo?.contract_address, NFT_ABI);
    // const contract = useContract('0xf7485edf11bfc4cb0a15a63302cc3a8cf6f98920', NFT_ABI);
    // getTokenInfo();

    useEffect(() => {
        async function getTokenInfo() {
            if (contract) {
                const resMintPrice = await contract.mintPrice(1);
                const mintPrice = parseFloat(ethers.utils.formatEther(resMintPrice.toString()));

                const tokenBalance = await contract.balanceForTokenId(1);
                const tokenBalanceReadable = parseInt(tokenBalance.toString());

                const maxSupply = await contract.maxSupply(1);
                const maxSupplyReadable = parseInt(maxSupply.toString());

                const mintRemaining = maxSupplyReadable ? maxSupplyReadable - tokenBalanceReadable : undefined;

                setMintPrice(mintPrice);
                setMintRemain(mintRemaining);
                console.log('mintPrice:', mintPrice);
            }
        }
        getTokenInfo();
    }, [contract]);

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

    const handleConnectMetamask = () => {
        activate(testConnectors.injected);
    };

    const handleDisconnectMetamask = () => {
        deactivate();
    };

    const handleMint = async () => {
        console.log(contract);
        if (contract) {
            console.log('mintPrice, nftCount:', mintPrice, nftCount);

            setNftCountError(!nftCount);

            let errors = [...answersError];
            for (let i = 0; i < mintInfo.first_party_data.length; i++) {
                errors[i] = !answers[i];
            }
            setAnswersError(errors);

            if (!!nftCount && errors[0] === false && errors[1] === false && errors[2] === false) {
                try {
                    await contract.mint(account, 1, parseInt(nftCount), {
                        value: ethers.utils.parseEther((mintPrice * parseInt(nftCount)).toString())
                    });
                    console.log('mint success!');

                    setMintRemain(mintRemain ? mintRemain - parseInt(nftCount) : undefined);

                    if (mintInfo.first_party_data.length > 0) {
                        postAnswers();
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
    };

    const postAnswers = () => {
        if (account) {
            let firstPartyAnswers: FirstPartyAnswers[] = mintInfo.first_party_data.map((item: any, index: number) => ({
                question_type: item.type,
                question: item.question,
                answer: answers[index]
            }));

            console.log('account:', account);
            console.log('firstPartyAnswers:', firstPartyAnswers);

            answerMintQuestions(collectionId, account, firstPartyAnswers, username, password)
                .then(async (response: any) => {
                    console.log('answerMintQuestions response:', response);
                })
                .catch((error) => {
                    console.log('answerMintQuestions error:', error);
                });
        }
    };

    return (
        <div>
            {!!mintInfo && (
                <IFrameBox
                    active={active}
                    nftImgUrl={mintInfo.background_header}
                    collectionImgUrl={mintInfo.image}
                    collectionTitle={mintInfo.name}
                    nftTitle={mintInfo.name}
                    nftDescription={mintInfo.description}
                    price={mintPrice}
                    mintsRemain={mintRemain}
                    mintBtnDisabled={false}
                    questions={mintInfo.first_party_data.map((item: any) => item.question)}
                    socialLinks={{
                        twitter: twitterEnabled,
                        discord: discordEnabled,
                        facebook: facebookEnabled,
                        instagram: instagramEnabled
                    }}
                    nftCount={nftCount}
                    nftCountError={nftCountError}
                    onNftCountChange={onNftCountChange}
                    answers={answers}
                    answersError={answersError}
                    onAnswersChange={onAnswersChange}
                    onConnectWallet={handleConnectMetamask}
                    onDisconnectWallet={handleDisconnectMetamask}
                    onMintNft={handleMint}
                />
            )}
        </div>
    );
};

export default LunaCheckoutWidget;
