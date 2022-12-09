import { UsrpService } from './usrp.service';
import { Usrp } from './usrp.model';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';

const usrpArr = [{
  'kp_usrp_guid': '1934ed00-369c-447b-805d-376092cbce50',
  'kp_unit_guid': '55a69812-ace6-415f-8e9f-c4d78c5d933d',
  'prices_user': '9149793.13',
  'usl_quan_unit': 'rub',
  'nsu_menge': '1233.223',
  'vat_rate': '12',
  'alt_name_unit': 'Somethig',
  'nds_comm': '10%',
},
{
  'kp_usrp_guid': '47f82fc3-61c4-4389-b38c-ad727470d298',
  'kp_unit_guid': '99032b8d-0059-49c4-a679-223ada2d8d1b',
  'prices_user': '903634.63',
  'usl_quan_unit': 'rub',
  'nsu_menge': '759060.224',
  'vat_rate': '13',
  'alt_name_unit': 'some alt name of unit',
  'nds_comm': '13%',
}]

const oneUsrp = {
  'kp_usrp_guid': '1934ed00-369c-447b-805d-376092cbce50',
  'kp_unit_guid': '55a69812-ace6-415f-8e9f-c4d78c5d933d',
  'prices_user': '9149793.13',
  'usl_quan_unit': 'rub',
  'nsu_menge': '1233.223',
  'vat_rate': '12',
  'alt_name_unit': 'Somethig',
  'nds_comm': '10%',
}

describe('UsrpService', () => {
  let service: UsrpService;
  let model: typeof Usrp;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsrpService,
        {
          provide: getModelToken(Usrp),
          useValue: {
            findAll: jest.fn(() => usrpArr),
            findOne: jest.fn(),
            update: jest.fn(() => oneUsrp),
            remove: jest.fn(),
            destroy: jest.fn(() => oneUsrp),
          },
        },
      ],
    }).compile();

    service = module.get<UsrpService>(UsrpService);
    model = module.get<typeof Usrp>(getModelToken(Usrp));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllUsrps()', () => {
    it('should return an array of usrps', async () => {
      const usrps = await service.getAllUsrps();
      expect(usrps).toEqual(usrpArr);
    });
  });

  describe('getOneUsrp()', () => {
    it('should return a single usrp', async () => {
      const findSpy = jest.spyOn(model, 'findOne');
      const kp_unit_guid = '99032b8d-0059-49c4-a679-223ada2d8d1b';

      expect(service.getOneUsrp(kp_unit_guid));
      expect(findSpy).toBeCalledWith({
        where: { kp_unit_guid: kp_unit_guid },
        include: { "all": true, "nested": true }
      });
    });
  });
  
  describe('updateUsrp', () => {
    it('should return the updated object', async () => {
      
      const updatedUsrp = {
        'kp_usrp_guid': '1934ed00-369c-447b-805d-376092cbce50',
        'kp_unit_guid': '55a69812-ace6-415f-8e9f-c4d78c5d933d',
        'prices_user': 2314.13,
        'usl_quan_unit': 'am',
        'nsu_menge': 12353.645,
        'vat_rate': '10',
        'alt_name_unit': 'some unit alt',
        'nds_comm': '20%',
      };
      
      const findSpy = jest.spyOn(model, 'findOne').mockReturnValue({
        update: jest.fn(() => updatedUsrp),
      } as any);

      const kp_unit_guid = '55a69812-ace6-415f-8e9f-c4d78c5d933d';
      const kp_usrp_guid = '1934ed00-369c-447b-805d-376092cbce50';
      // expect(findSpy).toBeCalledWith({ where: { kp_unit_guid: kp_unit_guid } });

      const retVal = await service.updateUsrp(updatedUsrp);
      expect(findSpy).toBeCalledWith({
        where: {
          kp_unit_guid: kp_unit_guid,
          kp_usrp_guid: kp_usrp_guid
        }
      });
      expect(retVal).toStrictEqual(updatedUsrp);
    })
  })
});