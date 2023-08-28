import { env } from '@/env.mjs';
import {
    connectorsForWallets,
    getDefaultWallets,
} from '@rainbow-me/rainbowkit';
import {
    argentWallet,
    ledgerWallet,
    trustWallet,
} from '@rainbow-me/rainbowkit/wallets';


import { type GetSiweMessageOptions } from '@rainbow-me/rainbowkit-siwe-next-auth';


import { configureChains, createConfig } from 'wagmi';
import {
    goerli,
    mainnet
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

export const { chains, publicClient, webSocketPublicClient } = configureChains(
    [
        mainnet,
        ...(env.NEXT_PUBLIC_ENABLE_TESTNETS ? [goerli] : []),
    ],
    [publicProvider()]
);

//TODO: change this to the correct project id 
const projectId = "749d34d82e237a16a047298123c4b88d"

export const appInfo = {
    appName: 'atenea',
};

const { wallets } = getDefaultWallets({
    appName: appInfo.appName,
    projectId,
    chains,
});


const connectors = connectorsForWallets([
    ...wallets,
    {
        groupName: 'Other',
        wallets: [
            argentWallet({ projectId, chains }),
            trustWallet({ projectId, chains }),
            ledgerWallet({ projectId, chains }),
        ],
    },
]);

export const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
});

export const getSiweMessageOptions: GetSiweMessageOptions = () => ({
    statement: 'Sign in to Atenea',

});
