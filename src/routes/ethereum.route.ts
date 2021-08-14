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
    // use the POST events route to see implementation of ingestEvent
    this.router.get(`${this.path}/status`, this.ethereumController.getStatus);
    this.router.get(`${this.path}/jobs`, this.ethereumController.getJobs);
  } 
}

export default EthereumRoute;