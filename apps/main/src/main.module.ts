import { Module } from '@nestjs/common';
import { MainService } from '../../../modules/main/main.service';
import { MainController } from './controllers/main.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from 'libs/utils/env';

@Module({
  imports: [MongooseModule.forRoot(env.MONGODB_URI, {})],
  controllers: [MainController],
  providers: [MainService],
})
export class MainModule {}
