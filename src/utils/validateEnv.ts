import { cleanEnv, port, str } from 'envalid';

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    PRIVATE_KEY: str(),
    INFURA_ENDPOINT: str()
  });
};

export default validateEnv;
