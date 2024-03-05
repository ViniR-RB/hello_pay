import { Module } from '@nestjs/common';
import CoreModule from 'src/core/core.module';

@Module({
  imports: [CoreModule],
})
export default class UserModule {}
