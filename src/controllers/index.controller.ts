import { addToQueue } from '@/plugins/queue';
import { NextFunction, Request, Response } from 'express';

class IndexController {
  public index = (req: Request, res: Response, next: NextFunction): void => {
    try {
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };

  public schedule = (req: Request, res: Response, next: NextFunction): void => {
    try {
      console.log('Schedule');
      addToQueue(req.body);
      res.sendStatus(200);
    } catch (error) {
      next(error)
    }
  }
}

export default IndexController;
