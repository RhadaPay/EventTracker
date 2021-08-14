import { Client, UserAuth, ThreadID, createUserAuth, Where } from '@textile/hub'
import { DatabaseSeed, SetupDBParams } from '@/interfaces/database.interface'
import dotenv from 'dotenv';
import { Event } from '@/interfaces/events.interface';

dotenv.config();
/******************************
 * SETUP DATABASE CONNECTION
 * @see https://docs.textile.io/threads/#creating-a-new-thread
 ******************************/

const databaseSeed: DatabaseSeed = {
  schema: {
    title: 'Events',
    type: 'object',
    properties: {
      _id: { type: 'string' },
      eventId: { type: 'number' },
      eventStreamId: { type: 'number' },
      createdOn: { type: 'string' }
    }
  },
  sample: {
    _id: '0',
    eventStreamId: 1,
  }
};

export class Database {
  constructor(
    public params: SetupDBParams,
    public client: Client = undefined,
    public thread: ThreadID = undefined,
    public seed: DatabaseSeed = databaseSeed
  ){};

  public async setupClient (): Promise<void> {
    const auth: UserAuth = await createUserAuth(this.params.auth.key, this.params.auth.secret);
    this.client = Client.withUserAuth(auth);
  };

  public async connectOrCreateThread(): Promise<void> {
    const threadName = this.params.names.thread;
    try {
      const threadResponse = await this.client.getThread(threadName);
      console.log(`Existing Thread ${threadName} found`);
      this.thread = ThreadID.fromString(threadResponse.id);
    } catch {
      console.log(`Thread not found for ${threadName}, creating a new instance`);
      this.thread = await this.client.newDB(undefined, threadName);
    }
  };

  public async createCollectionIfNotExists() {
    const collection = this.params.names.collection;
    const exists = await this.collectionExists();
    if (!exists){
      console.log(`Collection not found for ${collection}, creating a new collection`);
      await this.createCollection()
    } else {
      console.log(`Collection ${collection} found`);
    }
  };

  public async collectionExists (): Promise<boolean> {
    try {
      const find = await this.client.find(this.thread, this.params.names.collection, {});
      return Boolean(find);
    } catch (err) {
      return false
    }
  };

  public async createCollection() {
    const collectionName = this.params.names.collection;
    await this.client.newCollection(this.thread, {
      name: collectionName,
      schema: this.seed.schema
    })
    await this.client.create(this.thread, collectionName, [this.seed.sample]);
  };

  public async connect() {
    await this.setupClient();
    await this.connectOrCreateThread();
    await this.createCollectionIfNotExists();
    console.log('Connected!');
  };

  public async testConnection() {
    try {
      await this.getAllEvents();
    } catch (err) {
      console.log('Disconnected', err);
      await this.connect()
    }
  }
  /**
   * Queries
   * 
   */
  
  public async getAllEvents(): Promise<Event[]> {
    return await this.client.find<Event>(
      this.thread, 
      this.params.names.collection,
      {}
    );
  };

  public async getEventsByStream(streamId: number): Promise<Event[]> {
    return await this.client.find<Event>(
      this.thread,
      this.params.names.collection,
      new Where('eventStreamId').eq(streamId)
    );
  };

  public async createNewEvent(event: Event): Promise<string> {
    const _id = await this.client.create(
      this.thread,
      this.params.names.collection,
      [event]
    );
    return _id[0];
  };
}

export const connectDB = async (): Promise<Database> => { 
  const db = new Database({
    auth: {
      key: process.env.TEXTILE_KEY,
      secret: process.env.TEXTILE_SECRET
    },
      names: {
      thread: 'EventDB2',
      collection: 'Events'
    }
  })
  await db.connect();
  return db
};
