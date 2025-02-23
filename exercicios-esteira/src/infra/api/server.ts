import App from './app';
import 'dotenv/config';

const { API_PORT } = process.env;

new App().start(API_PORT || Number(API_PORT));
