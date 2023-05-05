import { Injectable } from '@nestjs/common';

import { BlockDto } from './dto/Block.dto';
import { DBConnectionService } from 'src/db_connection/db_connection.service';

@Injectable()
export class BlockService {
  constructor(private readonly dbConnectService: DBConnectionService) {}
  async createBlock(block: BlockDto) {
    const ret = await this.dbConnectService.createBlock(block);

    return ret ? ret[0]['insertId'] : false;
  }

  async readBlocks(projectId: string) {
    return await this.dbConnectService.readBlocks(projectId);
  }

  async updateBlock(block: BlockDto) {
    const ret = await this.dbConnectService.updateBlock(block);
    return ret ? true : false;
  }

  async deleteBlock(blockId: string) {
    const ret = await this.dbConnectService.deleteBlock(blockId);
    return ret ? true : false;
  }

  async readBlock(blockId: string) {
    return await this.dbConnectService.readBlock(blockId);
  }
}