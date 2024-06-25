import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from './schemas/project.schema';
import { User } from '../auth/schemas/user.schema';
import { Alchemy, Network } from 'alchemy-sdk';

@Injectable()
export class ProjectsService {
  private alchemy: Alchemy;

  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {
    const settings = {
      apiKey: process.env.ALCHEMY_API_KEY,
      network: Network.ETH_MAINNET,
    };
    this.alchemy = new Alchemy(settings);
  }

  async findAll(userId: string): Promise<Project[]> {
    return this.projectModel.find({ userId }).sort({ bookmarked: -1 }).exec();
  }

  async createProject(
    userId: string,
    projectData: Partial<Project>,
  ): Promise<Project> {
    const project = new this.projectModel({ ...projectData, userId });
    return project.save();
  }

  async getTokenMetadata(tokenAddress: string) {
    console.log('Fetching token metadata for address:', tokenAddress);
    const metadata = await this.alchemy.core.getTokenMetadata(tokenAddress);
    console.log('Token Metadata:');
    console.log(metadata);
    return metadata;
  }

  async getNftMetadata(contractAddress: string, tokenId: string) {
    console.log('fetching metadata for a NFT...');
    const response = await this.alchemy.nft.getNftMetadata(
      contractAddress,
      tokenId,
    );
    console.log(response);
    return response;
  }
}
