import EthereumController from "@/controllers/ethereum.controller";
import { Routes } from "@/interfaces/routes.interface";
import { Router } from "express";

class EthereumRoute implements Routes {
  public path = '/eth';
  public router = Router();
  public ethereumController = new EthereumController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/status`, this.ethereumController.getStatus);
  }  
}

export default EthereumRoute;