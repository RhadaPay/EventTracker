import { DBRequest } from "@/interfaces/request.interface";
import { Database } from "@/plugins/database";
import { RequestHandler } from "express";

const databaseMiddleware = (
  /*
    Make db available in the route
  */
  db: Database,
): RequestHandler => async (req: DBRequest, res, next) => {
  req.db = db;
  // await db.testConnection();
  next();
};

export default databaseMiddleware; 