import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { inspect } from 'util';
import { inspectObject } from 'src/helpers';


@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void): void {
    console.log(`
Path: ${inspectObject(req.path)}
Headers: ${inspectObject(req.headers)}
Ip: ${inspectObject(req.ip)}
Params: ${inspectObject(req.params)}
Body: ${inspectObject(req.body)}
    `);
    next();
  }
}
