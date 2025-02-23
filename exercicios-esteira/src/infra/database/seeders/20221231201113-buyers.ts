import { QueryInterface } from 'sequelize';

export default {
  up: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
    async () => {
      await queryInterface.bulkInsert('buyers', [
        {
          name: 'SACADO 001',
          tradingName: 'SACADO 001 LTDA',
          cashforceTax: '0',
          createdAt: '2020-10-29 21:20:33',
          updatedAt: '2020-10-29 21:20:34',
          cnpjId: 1,
          confirm: 1,
        },
      ], {});
    },
  ),

  down: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
    async () => {
      await queryInterface.bulkDelete('buyers', {});
    },
  ),
};
