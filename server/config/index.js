/* eslint-disable max-len */
import dotenv from 'dotenv';

dotenv.config();

const config = {
  MONGODB_DATABASE: process.env.DB_URL_Live,
  DB_TEST: process.env.DB_URL_TEST,
  secretOrKey: process.env.JWT_TOKEN_SECRET,
  api_key: process.env.API_KEY,
  Admin_base_url: process.env.ADMIN_BASE_URL,
  Event_base_url: process.env.EVENT_BASE_URL,
  Event_api: process.env.EVENT_API_KEY,
  cloudinary_name: process.env.CLOUDINARY_NAME,
  cloudinary_key: process.env.CLOUDINARY_KEY,
  cloudinary_secret: process.env.CLOUDINARY_SECRET
};

export default config;
