import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShortUrlModule } from './shortUrls/shortUrl.module';

@Module({
  imports: [
    ShortUrlModule,
    MongooseModule.forRoot('mongodb://localhost/shortURL'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
