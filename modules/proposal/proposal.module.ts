import { Module } from '@nestjs/common';
import { ProposalService } from './proposal.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Proposal, ProposalSchema } from 'libs/schema/proposal.schema';
import {
  AssetWhiteListSchema,
  AssetWhitelist,
} from 'libs/schema/asset-whitelist.schema';

@Module({
  providers: [ProposalService],
  imports: [
    MongooseModule.forFeature([
      { name: Proposal.name, schema: ProposalSchema },
      { name: AssetWhitelist.name, schema: AssetWhiteListSchema },
    ]),
  ],
  exports: [ProposalService],
})
export class ProposalModule {}
