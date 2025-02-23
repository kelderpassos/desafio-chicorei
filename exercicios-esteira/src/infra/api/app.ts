import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import invoiceRouter from './routes/invoice';
import { errorHandler } from './middleware/errorHandler';

export default class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.app.get('/', (_req, res) => res.json('Ok'));
  }

  private config = async (): Promise<void> => {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use('/invoices', invoiceRouter);
    this.app.use(errorHandler);
  };

  public start = (PORT: string | number): void => {
    // eslint-disable-next-line no-console
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  };
}
