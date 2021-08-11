import { Event } from "@/interfaces/events.interface";
import { Job, JobWId } from "@/interfaces/job.interface";
import { RhadaPay } from "@/interfaces/typechain";
import { Database } from "@/plugins/database";
import { Wallet } from "@ethersproject/wallet";


export class EthereumService {
  constructor (public contract: RhadaPay) {} 

  public async sendWei({ wallet, to, value }: { wallet: Wallet, to: string, value: number }) {
    return await wallet.sendTransaction({
      to, value
    })
  }

  public async ingestEvent(db: Database, event: Event): Promise<void> {
    /**
     * Runs a series of tasks to take the event, parse the eventStreamId and then
     * see if we need to refresh the payment stream. Does this by:
     * 1. Getting all jobs
     * 2. Filtering the jobs to the current event stream **PRESERVING THE JOBID**
     * 3. Getting the number of events in the stream
     * 4. Comparing the total events to the refresh rate
     * @param db global database object (ThreadDB)
     * @param event the newly added event 
    **/

    const { eventStreamId } = event;
    const jobs = await this.fetchAllJobs();
    const jobsByEventsStream = this.filterJobsByEventStream(eventStreamId, jobs);
    let eventsByStream = await db.getEventsByStream(eventStreamId);

    this.addMockEventsIfNoneExist(db, eventStreamId, eventsByStream);
    this.printReport(jobsByEventsStream, eventStreamId, eventsByStream);
    await this.updateFlowIfRefreshRateExceeded(jobsByEventsStream, eventsByStream);
  };

  private async addMockEventsIfNoneExist (db: Database, eventStreamId: number, eventsByStream: Event[]) {
    if (eventsByStream.length === 0) {
      await db.client.create(db.thread, db.params.names.collection, this.mockEvents(20));
      eventsByStream = await db.getEventsByStream(eventStreamId);
    };
  }

  private printReport (jobs: JobWId[], eventStreamId: number, eventsByStream: Event[]) {
    jobs.forEach((job: JobWId) => {
      console.log(
        `
        Number of Events in stream ${eventStreamId}: ${eventsByStream.length}
        Job ${job.id}:
        --------------
        ${job.details}
        --------------
        Event Stream for job ${job.id}`, job.details.eventStreamId.toNumber())
      }
    );
  };

  public async updateFlowIfRefreshRateExceeded (jobs: JobWId[], events: Event[]): Promise<void> {
    jobs.forEach(job => {
      if(this.refreshNeeded(job.details, events)) {
        this.sendStreamAdjustment(job.id, events.length);
      } else {
        console.log('Refresh not needed');
      }
    })
  }

  public async fetchAllJobs(): Promise<Job[] | []> {
    const jobs: Job[] = [];
    const jobsLength = (await this.contract.getJobs()).length;
    for (let j = 0; j < jobsLength; j++) {
      const job = await this.contract.jobs(j) as unknown as Job;
      jobs.push(job);
    }
    return jobs;
  }

  public async getOneJob(jobId: number): Promise<Job | undefined> {
    return await this.contract.jobs(jobId);
  };


  public filterJobsByEventStream (eventStreamId: number, jobs: Job[]): JobWId[] | [] {
    /**
     * @param eventStreamId: numerical value of the event stream
     * @param jobs: array of jobs from contract
     * This method filters the list of jobs to only those revelant to the current event stream
     * Importantly, we need to attach the jobid, as the position in the filtered array will no
     * longer necessarily be the same as the global ID
     * @returns an array in the format { id: number, details: Job }
    **/
    const jobsWithIds: JobWId[] = [];
    jobs.map((job, id) => jobsWithIds.push({ id, details: job }));
    const filteredJobs = jobsWithIds.filter(record => record.details.eventStreamId.toNumber() === eventStreamId);
    return filteredJobs;
  }

  public getEventsByStream(eventStreamId: number, events: Event[]): Event[] | [] {
    return events.filter(event => event.eventStreamId === eventStreamId);
  }

  public mockEvents(nEvents: number): Event[] {
    const events = [] as Event[];
    for (let i = 0; i < nEvents; i++) {
      events.push({
        eventStreamId: (i % 2 === 0) ? 0 : 1,
      })
    }
    return events
  }

  public refreshNeeded (job: Job, events: Event[]): boolean {
    /**
      * Check the event stream to determine if we need to adjust the
      * payment flow, based on the number of events recorded.
      * If the total number of new events > refresh rate, we need
      * to perform a refresh
    **/
    const refreshRate = job.refreshRate.toNumber();
    const eventsRecorded = job.eventsRecorded.toNumber();
    const newEvents = events.length - eventsRecorded;
    console.log(`
      refresh rate: ${refreshRate}
      events recorded: ${eventsRecorded}
      newEvents: ${newEvents}
    `);

    return newEvents > refreshRate;
  }

  public async sendStreamAdjustment (jobId: number, numberOfEvents: number): Promise<void> {
    console.log(`Sent stream adjustment for job ${jobId} with number of events ${numberOfEvents}`);
    // this.contract.increaseCashflowAllowance(jobId, numberOfEvents) 
  }

}