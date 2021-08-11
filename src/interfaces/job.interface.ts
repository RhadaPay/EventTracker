import { BigNumber } from "ethers";

export interface JobWId {
  id: number;
  details: Job;
};

export type Job = [
  string,
  BigNumber,
  BigNumber,
  number,
  string,
  BigNumber,
  BigNumber,
  boolean,
  boolean,
  boolean,
  number
] & {
  creator: string;
  amount: BigNumber;
  refreshRate: BigNumber;
  percentage: number;
  assetCid: string;
  eventStreamId: BigNumber;
  eventsRecorded: BigNumber;
  creatorSigned: boolean;
  applicantSigned: boolean;
  workSubmitted: boolean;
  state: number;
}