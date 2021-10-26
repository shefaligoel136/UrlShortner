import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { ShortUrl } from './shortUrl.model';

import { nanoid } from 'nanoid';
import { Model } from 'mongoose';
@Injectable()
export class ShortUrlService {
  private urls: ShortUrl[] = [];

  //  injectModel tells that you want to inject mongoose model
  constructor(
    @InjectModel('ShortUrl') private readonly urlModel: Model<ShortUrl>,
  ) {}

  baseUrl = 'http://localhost:3000';

  async generateUrl(longUrl: string) {
    const code = nanoid();
    const shortUrl = this.baseUrl + '/' + code;

    const newUrl = new this.urlModel({
      longUrl,
      shortUrl,
      code,
    });

    const urlDetails = await newUrl.save();
    console.log(urlDetails);
    return urlDetails;
  }

  async getAllUrls() {
    const allUrlDetails = await this.urlModel.find().exec();
    return allUrlDetails;
  }

  async getLongUrlFromCode(code: string) {
    const longUrl = await this.urlModel.findOne({ code });

    if (!longUrl) {
      throw new NotFoundException('Cannot find url with the given code');
    }

    return longUrl;
  }
}
