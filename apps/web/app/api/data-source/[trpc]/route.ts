
import { dataSourceRouter } from "@shared/api/src/api/data-source";

import { fetchRequestHandler } from "@shared/api/src/fetch-handler";
import { db } from "@shared/db";
import { NextRequest, NextResponse } from "next/server"
//export const runtime = "edge"

const handler = (req: Request, res: Response) => {
  console.log("Response", Response);
  return fetchRequestHandler({
    endpoint: "/api/data-source",
    req,
    router: dataSourceRouter, // from "@shared/api/src/api/data-source"
    createContext: async (opts) => {
      return {
        db: db,
        user: null,
      };
    },

  })
};

export async function OPTIONS(req: Request) {
  const response = new Response();

  response.headers.set("Access-Control-Allow-Origin", "http://localhost:6006");
  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  response.headers.set("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

  return response;
}





export { handler as GET, handler as POST };

