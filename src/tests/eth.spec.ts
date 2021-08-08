import { EthereumService } from '@/services/ethereum.service';
import { contract } from '@/plugins/ethereum';
import { BigNumber } from 'ethers';
import { Job } from '@/interfaces/job.interface';
import { Event } from '@/interfaces/events.interface';

const mockJobList: Job[] = [
  {
    // no events recorded, should not refresh with 10 events
    creator: '0xd82673a66b554A73261A2345C3E63323588591e7',
    amount: BigNumber.from(1000),
    refreshRate: BigNumber.from(15),
    eventsRecorded: BigNumber.from(0),
    creatorSigned: false,
    applicantSigned: false,
    workSubmitted: false,
    state: 3,
    eventStreamId: BigNumber.from(0),
  },
  {
    // no events recorded, should refresh with 10 events
    creator: '0xd82673a66b554A73261A2345C3E63323588591e7',
    amount: BigNumber.from(1000),
    refreshRate: BigNumber.from(8),
    eventsRecorded: BigNumber.from(0),
    creatorSigned: false,
    applicantSigned: false,
    workSubmitted: false,
    state: 3,
    eventStreamId: BigNumber.from(0),
  },
  {
    // events recorded, should not refresh with 10 events as has already refreshed
    creator: '0xd82673a66b554A73261A2345C3E63323588591e7',
    amount: BigNumber.from(1000),
    refreshRate: BigNumber.from(8),
    eventsRecorded: BigNumber.from(5),
    creatorSigned: false,
    applicantSigned: false,
    workSubmitted: false,
    state: 3,
    eventStreamId: BigNumber.from(1),
  },
  {
    // events recorded, previously refreshed and shoud a second time
    creator: '0xd82673a66b554A73261A2345C3E63323588591e7',
    amount: BigNumber.from(1000),
    refreshRate: BigNumber.from(4),
    eventsRecorded: BigNumber.from(4),
    creatorSigned: false,
    applicantSigned: false,
    workSubmitted: false,
    state: 3,
    eventStreamId: BigNumber.from(1),
  },       
]

const service = new EthereumService(contract);

const mockEventList: Event[] = service.mockEvents(20)

const mockJobs = jest.fn().mockReturnValue(mockJobList);
const mockJob = jest.fn().mockReturnValue(mockJobList[0]);
const mockEvents = jest.fn().mockReturnValue(mockEventList);

jest.mock('../plugins/ethereum', () => {
  return {
      contract: {
        jobs: (jobID: number) => mockJob(),
        getJobs: () => mockJobs()
      }
    }
  }
);

describe('Testing logic in the ethereum service', () => {
    
  it('Mocks a single Job', async () => {
    await service.getOneJob(0);
    expect(mockJob).toHaveBeenCalled();
  })

  it('Filters jobs by event streams', () => {
    const eventStream = {
      id: 1,
      expectedJobs: 2
    }
    const jobs = service.filterJobsByEventStream(eventStream.id, mockJobList);
    expect(jobs.length).toEqual(eventStream.expectedJobs);
  })

  it('Gets events by stream', async () => {
    const eventStreamId = 0;
    const filteredEvents = service.filterJobsByEventStream(eventStreamId, mockJobList)
    expect(filteredEvents.length).toEqual(2); 
  })

  const testCases: [number, boolean, Job][] = [
    [0, false, mockJobList[0]],
    [1, true, mockJobList[1]],
    [2, false, mockJobList[2]],
    [3, true, mockJobList[3]],
  ]
  test.each(testCases)(
    'Correctly calculates whether a refresh is needed case: %i, expected outcome: %s',
    (idx, condition, job) => {
      const events = service.getEventsByStream(job.eventStreamId.toNumber(), mockEventList); 
      expect(service.refreshNeeded(job, events)).toEqual(condition)
    }
  );
  
  it('Updates the flow if the refresh condition is met', async () => {})

  it('Does not update the flow if the refesh condition is not met', async () => {})

  it('Combines all functions into a correct execution', async () => {})

})
