import { Injectable, NotFoundException } from '@nestjs/common';
import { ShortUrl } from './shortUrl.model';

import { nanoid } from 'nanoid';
@Injectable()
export class ShortUrlService {
  private urls: ShortUrl[] = [];

  baseUrl = 'http://localhost:3000';

  generateUrl(longUrl: string) {
    const urlId = Math.random().toString();
    const urlCode = nanoid();
    const shortUrl = this.baseUrl + '/' + urlCode;

    const newUrl = new ShortUrl(urlId, longUrl, shortUrl, urlCode);
    this.urls.push(newUrl);
    return newUrl;
  }

  getAllUrls() {
    return [...this.urls];
  }

  getLongUrlFromCode(urlCode: string) {
    const urlCodeIndex = this.urls.findIndex((url) => url.code === urlCode);
    console.log('code', urlCodeIndex);
    if (urlCodeIndex === -1) {
      throw new NotFoundException('Invalid code');
    }
    const longUrl = this.urls[urlCodeIndex].longUrl;
    return longUrl;
  }
}
