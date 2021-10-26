import { Controller, Get, Post, Body, Param } from '@nestjs/common';

import { ShortUrlService } from './shortUrl.service';

@Controller('shortUrl')
export class ShortUrlController {
  constructor(private readonly shortUrlService: ShortUrlService) {}

  @Post()
  async generateShortUrl(@Body('longUrl') longUrl: string) {
    const urlDetails = await this.shortUrlService.generateUrl(longUrl);
    return { urlDetails: urlDetails };
  }

  @Get()
  async getAllUrls() {
    return await this.shortUrlService.getAllUrls();
  }

  @Get(':code')
  async getLongUrl(@Param('code') urlCode: string) {
    return { url: await this.shortUrlService.getLongUrlFromCode(urlCode) };
  }
}
