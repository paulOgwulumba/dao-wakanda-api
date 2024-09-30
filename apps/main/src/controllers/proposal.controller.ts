import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  AddAssetToWhitelistDto,
  AddAssetsToWhitelistDto,
  RemoveAssetFromWhitelistDto,
  RemoveAssetsFromWhitelistDto,
} from 'libs/dto';
import { AdminJwtAuthGuard } from 'libs/guards/jwt/admin-jwt-auth.guard';
import { ProposalService } from 'modules/proposal/proposal.service';

@ApiTags('Proposals Manager')
@Controller('proposal')
export class ProposalController {
  constructor(private readonly proposalService: ProposalService) {}

  @ApiOperation({ summary: 'Get Whitelisted ASA ID' })
  @ApiBearerAuth('Bearer')
  @ApiResponse({ type: Array<String> })
  @UseGuards(AdminJwtAuthGuard)
  @Get('asset-whitelist')
  getWhitelistedAssets() {
    return this.proposalService.getAllWhitelist();
  }

  @ApiOperation({ summary: 'Whitelist ASA ID' })
  @ApiBearerAuth('Bearer')
  @ApiBody({ type: AddAssetToWhitelistDto })
  @UseGuards(AdminJwtAuthGuard)
  @Post('asset-whitelist')
  whitelistAsset(@Body() dto: AddAssetToWhitelistDto) {
    return this.proposalService.addAssetToWhitelist(dto.assetId);
  }

  @ApiOperation({ summary: 'Remove ASA ID from Whitelist' })
  @ApiBearerAuth('Bearer')
  @ApiBody({ type: RemoveAssetFromWhitelistDto })
  @UseGuards(AdminJwtAuthGuard)
  @Delete('asset-whitelist')
  removeAssetFromWhitelist(@Body() dto: RemoveAssetFromWhitelistDto) {
    return this.proposalService.removeAssetFromWhitelist(dto.assetId);
  }

  @ApiOperation({ summary: 'Whitelist batch of ASA IDs' })
  @ApiBearerAuth('Bearer')
  @ApiBody({ type: AddAssetsToWhitelistDto })
  @UseGuards(AdminJwtAuthGuard)
  @Post('asset-whitelist/many')
  whitelistAssets(@Body() dto: AddAssetsToWhitelistDto) {
    return this.proposalService.batchUploadAssetsToWhiteList(dto.assetIds);
  }

  @ApiOperation({ summary: 'Batch delete Whitelisted ASA IDs' })
  @ApiBearerAuth('Bearer')
  @ApiBody({ type: RemoveAssetsFromWhitelistDto })
  @UseGuards(AdminJwtAuthGuard)
  @Delete('asset-whitelist/many')
  removeWhitelistedAssets(@Body() dto: RemoveAssetsFromWhitelistDto) {
    return this.proposalService.batchDeleteAssetsFromWhiteList(dto.assetIds);
  }
}
