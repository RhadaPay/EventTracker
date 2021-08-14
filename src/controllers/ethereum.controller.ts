import { DBRequest } from "@/interfaces/request.interface";
import { contract } from "@/plugins/ethereum";
import { EthereumService } from "@/services/ethereum.service";
import { json } from "envalid";
import { NextFunction, Request, Response } from "express";

class EthereumController {
  public service = new EthereumService(contract);

  public getStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currentBlock = await contract.provider.getBlockNumber(); 
      res.status(200).json({ data: currentBlock, message: 'checkStatus' });
    } catch (error) {
      next(error)
    }
  }
  public getJobs = async (req: DBRequest, res: Response, next: NextFunction) => {
    try {
      const jobs = await this.service.fetchAllJobs(); 
      const data = jobs.map(job => { job.descriptor })
      res.status(200).json({ data, message: 'getJobs' });
    } catch (error) {
      next(error)
    }
  }
}

export default EthereumController
