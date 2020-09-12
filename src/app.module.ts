import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'reschool',
      entities: [join(__dirname, './entity/**/**.{ts,js}')],
      synchronize: true,
      useUnifiedTopology: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      installSubscriptionHandlers: true,
      context: ({ req }) => ({ req }),
    }),

    UserModule,

    AuthModule,
  ],
})
export class AppModule {}
