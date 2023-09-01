import { Database } from '@shared/db'
import { type inferAsyncReturnType } from '@trpc/server'


export interface User {
    id: string
}

export interface ApiContextProps {
    user: User | null
    db: Database
}

export const createContext = async (
    db: Database,
    session: {
        user: User | null
    }
): Promise<ApiContextProps> => {

    const user = session.user

    return { user, db }
}

export type Context = inferAsyncReturnType<typeof createContext>