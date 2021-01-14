const { dev, prod } = require('./config.json');

export interface Config {
    PORT?: number;
    mongoString?: string;
    corsOrigin?: any;
}
const config: Config = process.env.NODE_ENV === 'production' ? prod : dev;

export default config;
