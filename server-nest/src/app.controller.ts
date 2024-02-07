import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { ApiOkResponse, ApiProperty, ApiSecurity } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PhotosLinkDto {
  @IsNotEmpty()
  @ApiProperty()
  link: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('photoslink')
  getPhotosLink(): Promise<PhotosLinkDto> {
    return this.appService.getPhotosLink();
  }

  @ApiSecurity('API_KEY')
  @Post('photoslink')
  @ApiOkResponse({ status: 201 })
  @UseGuards(AuthGuard)
  createPhotosLink(@Body() dto: PhotosLinkDto): Promise<void> {
    return this.appService.createPhotosLink(dto.link);
  }
}
