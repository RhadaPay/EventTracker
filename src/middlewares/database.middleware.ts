import { DBRequest } from "@/interfaces/request.interface";
import { Database } from "@/plugins/database";
import { RequestHandler } from "express";

const databaseMiddleware = (
  /*
    Make db available in the route
  */
  db: Database,
): RequestHandler => (req: DBRequest, res, next) => {
  req.db = db;
  next();
};

export default databaseMiddleware;