import { Names } from '@/interfaces/database.interface';
import { Event } from '@/interfaces/events.interface';
import db, { Database } from '@/plugins/database';
import { contract } from '@/plugins/ethereum';
import { EthereumService } from '@/services/ethereum.service';
import { Where } from '@textile/threads';

describe('Accessing a single db instance', () => {
  jest.setTimeout(30_000);

  const originalNames: Names = {
    thread: db.params.names.thread,
    collection: db.params.names.collection
  }
  const randStr = () => Math.floor(Math.random() * 1_000_000).toString();
  const thread = randStr();
  const collection = randStr();

  const testDb = new Database({
    auth: {
      key: process.env.TEXTILE_KEY,
      secret: process.env.TEXTILE_SECRET
    },
    names: {
      thread,
      collection
    }
  })
  const EVENTSTREAMID = 0;

  it('Is able to connect to the existing client', async () => {
    await testDb.setupClient();
    expect(testDb.client).toBeTruthy();
  });

  it('creates the db if it does not exist', async () => {
    await testDb.connectOrCreateThread();
    expect(testDb.thread).toBeTruthy();
  })

  it('Creates the collection if not exists', async () => {
    await testDb.createCollectionIfNotExists();
    expect(await testDb.collectionExists()).toEqual(true);
  })

  it('Can query an existing collection', async () => {
    const found = await testDb.client.find(
      testDb.thread,
      testDb.params.names.collection,
      {}
    );
    expect(found.length).toBeGreaterThan(0);
  });

  it('Can do the above in a single setup step', async () => {
    await db.connect();
    expect(db.client).toBeTruthy();
    expect(db.thread).toBeTruthy();
    expect(await db.collectionExists()).toEqual(true);
  })

  it('Can add an event', async () => {
    const NUMBER_OF_EVENTS = 1;
    const existingEvents = (await db.getAllEvents()).length;
    const mockEvents: Event[] = new EthereumService(contract).mockEvents(NUMBER_OF_EVENTS);
    await db.createNewEvent(mockEvents[0]);
    const found = await db.getAllEvents();
    expect(found.length).toEqual(NUMBER_OF_EVENTS + existingEvents);
  });

  it('Can query by event stream id', async () => {
    const found = await db.getEventsByStream(EVENTSTREAMID);
    const foundAll = await db.getAllEvents();
    expect(found.length).toBeLessThan(foundAll.length);
    
    const records = 10;
    console.log(`
    Final Report:
    ---------------------------
    Found Length for evenStreamId ${EVENTSTREAMID}: ${found.length}
    FoundAll Length: ${foundAll.length}
    ---------------------------
    Print last ${records} records:
    `
    , foundAll.slice(-records));
  })
})
