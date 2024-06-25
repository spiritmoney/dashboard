import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Project extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  contractAddress: string;

  @Prop({ required: true })
  type: 'Token' | 'NFT';

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  logoUrl: string;

  @Prop({ required: true })
  bookmarked: boolean;

  @Prop({ required: true })
  symbol: string;

  @Prop({ required: true })
  decimal: number;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
