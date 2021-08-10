import { Event } from "./events.interface";

export interface Names {
  thread: string;
  collection: string;
}

export interface AuthParams {
  key: string;
  secret: string;
}

export interface SetupDBParams {
  auth: AuthParams,
  names: Names,
}

interface DBSample extends Event {
  _id: string;
}

export interface DatabaseSeed {
  schema: any;
  sample?: DBSample; 
}