import { ethers, Wallet } from "ethers";
import { Request } from "express";

export interface EthRequest extends Request {
  provider?: ethers.providers.JsonRpcProvider;
  wallet?: Wallet;
}
