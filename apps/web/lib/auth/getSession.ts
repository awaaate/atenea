import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

export type Session = {
    user: {
        id: string;
        name?: string;
        email?: string;
        walletAddress: string;
    };
};


export function getSession() {


    return getServerSession(authOptions) as Promise<Session>;
}
