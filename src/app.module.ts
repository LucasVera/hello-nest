import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './catss/cats.controller';
import { CatsService } from './catss/cats.service';
import { CatsModule } from './catss/cats.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { LoggerMiddleware } from './middleware/logger.middleware'

@Module({
  imports: [CatsModule, ConfigurationModule],
  controllers: [AppController, CatsController],
  providers: [AppService, CatsService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'cats', method: RequestMethod.ALL });
  }
}
