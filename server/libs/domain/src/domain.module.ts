import { DynamicModule, Global, Module, ModuleMetadata, OnApplicationShutdown, Provider } from '@nestjs/common';
import { AlbumService } from './album';
import { APIKeyService } from './api-key';
import { AssetService } from './asset';
import { AuthService } from './auth';
import { JobService } from './job';
import { MediaService } from './media';
import { OAuthService } from './oauth';
import { PartnerService } from './partner';
import { SearchService } from './search';
import { ServerInfoService } from './server-info';
import { ShareService } from './share';
import { SmartInfoService } from './smart-info';
import { StorageService } from './storage';
import { StorageTemplateService } from './storage-template';
import { UserService } from './user';
import { INITIAL_SYSTEM_CONFIG, SystemConfigService } from './system-config';

const providers: Provider[] = [
  AlbumService,
  APIKeyService,
  AssetService,
  AuthService,
  JobService,
  MediaService,
  OAuthService,
  PartnerService,
  SearchService,
  ServerInfoService,
  ShareService,
  SmartInfoService,
  StorageService,
  StorageTemplateService,
  SystemConfigService,
  UserService,
  {
    provide: INITIAL_SYSTEM_CONFIG,
    inject: [SystemConfigService],
    useFactory: async (configService: SystemConfigService) => {
      return configService.getConfig();
    },
  },
];

@Global()
@Module({})
export class DomainModule implements OnApplicationShutdown {
  constructor(private searchService: SearchService) {}

  static register(options: Pick<ModuleMetadata, 'imports'>): DynamicModule {
    return {
      module: DomainModule,
      imports: options.imports,
      providers: [...providers],
      exports: [...providers],
    };
  }

  onApplicationShutdown() {
    this.searchService.teardown();
  }
}
