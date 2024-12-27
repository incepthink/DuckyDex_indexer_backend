export type PoolType = {
  asset_0: string;
  asset_1: string;
  id: string;
  create_time: number;
  decimals_0: number;
  decimals_1: number;
  reserve_0: string;
  reserve_1: string;
  is_stable: boolean;
  tvl: bigint;
};

export type AssetType = {
  assetId: string;
  name: string;
  symbol: string;
  decimals: number;
  icon: string;
  l1Address: string;
  contractId: string;
  subId: string;
  price: string;
  isVerified: boolean;
};
