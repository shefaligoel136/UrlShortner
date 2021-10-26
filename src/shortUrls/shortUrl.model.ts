import * as mongoose from 'mongoose';

export const ShortUrlSchema = new mongoose.Schema({
  longUrl: { type: String, required: true },
  shortUrl: { type: String },
  code: { type: String, required: true },
});

export interface ShortUrl extends mongoose.Document {
  id: string;
  longUrl: string;
  shortUrl: string;
  code: string;
}
