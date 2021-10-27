import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { ShortUrl } from './shortUrl.model';

import { nanoid } from 'nanoid';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class ShortUrlService {
  //  injectModel tells that you want to inject mongoose model
  constructor(
    @InjectModel('ShortUrl') private readonly urlModel: Model<ShortUrl>,
    private readonly configService: ConfigService,
  ) {}

  baseUrl = this.configService.get('base_url');

  async generateUrl(longUrl: string) {
    const code = nanoid();
    const shortUrl = this.baseUrl + '/' + code;

    const doesExists = await this.urlModel.findOne({ longUrl });

    if (doesExists) {
      return this.baseUrl + '/' + doesExists.code;
    }

    const newUrl = new this.urlModel({
      longUrl,
      code,
    });

    await newUrl.save();
    return shortUrl;
  }

  async getAllUrls() {
    const allUrlDetails = await this.urlModel.find().limit(10).exec();
    return allUrlDetails;
  }

  async getLongUrlFromCode(code: string) {
    const urlDetails = await this.urlModel.findOne({ code });

    if (!urlDetails) {
      throw new NotFoundException('Cannot find url with the given code');
    }

    return urlDetails.longUrl;
  }
}
