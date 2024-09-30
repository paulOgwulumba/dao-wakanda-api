/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '..', '..', '..', '.env') });

const { env } = process;

console.log('env', env.MONGODB_URI);
console.log('path', path.join(__dirname, '..', '..', '..', '.env'));

export { env };
