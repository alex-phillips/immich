import {
  IAlbumRepository,
  IAssetRepository,
  ICommunicationRepository,
  ICryptoRepository,
  IGeocodingRepository,
  IJobRepository,
  IKeyRepository,
  IMachineLearningRepository,
  IMediaRepository,
  immichAppConfig,
  IPartnerRepository,
  ISearchRepository,
  ISharedLinkRepository,
  ISmartInfoRepository,
  IStorageRepository,
  ISystemConfigRepository,
  IUserRepository,
  IUserTokenRepository,
} from '@app/domain';
import { BullModule } from '@nestjs/bull';
import { Global, Module, Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunicationGateway } from './communication.gateway';
import { databaseConfig } from './database.config';
import { databaseEntities } from './entities';
import { bullConfig, bullQueues } from './infra.config';
import {
  AlbumRepository,
  APIKeyRepository,
  AssetRepository,
  CommunicationRepository,
  CryptoRepository,
  FilesystemProvider,
  GeocodingRepository,
  JobRepository,
  MachineLearningRepository,
  MediaRepository,
  PartnerRepository,
  SharedLinkRepository,
  SmartInfoRepository,
  SystemConfigRepository,
  TypesenseRepository,
  UserRepository,
  UserTokenRepository,
} from './repositories';

const providers: Provider[] = [
  { provide: IAlbumRepository, useClass: AlbumRepository },
  { provide: IAssetRepository, useClass: AssetRepository },
  { provide: ICommunicationRepository, useClass: CommunicationRepository },
  { provide: ICryptoRepository, useClass: CryptoRepository },
  { provide: IGeocodingRepository, useClass: GeocodingRepository },
  { provide: IJobRepository, useClass: JobRepository },
  { provide: IKeyRepository, useClass: APIKeyRepository },
  { provide: IMachineLearningRepository, useClass: MachineLearningRepository },
  { provide: IMediaRepository, useClass: MediaRepository },
  { provide: IPartnerRepository, useClass: PartnerRepository },
  { provide: ISearchRepository, useClass: TypesenseRepository },
  { provide: ISharedLinkRepository, useClass: SharedLinkRepository },
  { provide: ISmartInfoRepository, useClass: SmartInfoRepository },
  { provide: IStorageRepository, useClass: FilesystemProvider },
  { provide: ISystemConfigRepository, useClass: SystemConfigRepository },
  { provide: IUserRepository, useClass: UserRepository },
  { provide: IUserTokenRepository, useClass: UserTokenRepository },
];

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(immichAppConfig),
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature(databaseEntities),
    BullModule.forRoot(bullConfig),
    BullModule.registerQueue(...bullQueues),
  ],
  providers: [...providers, CommunicationGateway],
  exports: [...providers, BullModule],
})
export class InfraModule {}
