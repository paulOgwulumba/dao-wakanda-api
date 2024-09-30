import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddAssetToWhitelistDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  assetId: string;
}

export class RemoveAssetFromWhitelistDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  assetId: string;
}

export class AddAssetsToWhitelistDto {
  @ApiProperty()
  @IsArray({ each: true })
  @IsString({ each: true })
  assetIds: string[];
}

export class RemoveAssetsFromWhitelistDto {
  @ApiProperty()
  @IsArray({ each: true })
  @IsString({ each: true })
  assetIds: string[];
}
