import "dotenv/config";


import { it, expect } from 'vitest';
import { usersRouter } from './users';
import { db } from '@shared/db';
console.log(process.env.DATABASE_URL, "database url")

const caller = usersRouter.createCaller({
    db,
    user: null
});

it.skip('should  sign an user', async () => {

    const user = await caller.signInWithWallet({
        walletAddress: '0xbFd7D4c9C933D384e00d944c6608D6fDBa73934b'
    });
    console.log(user)

    expect(user).toBeDefined();

});