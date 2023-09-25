import { GetNounsBalance } from "./types";

export const getNounsBlance = async () => {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  myHeaders.append("x-api-key", "2VtZfu3cDclSwOpwkMXOKOXf85L");

  const response = await fetch(
    "https://api.chainbase.online/v1/account/tokens?chain_id=1&address=0xb1a32FC9F9D8b2cf86C068Cae13108809547ef71&limit=20&page=1",
    {
      headers: myHeaders,
    }
  );

  const json = (await response.json()) as GetNounsBalance;

  console.log(json);
  return json.data;
};
