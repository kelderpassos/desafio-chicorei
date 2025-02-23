import Buyers from '../../database/models/Buyers';
import Cnpj from '../../database/models/Cnpjs';
import Orders from '../../database/models/Orders';
import Providers from '../../database/models/Providers';
import Model from './Model';

export default class InvoiceModel extends Model<Orders> {
  protected _attributes = ['orderNumber', 'value', 'emissionDate', 'orderStatusBuyer'];
  protected _associations = [
    { model: Buyers, as: 'buyers', attributes: ['name'] },
    { model: Providers, as: 'providers', attributes: ['name'] },
    { model: Cnpj, as: 'cnpj', attributes: ['cnpj'] },
  ];

  constructor() {
    super(Orders);
  }

  public findAll = async (userId: string): Promise<Orders[]> => this._model.findAll({
    where: { userId },
    attributes: this._attributes,
    include: this._associations,
  });
}
