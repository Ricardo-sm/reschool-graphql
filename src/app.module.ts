import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { RoomModule } from './room/room.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'reschool',
      entities: [join(__dirname, './entity/**/**.{ts,js}')],
      useUnifiedTopology: true,
    }),
    GraphQLModule.forRoot({
      debug: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      installSubscriptionHandlers: true,
      context: ({ req }) => ({ req }),
    }),

    UserModule,
    RoomModule,

    AuthModule,
  ],
})
export class AppModule {}
