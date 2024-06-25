import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Project } from './schemas/project.schema';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('getProjects')
  async findAll(@Request() req): Promise<any> {
    return this.projectsService.findAll(req.user.address);
  }

  @UseGuards(JwtAuthGuard)
  @Post('createProject')
  async createProject(
    @Request() req,
    @Body() userId: string,
    @Body() projectData: Partial<Project>,
  ): Promise<Project> {
    return this.projectsService.createProject(userId, projectData);
  }

  @Get('token-metadata/:tokenAddress')
  getTokenMetadata(@Param('tokenAddress') tokenAddress: string) {
    return this.projectsService.getTokenMetadata(tokenAddress);
  }

  @Get('nft-metadata/:contractAddress/:tokenId')
  getNftMetadata(
    @Param('contractAddress') contractAddress: string,
    @Param('tokenId') tokenId: string,
  ) {
    return this.projectsService.getNftMetadata(contractAddress, tokenId);
  }
}
