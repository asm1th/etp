import { ModelCtor, Sequelize } from 'sequelize-typescript';

export async function createMemDB(models: ModelCtor[]): Promise<Sequelize> {
  const memDb = new Sequelize({
    dialect: 'postgres',
    host: '192.168.88.150',
    port: 5432,
    username: 'portal',
    password: '@MVPapp',
    database: 'etpgpn',
    logging: false,
    storage: ':memory'
  });
  memDb.addModels(models);

  // Creates the database structure
  await memDb.sync();

  return memDb;
}