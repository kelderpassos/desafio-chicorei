/* eslint-disable import/no-cycle */
import { DataTypes, Model } from 'sequelize';
import connection from '../connection/connection';
import Cnpj from './Cnpjs';

export default class Sponsors extends Model {
  id!: number;
  name!: string;
  tradingName!: string;
  cashforceTax!: string;
  responsibleName!: string;
  responsibleEmail!: string;
  responsiblePosition!: string;
  responsiblePhone!: string;
  responsibleMobile!: string;
  website!: string;
  postalCode!: string;
  address!: string;
  number!: string;
  complement!: string;
  neighborhood!: string;
  city!: string;
  state!: string;
  bank!: string;
  bankAgency!: string;
  account!: string;
  phoneNumber!: string;
  situation!: string;
  situationDate!: string;
  createdAt!: Date;
  updatedAt!: Date;
  cnpjId!: number;
  email!: string;
}

Sponsors.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tradingName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cashforceTax: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  responsibleName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  responsibleEmail: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  responsiblePosition: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  responsiblePhone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  responsibleMobile: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  postalCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  complement: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  neighborhood: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bank: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bankAgency: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  account: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  documents: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  situation: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  situationDate: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  cnpjId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize: connection,
  timestamps: true,
  underscored: false,
  tableName: 'sponsors',
  charset: 'latin1',
});

Sponsors.belongsTo(Cnpj, {
  foreignKey: 'cnpjId', as: 'cnpj', onDelete: 'SET NULL', onUpdate: 'CASCADE',
});
