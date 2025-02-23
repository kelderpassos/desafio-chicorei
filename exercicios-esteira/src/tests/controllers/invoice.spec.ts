/* eslint-disable @typescript-eslint/no-unused-expressions */
import * as sinon from 'sinon';
import { expect } from 'chai';
import { Request, Response } from 'express';
import Orders from '../../infra/database/models/Orders';
import { mockInvoice } from '../mocks';
import InvoiceController from '../../infra/api/controllers/invoice.controller';

describe('Endpoint /invoices', () => {
  const invoiceController = new InvoiceController();

  const req = {} as Request;
  const res = {} as Response;

  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('Get method', () => {
    it('should return status code "200" in case of sucess', async () => {
      sinon.stub(Orders, 'findAll').resolves(mockInvoice as unknown as Orders[]);
      req.params = { id: '1' };

      await invoiceController.findAll(req, res);

      const resStub = res.status as sinon.SinonStub;

      expect(resStub.calledWith(200)).to.be.true;
    });

    it('should return all invoices from an user', async () => {
      sinon.stub(Orders, 'findAll').resolves(mockInvoice as unknown as Orders[]);
      req.params = { id: '1' };

      await invoiceController.findAll(req, res);

      const jsonStub = res.json as sinon.SinonStub;

      expect(jsonStub).to.be.a('function');
      expect(jsonStub.calledWith(mockInvoice)).to.be.true;
    });

    it('should throw an error if no invoice comes from db', async () => {
      sinon.stub(Orders, 'findAll').resolves();
      req.params = { id: '1' };

      let error;

      try {
        await invoiceController.findAll(req, res);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        error = err;
      }

      expect(error?.message).to.be.equal('Any invoices found');
    });
  });
});
