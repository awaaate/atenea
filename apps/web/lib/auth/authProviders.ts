
import { env } from '@/env.mjs';
import { type Provider } from 'next-auth/providers';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getCsrfToken } from 'next-auth/react';
import { SiweMessage } from 'siwe';
import { db } from '../db';

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

        const nextAuthUrl =
          env.NEXT_PUBLIC_APP_URL
        if (!nextAuthUrl) {
          return null;
        }
        const nextAuthHost = new URL(nextAuthUrl).host;
        if (siwe.domain !== nextAuthHost) {
          return null;
        }

        // let token = await getToken({req})
        const token = await getCsrfToken({ req: { headers: req?.headers } })
        if (siwe.nonce !== token) {
          return null
        }

        await siwe.verify({ signature: credentials?.signature || '' });
        //logServer('siwe', siwe);

        //fisrst we need to check if the user is already registered
        //if not we need to register it

        try {
          const currentUser = await db.user.findUnique({
            where: {
              walletAddress: siwe.address,
            },
          });
          //get the image from https://avatars.jakerunzer.com/sdadasd

          if (currentUser) {
            return {
              walletAddress: siwe.address,
              id: currentUser.id,
            };
          } else {
            const newUser = await db.user.create({
              data: {
                walletAddress: siwe.address,
                image: '',
              },
            });
            return {
              walletAddress: siwe.address,
              id: newUser.id,
            };

          }


        } catch (error) {

        }
        return {
          walletAddress: siwe.address,
          id: siwe.address,
        };
      } catch (e) {
        return null;
      }
    },

  }),
];
