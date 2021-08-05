import EthereumController from "@/controllers/ethereum.controller";
import { PostWeiDto } from "@/dtos/ethereum.dto";
import { Routes } from "@/interfaces/routes.interface";
import validationMiddleware from "@/middlewares/validation.middleware";
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
    this.router.post(
      `${this.path}/send`,
      validationMiddleware(PostWeiDto, 'body'),
      this.ethereumController.postWei);
  }  
}

export default EthereumRoute;