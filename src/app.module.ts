import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { CompanyModule } from './company/company.module';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';

@Module({
  imports: [
  	MongooseModule.forRoot('mongodb://localhost/nestcrud', {
      connectionFactory: (connection) => {
        connection.plugin(softDeletePlugin);
        return connection;
      }
    }),
  	UsersModule,
  	CompanyModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
