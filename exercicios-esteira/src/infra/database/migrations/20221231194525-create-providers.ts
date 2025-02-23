import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
    async () => {
      await queryInterface.createTable('providers', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        name: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        tradingName: {
          defaultValue: null,
          type: DataTypes.STRING,
        },
        cashforceTax: {
          defaultValue: null,
          type: DataTypes.STRING,
        },
        responsibleName: {
          defaultValue: null,
          type: DataTypes.STRING,
        },
        responsibleEmail: {
          defaultValue: null,
          type: DataTypes.STRING,
        },
        responsiblePosition: {
          defaultValue: null,
          type: DataTypes.STRING,
        },
        responsiblePhone: {
          defaultValue: null,
          type: DataTypes.STRING,
        },
        responsibleMobile: {
          defaultValue: null,
          type: DataTypes.STRING,
        },
        website: {
          defaultValue: null,
          type: DataTypes.STRING,
        },
        postalCode: {
          defaultValue: null,
          type: DataTypes.STRING,
        },
        address: {
          defaultValue: null,
          type: DataTypes.STRING,
        },
        number: {
          defaultValue: null,
          type: DataTypes.STRING,
        },
        complement: {
          defaultValue: null,
          type: DataTypes.STRING,
        },
        neighborhood: {
          defaultValue: null,
          type: DataTypes.STRING,
        },
        city: {
          defaultValue: null,
          type: DataTypes.STRING,
        },
        state: {
          defaultValue: null,
          type: DataTypes.STRING,
        },
        bank: {
          defaultValue: null,
          type: DataTypes.STRING,
        },
        bankAgency: {
          defaultValue: null,
          type: DataTypes.STRING,
        },
        account: {
          defaultValue: null,
          type: DataTypes.STRING,
        },
        documents: {
          defaultValue: null,
          type: DataTypes.STRING,
        },
        phoneNumber: {
          defaultValue: null,
          type: DataTypes.STRING,
        },
        situation: {
          defaultValue: null,
          type: DataTypes.STRING,
        },
        situationDate: {
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
          references: {
            model: 'cnpjs',
            key: 'id',
          },
          type: DataTypes.INTEGER,
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          key: 'cnpjId',
        },
        email: {
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
      await queryInterface.dropTable('providers');
    },
  ),
};
