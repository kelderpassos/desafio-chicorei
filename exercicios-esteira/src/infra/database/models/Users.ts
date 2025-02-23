/* eslint-disable import/no-cycle */
import { DataTypes, Model } from 'sequelize';
import connection from '../connection/connection';

export default class Users extends Model {
  id!: number;
  name!: string;
  email!: string;
  phoneNumber!: string;
  mobile!: string;
  department!: string;
  verificationCode!: string;
  emailChecked!: number;
  createdAt!: Date;
  updatedAt!: Date;
  cashforceAdm!: number;
}

Users.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  department: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  verificationCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  emailChecked: {
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
  cashforceAdm: {
    type: DataTypes.TINYINT,
    allowNull: false,
  },
}, {
  sequelize: connection,
  timestamps: true,
  underscored: false,
  tableName: 'users',
  charset: 'latin1',
});
