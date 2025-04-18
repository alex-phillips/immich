import { AlbumEntity, AssetEntity, SharedLinkType } from '@app/infra/entities';

export class CreateSharedLinkDto {
  description?: string;
  expiresAt?: string;
  type!: SharedLinkType;
  assets!: AssetEntity[];
  album?: AlbumEntity;
  allowUpload?: boolean;
  allowDownload?: boolean;
  showExif?: boolean;
}
