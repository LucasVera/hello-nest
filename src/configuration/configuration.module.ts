import { Module, Global } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';

// Using the 'Global' decorator, we tell nest to add the providers globally to all
// modules. Should only be used once. Only a good practice for specific,
// reusable stuff. But the 'imports' array should be preferred in most cases
@Global()
@Module({
  providers: [ConfigurationService]
})
export class ConfigurationModule {}
