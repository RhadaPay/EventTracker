import { Database } from "@/plugins/database";
import { Request } from "express";
import { RhadaPay } from "./typechain";

export interface EthRequest extends Request {
  contract: RhadaPay;
}

export interface DBRequest extends Request {
  db: Database;
}