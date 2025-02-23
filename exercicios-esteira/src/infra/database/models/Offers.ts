/* eslint-disable import/no-cycle */
import { DataTypes, Model } from 'sequelize';
import connection from '../connection/connection';

export default class Offers extends Model {
  id!: number;
  tax!: string;
  tariff!: string;
  adValorem!: string;
  float!: string;
  iof!: string;
  expiresIn!: Date;
  paymentStatusSponsor!: number;
  paymentStatusProvider!: number;
  createdAt!: Date;
  updatedAt!: Date;
  orderId!: number;
  sponsorId!: number;
}

Offers.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  tax: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tariff: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adValorem: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  float: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  iof: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expiresIn: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  paymentStatusSponsor: {
    type: DataTypes.TINYINT,
    allowNull: false,
  },
  paymentStatusProvider: {
    type: DataTypes.TINYINT,
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
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  sponsorId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  sequelize: connection,
  timestamps: true,
  underscored: false,
  tableName: 'offers',
  charset: 'latin1',
});
