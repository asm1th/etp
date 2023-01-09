// import { KpLinkController } from './link.controller';
// import { KpLinkService } from './link.service';
// import { Sequelize } from 'sequelize-typescript'
// import { KpLink } from './link.model';
// import { Samp } from '../samp/samp.model';
// import { Stag } from '../stag/stag.model';
// import { Unit } from '../unit/unit.model';
// import { Usrp } from '../usrp/usrp.model';
// import { createMemDB } from '../utils/createMemDB';
// import { DateOnlyDataType, DecimalDataType } from 'sequelize/types';

// describe('LinksController', () => {
//   let linkController: KpLinkController;
//   let linkService: KpLinkService;
//   let mockedSequelize: Sequelize;
//   let link: Object[];

//   beforeAll(async () => {
//     // Initiate Sequelize with PostgreSQL and our models
//     mockedSequelize = await createMemDB([KpLink, Samp, Stag, Unit, Usrp]);
    
//     try {
//       await mockedSequelize.authenticate();
//       console.log('Connection has been established successfully.');
//     } catch (error) {
//       console.error('Unable to connect to the database:', error);
//     }

//     // Instantiate our service with our model
//     linkService = new KpLinkService(KpLink);
//   });

//   beforeEach( async () => {
//     // All mock data creating inside database
//     link = [
//       await KpLink.create({
//         link: 'test link',
//         kp_sample_guid: '086d1a1f-8191-4a0d-b349-633e5f92c5e2',
//         info_ka_email: 'example@gazprom-neft.ru',
//         info_ka_name: 'information field',
//         travel_exp_comm: 'travel exp comm field'
//       }),
//       await KpLink.create({
//         link: 'second object of link',
//         kp_sample_guid: '72e018d7-c3df-4d0e-ab30-d2a10cd2acb6',
//         info_ka_email: 'someuser@gazprom-neft.ru',
//         info_ka_name: 'field for present information',
//         travel_exp_comm: 'travel exp field'
//       })
//     ];
//   });

//   describe('GetAllLinks', () => {
//     test('should return an array of links', async () => {
//       const actual: Object[] = await linkService.getAllLinks();
      
//       expect(actual.length === 2).toBeTruthy();
//       expect(actual.length !== 2).toBeFalsy();
//     });
//   });

//   describe('GetOneLink', () => {
//     test('should return one object', async () => {
//       const expected = {
//         link: 'test link',
//         kp_sample_guid: '086d1a1f-8191-4a0d-b349-633e5f92c5e2',
//         info_ka_email: 'example@gazprom-neft.ru',
//         info_ka_name: 'information field',
//         travel_exp_comm: 'travel exp comm field'
//       };
//       const actual = await linkService.getOneLink('test link');
//       const assertLink: string = actual.getDataValue('link');
  
//       expect(assertLink === 'test link').toBeTruthy();
//       expect(assertLink === 'second object').toBeFalsy();
//     })
//   });

//   describe('UpdateLink', () => {
//     test('should return the updated object', async () => {
//       const expected = {
//         'link': 'test link',
//         'kp_offer_expire_date': '2022-10-13',
//         'travel_exp': '12412.04',
//         'travel_exp_comm': 'updated travel comm',
//         "info_ka_email": "example@gazprom-neft.ru",
//         "info_ka_name": "information field",
//       };

//       const actual = await linkService.updateLink({
//         'link': 'test link',
//         'kp_offer_expire_date': '2022-10-13' as unknown as DateOnlyDataType,
//         'travel_exp': '12412.04' as unknown as DecimalDataType,
//         'travel_exp_comm': 'updated travel comm',
//       });

//       expect(actual.get()).toStrictEqual(expected)
//     })
//   });

//   afterEach(async () => {
//     // clean out mock data after every test
//     await KpLink.destroy({
//       where: { link: 'test link' }
//     });

//     await KpLink.destroy({
//       where: { link: 'second object of link' }
//     });
//   });

//   afterAll(async () => {
//     // close all connections
//     await mockedSequelize.close();
//   });
// });