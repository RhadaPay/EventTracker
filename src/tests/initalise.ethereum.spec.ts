import { wallet } from "@/plugins/ethereum";

describe('Testing the connection to the ethereum networks', () => {
  const timeout = 0;
  jest.setTimeout(timeout);

  it('Can send a test call request to the network', async () => {
    const blockNumber = await wallet.provider.getBlockNumber();
    console.log(`Current block is ${blockNumber}`);
    expect(blockNumber).toBeGreaterThan(0);
  });

  it('Connects the wallet', async () => {
    const address = await wallet.getAddress();
    console.log(`Address is ${address}`);
    expect(address).toBeTruthy();
  });

  it('Can sign a transaction', async () => {
    // address taken from ethers.js docs
    const signedTxHash = await wallet.signTransaction({
      to: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
      value: 1
    })
    console.log(`Signed TX is ${signedTxHash}`);
    expect(signedTxHash).toBeTruthy();
  })

  afterAll(async () => {
    // avoid jest open handle error
    await new Promise(
      resolve => setTimeout(() => resolve({}), timeout)
    );
  });
})