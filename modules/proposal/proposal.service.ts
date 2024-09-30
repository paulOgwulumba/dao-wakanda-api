import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  AssetWhitelist,
  AssetWhitelistDocument,
} from 'libs/schema/asset-whitelist.schema';
import { Proposal, ProposalDocument } from 'libs/schema/proposal.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProposalService {
  constructor(
    @InjectModel(Proposal.name) private proposalModel: Model<ProposalDocument>,
    @InjectModel(AssetWhitelist.name)
    private assetWhitelistModel: Model<AssetWhitelistDocument>
  ) {}

  async addAssetToWhitelist(assetId: string) {
    const existingAsset = await this.assetWhitelistModel.findOne({ assetId });

    if (existingAsset) {
      throw new ForbiddenException('This asset has already been whitelisted');
    }

    const asset = new this.assetWhitelistModel({
      assetId,
    });

    await asset.save();
    return this.getAllWhitelist();
  }

  async removeAssetFromWhitelist(assetId: string) {
    const existingAsset = await this.assetWhitelistModel.findOne({ assetId });

    if (!existingAsset) {
      throw new ForbiddenException(
        'No asset with the given ID exists in the whitelist.'
      );
    }

    await this.assetWhitelistModel.deleteOne({ assetId });

    return this.getAllWhitelist();
  }

  async getAllWhitelist() {
    const data = await this.assetWhitelistModel.find({});

    const flattenedData = data.map((whitelist) => whitelist.assetId);
    const set = new Set(flattenedData);

    return Array.from(set);
  }

  async batchUploadAssetsToWhiteList(assetIds: string[]) {
    const existingAssetIds = await this.getAllWhitelist();
    const assetIdsToUpload = assetIds.filter(
      (asset) => !existingAssetIds.includes(asset)
    );
    const assets = Array.from(new Set(assetIdsToUpload)).map((asset) => ({
      assetId: asset,
    }));

    await this.assetWhitelistModel.insertMany(assets);

    return this.getAllWhitelist();
  }

  async batchDeleteAssetsFromWhiteList(assetIds: string[]) {
    const existingAssetIds = await this.getAllWhitelist();
    const assetIdsToDelete = assetIds.filter((asset) =>
      existingAssetIds.includes(asset)
    );
    await this.assetWhitelistModel.deleteMany({
      assetId: { $in: assetIdsToDelete },
    });

    return this.getAllWhitelist();
  }
}
