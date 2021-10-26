import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ShortUrlController } from './shortUrl.controller';
import { ShortUrlSchema } from './shortUrl.model';
import { ShortUrlService } from './shortUrl.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'ShortUrl', schema: ShortUrlSchema }]),
  ], // makes the model and makes it injectable
  controllers: [ShortUrlController],
  providers: [ShortUrlService],
})
export class ShortUrlModule {}
