import { BigNumberish } from '@ethersproject/bignumber';
export interface Bid {
  gnarId: BigNumberish;
  sender: string;
  value: BigNumberish;
  transactionHash: string;
  timestamp: BigNumberish;
}