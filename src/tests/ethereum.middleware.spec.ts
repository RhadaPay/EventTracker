import App from "@/app";

describe('Testing the connection to the ethereum networks', () => {
  const app = new App([]);
  const timeout = 0;
  jest.setTimeout(timeout);

  it('Can send a test call request to the network', async () => {
    const blockNumber = await app.provider.getBlockNumber();
    console.log(`Current block is ${blockNumber}`);
    expect(blockNumber).toBeGreaterThan(0);
  });

  it('Connects the wallet', async () => {
    const address = await app.wallet.getAddress();
    console.log(`Address is ${address}`);
    expect(address).toBeTruthy();
  });

  it('Can sign a transaction', async () => {
    // address taken from ethers.js docs
    const signedTxHash = await app.wallet.signTransaction({
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