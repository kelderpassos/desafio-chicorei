import { DataTypes, Model } from 'sequelize';
import connection from '../connection/connection';
import Orders from './Orders';

export default class OrderPortions extends Model {
  id!: number;
  nDup!: string;
  dVenc!: string;
  vDup!: string;
  availableToMarket!: number;
  createdAt!: Date;
  updatedAt!: Date;
  orderId!: number;
}

OrderPortions.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  nDup: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dVenc: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vDup: {
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
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  sequelize: connection,
  timestamps: true,
  underscored: false,
  tableName: 'orderportions',
  charset: 'latin1',
});

OrderPortions.belongsTo(Orders, {
  foreignKey: 'orderId', as: 'orders', onDelete: 'SET NULL', onUpdate: 'CASCADE',
});
