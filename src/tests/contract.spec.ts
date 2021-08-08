import { contract } from "@/plugins/ethereum";

describe('Testing interactions with the deployed rhada contract', () => {
  jest.setTimeout(30_000);

  it('Makes a call to the deployed contract', async () => {
    const addr = contract.address;
    expect(addr).toEqual(process.env.CONTRACT_ADDRESS);
  })

  it('gets the list of jobs', async () => {
    const jobs = await contract.getJobs();
    console.log(jobs);
  })

  afterAll(async () => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 0));
  });
})
