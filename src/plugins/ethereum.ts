import dotenv from 'dotenv';
import validateEnv from '@utils/validateEnv';
import { ethers, logger, Wallet } from 'ethers';
import { RhadaPay, RhadaPay__factory } from '@/interfaces/typechain';

dotenv.config();
validateEnv();

const { PRIVATE_KEY, INFURA_ENDPOINT, CONTRACT_ADDRESS } = process.env;

export const createWallet = (endpoint: string, privateKey: string): Wallet => {
  const provider = new ethers.providers.JsonRpcProvider(endpoint);
  logger.info(`Successfully connected to ethereum at ${endpoint}`);
  return new ethers.Wallet(privateKey, provider);
}

export const connectToContract = (wallet: Wallet, address: string): RhadaPay => {
  return RhadaPay__factory.connect(address, wallet) 
}

export const wallet = createWallet(INFURA_ENDPOINT, PRIVATE_KEY);
export const contract = connectToContract(wallet, CONTRACT_ADDRESS);
  
