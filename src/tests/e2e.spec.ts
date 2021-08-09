import { EthereumService } from '@/services/ethereum.service';
import { contract } from '@/plugins/ethereum';
import { Job } from '@/interfaces/job.interface';
import { BigNumber } from '@ethersproject/bignumber';


const service = new EthereumService(contract);

describe('E2E tests', () => {
  jest.setTimeout(30_000);

  it('Can setup an event stream', async () => {
    await contract.createEventStream('App Downloads');
  })

  it('Can create a job', async () => {
    const job: Partial<Job> = {
      amount: BigNumber.from(1000),
      refreshRate: BigNumber.from(5),
      eventStreamId: BigNumber.from(0)
    };
    await contract.createJob(job.amount, job.refreshRate, job.eventStreamId);
  })

  it('Can get event Streams', async () => {
    const eventStreams = await contract.getEventStreams();
    console.log('eventStreams');
    console.log(eventStreams);
  });

  it('Can get many jobs', async () => {
    const jobs = await service.fetchAllJobs();
    console.log('jobs');
    console.log(jobs);
  });

  it('Can get a job', async () => {
    const job = await service.getOneJob(3);
    console.log(job);
  });
})