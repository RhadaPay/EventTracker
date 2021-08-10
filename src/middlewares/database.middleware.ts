import { DBRequest } from "@/interfaces/request.interface";
import { Database } from "@/plugins/database";
import { RequestHandler } from "express";

const databaseMiddleware = (
  /*
    Make ethereum contract available in the route
    Might not need this
  */
  db: Database,
): RequestHandler => (req: DBRequest, res, next) => {
  req.db = db;
  next();
};

export default databaseMiddleware;