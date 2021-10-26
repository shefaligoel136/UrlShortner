import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShortUrlModule } from './shortUrls/shortUrl.module';

@Module({
  imports: [ShortUrlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
