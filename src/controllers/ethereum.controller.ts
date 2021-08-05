import { EthRequest } from "@/interfaces/ethereum.interface";
import { EthereumService } from "@/services/ethereum.service";
import { NextFunction, Request, Response } from "express";

class EventsController {
  public ethereumService = new EthereumService();

  public getStatus = async (req: EthRequest, res: Response, next: NextFunction) => {
    try {
      const { provider } = req;
      const currentBlock = await provider.getBlockNumber(); 
      res.status(200).json({ data: currentBlock, message: 'checkStatus' });
    } catch (error){
      next(error)
    }
  }

  public postWei = async (req: EthRequest, res: Response, next: NextFunction) => {
    try {
      const { wallet } = req;
      const { value } = req.body;
      const to = '0xd4855998afE4d042675686B66103dff9228e5f0E';
      const transaction = await wallet.sendTransaction({ to, value })
      res.status(200).json({ data: transaction, message: 'postWei' });
    } catch (error){
      next(error)
    }
  }
}

export default EventsController
