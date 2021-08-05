import { Wallet } from "@ethersproject/wallet";

export class EthereumService {
  public async sendWei({ wallet, to, value }: { wallet: Wallet, to: string, value: number }) {
    return await wallet.sendTransaction({
      to, value
    })
  }
}