import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
    async () => {
      await queryInterface.createTable('users', {
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
        email: {
          allowNull: false,
          type: DataTypes.STRING,
          unique: true,
        },
        phoneNumber: {
          defaultValue: null,
          type: DataTypes.STRING,
        },
        mobile: {
          defaultValue: null,
          type: DataTypes.STRING,
        },
        departament: {
          defaultValue: null,
          type: DataTypes.STRING,
        },
        verificationCode: {
          defaultValue: null,
          type: DataTypes.STRING,
        },
        emailChecked: {
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
        cashforceAdm: {
          defaultValue: 0,
          type: DataTypes.TINYINT,
        },
      }, {
        charset: 'latin1',
      });
    },
  ),

  down: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
    async () => {
      await queryInterface.dropTable('users');
    },
  ),
};
