import { type inferAsyncReturnType } from '@trpc/server'
import { type FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'
import jwt from "jsonwebtoken"
import { Database } from '@shared/db'


export interface User {
    id: string
}

export interface ApiContextProps {
    user: User | null
    db: Database
}

export const createContext = async (
    db: Database,
    JWT_VERIFICATION_KEY: string,
    opts: FetchCreateContextFnOptions
): Promise<ApiContextProps> => {

    async function getUser() {
        const sessionToken = opts.req.headers.get('authorization')?.split(' ')[1]

        if (sessionToken) {
            if (!JWT_VERIFICATION_KEY) {
                console.error('JWT_VERIFICATION_KEY is not set')
                return null
            }

            try {
                const authorized = jwt.verify(sessionToken, JWT_VERIFICATION_KEY)
                if (!authorized) {
                    return null
                }

                const decodedToken = jwt.decode(sessionToken)

                // Check if token is expired
                if (typeof decodedToken !== 'object' || !decodedToken) return null
                const expirationTimestamp = decodedToken.payload.exp
                const currentTimestamp = Math.floor(Date.now() / 1000)
                if (!expirationTimestamp || expirationTimestamp < currentTimestamp) {
                    return null
                }

                const userId = decodedToken?.payload?.sub

                if (userId) {
                    return {
                        id: userId,
                    }
                }
            } catch (e) {
                console.error(e)
            }
        }

        return null
    }

    const user = await getUser()

    return { user, db }
}

export type Context = inferAsyncReturnType<typeof createContext>