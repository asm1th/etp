import { Sequelize } from 'sequelize-typescript'
import { UsrpController } from './usrp.controller';
import { UsrpService } from './usrp.service';
import { Usrp } from './usrp.model';
import { createMemDB } from '../utils/createMemDB';
import { DecimalDataType } from 'sequelize/types';

describe('UsrpController', () => {
  let usrpController: UsrpController;
  let usrpService: UsrpService;
  let mockedSequelize: Sequelize;
  let usrp: Object[];

  beforeAll(async () => {
    // Initiate Sequelize with PostgreSQL and our models
    mockedSequelize = await createMemDB([Usrp]); // KpLink, Samp, Stag, Unit, 
    
    try {
      await mockedSequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }

    // Instantiate our service with our model
    usrpService = new UsrpService(Usrp);
  });

  beforeEach( async () => {
    // All mock data creating inside database
    try {
      usrp = [
        await Usrp.create({
          'kp_unit_guid': '44d9b395b8ae4990bafd754b2ebfdd36',
          'link_id': 'e01d71e5eb0d46ef9a2416577f514072',
          'prices_user': '9149793.13' as unknown as DecimalDataType,
          'usl_quan_unit': 'rub',
          'nsu_menge': '1233.223' as unknown as DecimalDataType,
          'vat_rate': '12',
          'alt_name_unit': 'Somethig',
          'nds_comm': '10%',
        }),
        await Usrp.create({
          'kp_unit_guid': '196e73d4235b4a208e2d9e82d3dbb8a7',
          'link_id': 'f36c61d1ee6041ffbd11ed2e6f9ca073',
          'prices_user': '903634.63' as unknown as DecimalDataType,
          'usl_quan_unit': 'rub',
          'nsu_menge': '759060.224' as unknown as DecimalDataType,
          'vat_rate': '13',
          'alt_name_unit': 'some alt name of unit',
          'nds_comm': '13%',
        })
      ];
    } catch(error) {
      console.log(error)
    }
  });


  describe('GetAllUsrp', () => {
    test('should return an array of usrp', async () => {
      const actual: Object[] = await usrpService.getAllUsrps();
      
      expect(actual.length === 2).toBeTruthy();
      expect(actual.length !== 2).toBeFalsy();
    });
  });

  describe('GetOneUsrp', () => {
    test('should return one object', async () => {
      const actual = await usrpService.getOneUsrp('196e73d4235b4a208e2d9e82d3dbb8a7');
      const assertLink: string = actual.getDataValue('kp_unit_guid') 
  
      expect(assertLink === '196e73d4235b4a208e2d9e82d3dbb8a7').toBeTruthy();
      expect(assertLink === '44d9b395b8ae4990bafd754b2ebfdd36').toBeFalsy();
    })
  });

  describe('UpdateUsrp', () => {
    test('should return the updated object', async () => {
      const expected = {
        'kp_unit_guid': '196e73d4235b4a208e2d9e82d3dbb8a7',
        'link_id': 'f36c61d1ee6041ffbd11ed2e6f9ca073',
        'prices_user': '174389.33',
        'usl_quan_unit': 'rbs',
        'nsu_menge': '16954.334',
        'vat_rate': '20',
        'alt_name_unit': 'Somethings',
        'nds_comm': '20%',
      }
  
  
      const actual = await usrpService.updateUsrp({
        'kp_unit_guid': '196e73d4235b4a208e2d9e82d3dbb8a7',
        'link_id': 'f36c61d1ee6041ffbd11ed2e6f9ca073',
        'prices_user': '174389.33' as unknown as DecimalDataType,
        'usl_quan_unit': 'rbs',
        'nsu_menge': '16954.334' as unknown as DecimalDataType,
        'vat_rate': '20',
        'alt_name_unit': 'Somethings',
        'nds_comm': '20%',
      })
      // console.log(actual.get(), expected)
      expect(actual.get()).toStrictEqual(expected)
    })
  });

  afterEach(async () => {
    // clean out mock data after every test
    await Usrp.destroy({
      where: { kp_unit_guid: '44d9b395b8ae4990bafd754b2ebfdd36' }
    });

    await Usrp.destroy({
      where: { kp_unit_guid: '196e73d4235b4a208e2d9e82d3dbb8a7' }
    });
  });

  afterAll(async () => {
    // close all connections
    await mockedSequelize.close();
  });
});