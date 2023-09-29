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

  const eth = await getEthPrice();

  const tokens = [
    ...json.data,
    {
      balance: eth.ethBalance.data,
      contract_address: "0x000000",
      current_usd_price:
        (eth.rates.last_trade_price * parseInt(eth.ethBalance.data, 16)) /
        10 ** 18,
      decimals: 18,
      logos: [
        {
          height: 200,
          uri: "https://upload.wikimedia.org/wikipedia/commons/0/01/Ethereum_logo_translucent.svg",
          width: 200,
        },
      ],
      name: "Ethereum",
      symbol: "ETH",
      total_supply: "0",
      urls: [],
    },
  ];
  console.log(tokens);
  return tokens;
};
export interface Rates {
  symbol: string;
  price_24h: number;
  volume_24h: number;
  last_trade_price: number;
}

export interface EthBalance {
  code: number;
  message: string;
  data: string;
}
const getEthPrice = async () => {
  const rates = (await fetch(
    "https://api.blockchain.com/v3/exchange/tickers/ETH-USD"
  ).then((res) => res.json())) as Rates;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-api-key": "2VtZfu3cDclSwOpwkMXOKOXf85L",
    },
  };

  const ethBalance = (await fetch(
    "https://api.chainbase.online/v1/account/balance?chain_id=1&address=0xb1a32FC9F9D8b2cf86C068Cae13108809547ef71",
    options
  ).then((res) => res.json())) as EthBalance;

  return {
    rates,
    ethBalance,
  };
};
