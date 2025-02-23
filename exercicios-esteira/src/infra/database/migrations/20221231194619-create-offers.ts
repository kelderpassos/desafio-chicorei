import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
    async () => {
      await queryInterface.createTable('offers', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        tax: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        tariff: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        adValorem: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        float: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        iof: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        expiresIn: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        paymentStatusSponsor: {
          defaultValue: 0,
          type: DataTypes.TINYINT,
        },
        paymentStatusProvider: {
          defaultValue: 0,
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
        sponsorId: {
          defaultValue: null,
          type: DataTypes.INTEGER,
          references: {
            model: 'sponsors',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          key: 'sponsorId',
        },
      }, {
        charset: 'latin1',
      });
    },
  ),

  down: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
    async () => {
      await queryInterface.dropTable('offers');
    },
  ),
};
