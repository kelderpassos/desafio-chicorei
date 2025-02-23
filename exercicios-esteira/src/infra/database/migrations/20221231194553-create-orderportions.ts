import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
    async () => {
      await queryInterface.createTable('orderportions', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        nDup: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        dVenc: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        vDup: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        availableToMarket: {
          defaultValue: 1,
          type: DataTypes.TINYINT,
        },
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        orderId: {
          defaultValue: null,
          type: DataTypes.INTEGER,
          references: {
            model: 'orders',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          key: 'orderId',
        },
      }, {
        charset: 'latin1',
      });
    },
  ),

  down: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
    async () => {
      await queryInterface.dropTable('orderportions');
    },
  ),
};
