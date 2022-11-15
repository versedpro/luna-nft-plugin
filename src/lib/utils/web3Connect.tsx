import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import WalletConnect from '@walletconnect/web3-provider';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';

const providerOptions = {
  walletlink: {
    package: CoinbaseWalletSDK, // Required
    options: {
      appName: 'Forward Protocol', // Required
      infuraId: process.env.REACT_APP_INFURA_KEY // Required unless you provide a JSON RPC url; see `rpc` below
    }
  },
  walletconnect: {
    package: WalletConnect, // required
    options: {
      infuraId: process.env.REACT_APP_INFURA_KEY // required
    }
  }
};

export const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
  providerOptions // required
});

export const connectWallet = async () => {
  try {
    const provider = await web3Modal.connect();
    const library = new ethers.providers.Web3Provider(provider);
    const accounts = await library.listAccounts();
    const address = accounts[0];
    const network = await library.getNetwork();
    const chainId = network.chainId;
    return {
      provider: provider,
      library: library,
      address: address,
      chainId: chainId,
      status: 'success'
    };
  } catch (error) {
    console.log(error);
    return { status: 'false' };
  }
};

export const Web3Connect = ({
  children,
  classes,
  handleWallet
}: {
  children?: React.ReactNode;
  classes?: string;
  handleWallet?: () => void;
}) => {
  // maintaining local state of provider may give inter component inconsistency
  const [provider, setProvider] = useState<any>();
  const [library, setLibrary] = useState<any>();
  const [account, setAccount] = useState<string>();
  const [error, setError] = useState<any>('');

  useEffect(() => {
    handleWallet && handleWallet();
  }, [account]);

  const connectWallet = async () => {
    try {
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const accounts = await library.listAccounts();
      setProvider(provider);
      setLibrary(library);
      setAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const refreshState = () => {
    setProvider(undefined);
    setLibrary(undefined);
    setAccount(undefined);
  };

  const disconnect = async () => {
    await web3Modal.clearCachedProvider();
    refreshState();
  };

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWallet();
    }
  }, []);

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts) {
        }
      };

      const handleChainChanged = (_hexChainId: string | number) => {
        // window.location.reload();
      };

      const handleDisconnect = () => {
        console.log('disconnect', error);
        disconnect();
      };

      provider.on('accountsChanged', handleAccountsChanged);
      provider.on('chainChanged', handleChainChanged);
      provider.on('disconnect', handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener('accountsChanged', handleAccountsChanged);
          provider.removeListener('chainChanged', handleChainChanged);
          provider.removeListener('disconnect', handleDisconnect);
        }
      };
    }
  }, [provider]);

  return (
    <div>
      {children ? (
        <div onClick={connectWallet}>{children}</div>
      ) : library ? (
        <button className={classes} type="button" onClick={disconnect}>
          Disconnect wallet
        </button>
      ) : (
        <button className={classes} type="button" onClick={connectWallet}>
          Connect wallet
        </button>
      )}
    </div>
  );
};

export default Web3Connect;
