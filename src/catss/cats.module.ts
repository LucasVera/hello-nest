import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

// exports: re-use the same instance of catsService that other modules
// import as well.
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService]
})
export class CatsModule {
  // a module can also inject providers in the constructor
  // modules cannot be injected as providers due to circular-dependency
  constructor(private catsService: CatsService) {}
};
