/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/camelcase */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        'users',
        {
          user_id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          email: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          is_active: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true,
          },
          sys1: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          sys2: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
          },
          sys3: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          sys4: {
            type: Sequelize.NUMBER,
            allowNull: true,
          },
          sys5: {
            type: Sequelize.NUMBER,
            allowNull: true,
          },
          created_at: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updated_at: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          version: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
          },
        },
        { transaction },
      );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  down: async queryInterface => {
    await queryInterface.dropAllTables();
  },
};
