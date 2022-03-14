import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { UsersSchema } from './schema/users.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from '../../core/guard/jwt.strategy';
import { UsersController } from './users.controller';
@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: 'Users', schema: UsersSchema }]),
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRATION_TIME')
        }
      }),
    }),
  ],
  providers: [
    UsersService, 
    UsersResolver, 
    JwtStrategy,
  ],
  controllers: [UsersController]
})
export class UsersModule {}
