import React, { useEffect , useState } from 'react';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';
import CandyMachine from './CandyMachine';

// Constants - add comment - keep adding
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {

  const [walletAddress, setWalletAddress] = useState(null);
 
  /**
   * Declare Check Solana wallet function
   */
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log('Phantom Wallet Found!');
          
          /**
           * The solana object gives us a function that will allow us to connect 
           * directly with the user's wallet!
           */
          const response = await solana.connect({ onlyIftrusted: true });
          console.log(
            'Connected with Public Key:',
            response.publicKey.toString()
          );

          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert('Solana object not found! Get a Phantom Wallet!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async() => {
    const { solana } = window;

    if(solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key:' , response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  /**
   * We want to render this UI when the user hasn't connected their wallet to our app yet
   */
  const renderNotConnectedContainer = () => (
  <button
    className="cta-button connect-wallet-button"
    onClick={connectWallet}
  >
    Connect To Wallet
  </button>
  );
  
  /**
   * When our component first mounts, lets check to see if we hae a connected
   * Phantom Wallet
   */

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🍭 Candy Drop</p>
          <p className="sub-text">NFT drop machine with fair mint</p>
          {/* Render your connect to wallet button right here */}
          {/* Add the condition to show this only if we don't have a wallet address */}
          {!walletAddress && renderNotConnectedContainer()}
        </div>
        {/* Check for walletAddress and then pass in walleAddress */}
        {walletAddress && <CandyMachine walletAddress={window.solana}/>}
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

/**
 * Candy Machine Address: FNbsiZCKjY4MbD18bVn56SDLJbwVEgHzyr85xbw6rmpa
 */

export default App;
 