import { auth } from ".";

export type Session = {
    user: {
        id: string;
        name?: string;
        email?: string;
        walletAddress: string;
    };
};


export function getSession() {


    return auth() as unknown as Promise<Session>;
}
