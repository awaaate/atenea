export interface GetNounsBalance {
  code: number;
  message: string;
  data: Daum[];
  count: number;
}

export interface Daum {
  balance: string;
  contract_address: string;
  current_usd_price: number;
  decimals: number;
  logos: Logo[];
  name: string;
  symbol: string;
  total_supply: string;
  urls: Url[];
}

export interface Logo {
  height: number;
  uri: string;
  width: number;
}

export interface Url {
  name: string;
  url: string;
}
