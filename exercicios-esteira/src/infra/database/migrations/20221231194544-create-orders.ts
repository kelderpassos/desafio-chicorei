import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
    async () => {
      await queryInterface.createTable('orders', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        orderNfId: {
          allowNull: false,
          type: DataTypes.STRING,
          unique: true,
        },
        orderNumber: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        orderPath: {
          defaultValue: null,
          type: DataTypes.STRING,
          unique: true,
        },
        orderFileName: {
          defaultValue: null,
          type: DataTypes.STRING,
          unique: true,
        },
        orderOriginalName: {
          defaultValue: null,
          type: DataTypes.STRING,
          unique: true,
        },
        emissionDate: {
          defaultValue: null,
          type: DataTypes.STRING,
        },
        pdfFile: {
          defaultValue: null,
          type: DataTypes.STRING,
        },
        emitedTo: {
          defaultValue: null,
          type: DataTypes.STRING,
        },
        nNf: {
          defaultValue: null,
          type: DataTypes.STRING,
        },
        CTE: {
          defaultValue: null,
          type: DataTypes.STRING,
        },
        value: {
          defaultValue: null,
          type: DataTypes.STRING,
        },
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        cnpjId: {
          defaultValue: null,
          type: DataTypes.INTEGER,
          references: {
            model: 'cnpjs',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          key: 'cnpjId',
        },
        userId: {
          defaultValue: null,
          type: DataTypes.INTEGER,
          references: {
            model: 'users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          key: 'userId',
        },
        buyerId: {
          defaultValue: null,
          type: DataTypes.INTEGER,
          references: {
            model: 'buyers',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          key: 'buyerId',
        },
        providerId: {
          defaultValue: null,
          type: DataTypes.INTEGER,
          references: {
            model: 'providers',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          key: 'providerId',
        },
        orderStatusBuyer: {
          defaultValue: '0',
          type: DataTypes.STRING,
        },
        orderStatusProvider: {
          defaultValue: '0',
          type: DataTypes.STRING,
        },
        deliveryReceipt: {
          defaultValue: null,
          type: DataTypes.STRING,
        },
        cargoPackingList: {
          defaultValue: null,
          type: DataTypes.STRING,
        },
        deliveryCtrc: {
          defaultValue: null,
          type: DataTypes.STRING,
        },
      }, {
        charset: 'latin1',
      });
    },
  ),

  down: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
    async () => {
      await queryInterface.dropTable('orders');
    },
  ),
};
