import { Module } from '@nestjs/common';
import { MainService } from '../../../modules/main/main.service';
import { MainController } from './controllers/main.controller';

@Module({
  imports: [],
  controllers: [MainController],
  providers: [MainService],
})
export class MainModule {}
