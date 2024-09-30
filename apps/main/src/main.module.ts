import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from 'libs/utils/env';
import { AuthService } from 'modules/auth/auth.service';
import { AuthController } from './controllers/auth.controller';
import { AuthModule } from 'modules/auth/auth.module';
import { AdminModule } from 'modules/admin/admin.module';

@Module({
  imports: [
    MongooseModule.forRoot(env.MONGODB_URI, { dbName: 'test' }),
    AuthModule,
    AdminModule,
  ],
  controllers: [AuthController],
  providers: [],
})
export class MainModule {}
