import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [
  	MongooseModule.forRoot('mongodb://localhost/nestcrud'),
  	UsersModule,
  	CompanyModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
