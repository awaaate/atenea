
import { env } from '@/env.mjs';
import { type Provider } from 'next-auth/providers';
import CredentialsProvider from 'next-auth/providers/credentials';
//@ts-expect-error
import { SiweMessage } from 'siwe';
import { createCaller } from '../trpc/createCaller';
import { getCsrfToken } from './getCsrfToken';


export const authProviders: Provider[] = [
  CredentialsProvider({
    credentials: {
      message: {
        label: 'Message',
        placeholder: '0x0',
        type: 'text',
      },
      signature: {
        label: 'Signature',
        placeholder: '0x0',
        type: 'text',
      },
    },
    name: 'Ethereum',
    async authorize(credentials, req) {
      try {
        const siwe = new SiweMessage(
          JSON.parse(credentials?.message || '{}')
        );

        console.log('siwe', siwe)
        const nextAuthUrl =
          env.NEXT_PUBLIC_APP_URL
        if (!nextAuthUrl) {
          return null;
        }
        const nextAuthHost = new URL(nextAuthUrl).host;
        if (siwe.domain !== nextAuthHost) {
          return null;
        }
        console.log('siwe.domain !== nextAuthHost', siwe.domain !== nextAuthHost)
        console.log(await req.json(), "JSOOOOON")
        // let token = await getToken({req})
        const token = await getCsrfToken(req.headers.get('cookie') || '');

        console.log("TOOOKEN")
        console.log(token)

        console.log('token', token)
        if (siwe.nonce !== token) {
          return null
        }

        await siwe.verify({ signature: credentials?.signature || '' });
        //logServer('siwe', siwe);

        //fisrst we need to check if the user is already registered
        //if not we need to register it

        const caller = createCaller()

        const user = await caller.users.signInWithWallet({
          walletAddress: siwe.address,
        })
        return user;
      } catch (e) {
        return null;
      }
    },

  }),
];
