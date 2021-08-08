import { Request } from "express";
import { RhadaPay } from "./typechain";

export interface EthRequest extends Request {
  contract: RhadaPay;
}
