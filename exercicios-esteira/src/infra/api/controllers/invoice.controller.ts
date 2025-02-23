import { Request, Response } from 'express';
import InvoiceModel from '../models/invoice.model';
import RequestError from '../utils/RequestError';

export default class InvoiceController {
  constructor(protected _model = new InvoiceModel()) { }

  findAll = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const allInvoices = await this._model.findAll(id);

    if (!allInvoices) throw new RequestError(404, 'Any invoices found');

    return res.status(200).json(allInvoices);
  };
}
