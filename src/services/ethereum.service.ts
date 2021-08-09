import { Event } from "@/interfaces/events.interface";
import { Job } from "@/interfaces/job.interface";
import { RhadaPay } from "@/interfaces/typechain";
import { Wallet } from "@ethersproject/wallet";

export class EthereumService {
  constructor (public contract: RhadaPay) {} 

  public async sendWei({ wallet, to, value }: { wallet: Wallet, to: string, value: number }) {
    return await wallet.sendTransaction({
      to, value
    })
  }

  public async ingestEvent(event: Event): Promise<void> {
    // ingest the event then run background jobs
    const { eventStreamId } = event;
    const events = this.mockEvents(20);

    const jobs = await this.fetchAllJobs();
    const jobsByEventsStream = this.filterJobsByEventStream(eventStreamId, jobs);
    const eventsByStream = this.getEventsByStream(eventStreamId, events);

    this.updateFlowIfRefreshRate(jobsByEventsStream, eventsByStream);
  }

  public async updateFlowIfRefreshRate (jobs: Job[], events: Event[]): Promise<void> {
    jobs.forEach(job => {
      if(this.refreshNeeded(job, events)) this.sendStreamAdjustment(job);
    })
  }

  public async fetchAllJobs(): Promise<Job[] | []> {
    return await this.contract.getJobs();
  }

  public async getOneJob(jobId: number): Promise<Job | undefined> {
    return await this.contract.jobs(jobId);
  }

  public filterJobsByEventStream (eventStreamId: number, jobs: Job[]): Job[] | [] {
    return jobs.filter(job => job.eventStreamId.toNumber() === eventStreamId);
  }

  public getEventsByStream(eventStreamId: number, events: Event[]): Event[] | [] {
    return events.filter(event => event.eventStreamId === eventStreamId);
  }

  public mockEvents(nEvents: number): Event[] {
    const events = [] as Event[];
    for (let i = 0; i < nEvents; i++) {
      events.push({
        id: i,
        eventStreamId: (i % 2 === 0) ? 0 : 1,
        createdOn: new Date().toISOString()
      })
    }
    return events
  }

  public refreshNeeded (job: Job, events: Event[]): boolean {
    /*
      Check the event stream to determine if we need to adjust the
      payment flow, based on the number of events recorded.
      If the total number of new events > refresh rate, we need
      to perform a refresh
    */
    const refreshRate = job.refreshRate.toNumber();
    const eventsRecorded = job.eventsRecorded.toNumber();
    const newEvents = events.length - eventsRecorded;

    return newEvents > refreshRate;
  }

  public async sendStreamAdjustment (job: Job): Promise<void> {
    // increaseCashFlowAllowance(jobid, eventsRecorded)
  }

}