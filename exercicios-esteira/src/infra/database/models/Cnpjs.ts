/* eslint-disable import/no-cycle */
import { DataTypes, Model } from 'sequelize';
import connection from '../connection/connection';

export default class Cnpj extends Model {
  id!: number;
  cnpj!: string;
  companyType!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

Cnpj.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  cnpj: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  companyType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  sequelize: connection,
  timestamps: true,
  underscored: false,
  tableName: 'cnpjs',
  charset: 'latin1',
});
