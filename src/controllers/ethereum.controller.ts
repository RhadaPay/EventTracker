import { contract } from "@/plugins/ethereum";
import { EthereumService } from "@/services/ethereum.service";
import { NextFunction, Request, Response } from "express";

class EventsController {
  public ethereumService = new EthereumService(contract);

  public getStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currentBlock = await contract.provider.getBlockNumber(); 
      res.status(200).json({ data: currentBlock, message: 'checkStatus' });
    } catch (error){
      next(error)
    }
  }
}

export default EventsController
