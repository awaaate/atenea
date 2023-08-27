import { z } from "zod";


const validDomainRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const createSiteInput = z.object({
    name: z.string(),
    description: z.string().min(100),
    subdomain: z.string().refine((subdomain) => {
        //TODO: fix this  with env variables
        const etst = validDomainRegex.test(subdomain + "." + "atenea.wtf");
        console.log(etst, subdomain);
        return etst;
    })
});