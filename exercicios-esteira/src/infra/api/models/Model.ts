import {
  Model as SequelizeModel, ModelStatic, Includeable,
} from 'sequelize';

export default abstract class Model<T extends SequelizeModel> {
  protected _model: ModelStatic<T>;
  protected abstract _attributes: string[];
  protected abstract _associations: Includeable[];

  constructor(model: ModelStatic<T>) {
    this._model = model;
  }

  abstract findAll(userId: string): unknown;
}
