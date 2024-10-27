import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [CatModule, DashboardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
