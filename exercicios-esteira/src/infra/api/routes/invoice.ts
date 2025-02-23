import { Router } from 'express';
import InvoiceController from '../controllers/invoice.controller';

const invoiceController = new InvoiceController();
const invoiceRouter = Router();

invoiceRouter.get('/:id', (req, res) => invoiceController.findAll(req, res));

export default invoiceRouter;
