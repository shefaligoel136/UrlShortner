import { Controller, Get, Post, Body, Param } from '@nestjs/common';

import { ShortUrlService } from './shortUrl.service';

@Controller('shortUrl')
export class ShortUrlController {
  constructor(private readonly shortUrlService: ShortUrlService) {}

  @Post()
  generateShortUrl(@Body('longUrl') longUrl: string) {
    const urlDetails = this.shortUrlService.generateUrl(longUrl);
    return { urlDetails: urlDetails };
  }

  @Get()
  getAllUrls() {
    return this.shortUrlService.getAllUrls();
  }

  @Get(':code')
  getLongUrl(@Param('code') urlCode: string) {
    return this.shortUrlService.getLongUrlFromCode(urlCode);
  }
}
