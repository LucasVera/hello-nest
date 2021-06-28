import { Request, Response } from 'express';

// since this middleware will be used globally, it needs to be declared
// as a plain js function to be used in main.ts
export function logger(req: Request, res: Response, next: () => void): void {
  console.log('Handling cors middleware here...');
  next()
}
