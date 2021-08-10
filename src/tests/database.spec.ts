import { Event } from '@/interfaces/events.interface';
import { Database } from '@/plugins/database';
import { contract } from '@/plugins/ethereum';
import { EthereumService } from '@/services/ethereum.service';

describe('Accessing a single db instance', () => {
  jest.setTimeout(30_000);
  const randStr = () => Math.floor(Math.random() * 1_000_000).toString();

  const testDbFactory = () => new Database({
    auth: {
      key: process.env.TEXTILE_KEY,
      secret: process.env.TEXTILE_SECRET
    },
    names: {
      thread: randStr(),
      collection: randStr()
    }
  });

  const testDb1 = testDbFactory();
  const testDb2 = testDbFactory();

  const EVENTSTREAMID = 0;

  it('Is able to connect to the existing client', async () => {
    await testDb1.setupClient();
    expect(testDb1.client).toBeTruthy();
  });

  it('creates the db if it does not exist', async () => {
    await testDb1.connectOrCreateThread();
    expect(testDb1.thread).toBeTruthy();
  })

  it('Creates the collection if not exists', async () => {
    await testDb1.createCollectionIfNotExists();
    expect(await testDb1.collectionExists()).toEqual(true);
  })

  it('Can query an existing collection', async () => {
    const found = await testDb1.client.find(
      testDb1.thread,
      testDb1.params.names.collection,
      {}
    );
    expect(found.length).toBeGreaterThan(0);
  });

  it('Can do the above in a single setup step', async () => {
    await testDb2.connect();
    expect(testDb2.client).toBeTruthy();
    expect(testDb2.thread).toBeTruthy();
    expect(await testDb2.collectionExists()).toEqual(true);
  })

  it('Can add an event', async () => {
    const NUMBER_OF_EVENTS = 1;
    const existingEvents = (await testDb2.getAllEvents()).length;
    const mockEvents: Event[] = new EthereumService(contract).mockEvents(NUMBER_OF_EVENTS);
    await testDb2.createNewEvent(mockEvents[0]);
    const found = await testDb2.getAllEvents();
    expect(found.length).toEqual(NUMBER_OF_EVENTS + existingEvents);
  });

  it('Can query by event stream id', async () => {
    const found = await testDb2.getEventsByStream(EVENTSTREAMID);
    const foundAll = await testDb2.getAllEvents();
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
