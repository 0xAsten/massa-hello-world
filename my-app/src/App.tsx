import {
  Client,
  ClientFactory,
  strToBytes,
  bytesToStr,
  WalletClient,
  DefaultProviderUrls,
} from '@massalabs/massa-web3';

import { useEffect, useState } from 'react';

const sc_addr = 'AS12DNtXixaMWbDZRM2ECQrXnJLgr8hmhFdsM1HNzu4mi3TsSfHKm';

/**
 * Content component that handles interactions with a Massa smart contract
 * @returns The rendered component
 */
function Content() {
  /**
   * State variables to manage the web3 client and greetings
   */
  const [web3client, setWeb3client] = useState<Client | null>(null);
  const [greeting, setGreeting] = useState<string | null>(null);

  /**
   * Initialize the web3 client using the custom provider defined above
   */
  useEffect(() => {
    const initClient = async () => {
      const client = await ClientFactory.createDefaultClient(
        DefaultProviderUrls.BUILDNET,
        false,
      );
      setWeb3client(client);
    };
    initClient().catch(console.error);
  }, []);

  /**
   * Fetch the greeting when the web3 client is initialized
   */
  useEffect(() => {
    if (web3client) {
      funcGetGreeting();
    }
  }, [web3client]);

  /**
   * Function to get the current greeting from the smart contract
   */
  async function funcGetGreeting() {
    if (web3client) {
      let res = await web3client
        .publicApi()
        .getDatastoreEntries([
          { address: sc_addr, key: strToBytes('greeting') },
        ]);
      if (res[0].candidate_value) {
        let greetingDecoded = bytesToStr(res[0].candidate_value);
        setGreeting(greetingDecoded);
      }
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div>Greeting: {greeting}</div>
    </div>
  );
}

export default Content;
