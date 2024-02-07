import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs/promises';
import { PhotosLinkDto } from './app.controller';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getPhotosLink(): Promise<PhotosLinkDto> {
    try {
      const link = await fs.readFile(process.env.PHOTO_LINK_FILE_LOCATION, 'utf-8');

      return { link };
    } catch (e) {
      throw new NotFoundException();
    }
  }

  async createPhotosLink(link: string): Promise<void> {
    await fs.writeFile(process.env.PHOTO_LINK_FILE_LOCATION, link, 'utf-8');
  }
}
