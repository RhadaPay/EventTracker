import { EthRequest } from "@/interfaces/request.interface";
import { RhadaPay } from "@/interfaces/typechain";
import { RequestHandler } from "express";

const ethereumMiddleware = (
  /*
    Make ethereum contract available in the route
    Might not need this
  */
  contract: RhadaPay,
): RequestHandler => (req: EthRequest, res, next) => {
  req.contract = contract;
  next();
};

export default ethereumMiddleware;