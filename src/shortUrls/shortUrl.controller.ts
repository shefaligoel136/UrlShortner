import { Controller, Get, Post, Body, Param, Res } from '@nestjs/common';

import { Response } from 'express';

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
  async getLongUrl(@Param('code') urlCode: string, @Res() res: Response) {
    const url = await this.shortUrlService.getLongUrlFromCode(urlCode);
    res.redirect(url);
    // return { url: url };
  }
}
