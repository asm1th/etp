import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/users.model';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LinkModule } from './link/link.module';
import { SampModule } from './samp/samp.module';
import { StagModule } from './stag/stag.module';
import { UnitModule } from './unit/unit.module';
import { UsrpModule } from './usrp/usrp.module';
import { Route } from './route/route.model';
import { Cost } from './cost/cost.model';
import { Trip } from './trip/trip.model';
import { Value } from './value/value.model';

@Module({
  controllers: [], 
  providers: [],
  imports: [
    SequelizeModule.forFeature([User, Route, Cost, Trip, Value]),
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    
            SequelizeModule.forRoot({
              dialect: 'postgres',
              host: process.env.POSTGRES_HOST,
              port: Number(process.env.POSTGRES_PORT),
              username: process.env.POSTGRES_USER,
              password: process.env.POSTGRES_PASSWORD,
              database: process.env.POSTGRES_DB,
              autoLoadModels: true,
              synchronize: true
            }), 
            UsersModule, AuthModule, LinkModule, SampModule, StagModule, UnitModule, UsrpModule,


  ],
})
export class AppModule {}
