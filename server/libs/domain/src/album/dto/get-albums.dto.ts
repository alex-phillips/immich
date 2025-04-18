import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';
import { toBoolean } from 'apps/immich/src/utils/transform.util';
import { ApiProperty } from '@nestjs/swagger';
import { ValidateUUID } from 'apps/immich/src/decorators/validate-uuid.decorator';

export class GetAlbumsDto {
  @IsOptional()
  @IsBoolean()
  @Transform(toBoolean)
  @ApiProperty()
  /**
   * true: only shared albums
   * false: only non-shared own albums
   * undefined: shared and owned albums
   */
  shared?: boolean;

  /**
   * Only returns albums that contain the asset
   * Ignores the shared parameter
   * undefined: get all albums
   */
  @ValidateUUID({ optional: true })
  assetId?: string;
}
