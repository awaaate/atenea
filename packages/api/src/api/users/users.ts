import { User } from "@shared/db/src/schema";
import { nanoid } from "nanoid";
import * as z from "zod";
import { publicProcedure, router } from "../../trpc";


export const usersRouter = router({
    signInWithWallet: publicProcedure.input(z.object({
        walletAddress: z.string(),
    })).query(async ({ input, ctx }) => {
        const { db } = ctx;
        const { walletAddress } = input

        //check if user exists
        const userExists = await db.query.User.findFirst({
            where(fields, { eq }) {
                return eq(fields.walletAddress, walletAddress)
            }
        })

        if (userExists && userExists.id) return {
            id: userExists.id,
            email: userExists.email,
            walletAddress: userExists.walletAddress,
        }

        //create user


        const newUser = db.insert(User).values({
            id: nanoid(),
            walletAddress,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }).returning({
            id: User.id,
            email: User.email,
            walletAddress: User.walletAddress,
        })

        if (!newUser) throw new Error("User not created")

        return {
            id: newUser[0].id,
            email: newUser[0].email,
            walletAddress: newUser[0].walletAddress,
        }




    }),

})
