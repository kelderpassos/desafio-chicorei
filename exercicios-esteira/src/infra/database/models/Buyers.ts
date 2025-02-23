/* eslint-disable import/no-cycle */
import { DataTypes, Model } from 'sequelize';
import connection from '../connection/connection';
import Cnpj from './Cnpjs';

export default class Buyers extends Model {
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
  phoneNumber!: string;
  situation!: string;
  situationDate!: string;
  createdAt!: Date;
  updatedAt!: Date;
  cnpjId!: number;
  confirm!: number;
  email!: string;
}

Buyers.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
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
  confirm: {
    type: DataTypes.TINYINT,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize: connection,
  timestamps: true,
  underscored: false,
  tableName: 'buyers',
  charset: 'latin1',
});

Buyers.belongsTo(Cnpj, {
  foreignKey: 'cnpjId', as: 'cnpj', onDelete: 'SET NULL', onUpdate: 'CASCADE',
});
