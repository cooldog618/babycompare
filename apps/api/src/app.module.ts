import { Module } from '@nestjs/common';
import { HealthModule } from './modules/health/health.module';
import { NaverModule } from './modules/naver/naver.module';

@Module({
  imports: [HealthModule, NaverModule]
})
export class AppModule {}
