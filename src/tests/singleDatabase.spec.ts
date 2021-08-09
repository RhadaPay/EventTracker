import { Event } from '@/interfaces/events.interface';
import { collectionFromSchema, create, setupClient } from '@/plugins/database';
import { contract } from '@/plugins/ethereum';
import { EthereumService } from '@/services/ethereum.service';
import { Client, ThreadID } from '@textile/hub';
import { Where } from '@textile/threads';

const key = 'b76eqxm5clyev5ns5wlvl3ke7fm';
const secret = 'bbccrsod3av46mivruobgaljggmgtkx6nzjf4fei';
const pk =
'bbaareqg7fnt2wz26rvl5jeewrhyhlz2qcmsjxyybidrde6w4bqpilvun3x4xvx4au4dwis4fvopoabylawlj6sxu7ai4cdesradsdo7oedbno'
;

describe('Accessing a single db instance', () => {
  jest.setTimeout(30_000);

  let client: Client;
  let thread: ThreadID;
  let collection: any;
  const THREADNAME = 'JordanLevi2';
  const EVENTSTREAMID = 0;

  const collectionName = 'Test';
  const event: Event = {
    eventId: 0,
    eventStreamId: 1,
    createdOn: new Date().toString()
  }


  it('Is able to connect to the existing client', async () => {
    client = await setupClient({ key, secret });
  });

  it('creates the db if it does not exist', async () => {
    try {
      thread = await client.newDB(undefined, THREADNAME);
      collection = await collectionFromSchema(client, thread, collectionName);
      await create(client, thread, collectionName, event);
      console.log('Thread created', thread);
    } catch {
      console.log('Db exists');
    }
  })

  it('Is able to connect to an existing db', async () => {
    const threadResponse = await client.getThread(THREADNAME);
    expect(threadResponse.name).toEqual(THREADNAME);
    thread = ThreadID.fromString(threadResponse.id);
  });

  it('Can query an existing collection', async () => {
    const found = await client.find(thread, collectionName, {})
    expect(found.length).toBeGreaterThan(0);
  });


  it(`Can query an existing collection by stream id === ${EVENTSTREAMID}`, async () => {
    const query = new Where('eventStreamId').eq(EVENTSTREAMID);
    const found = await client.find(thread, collectionName, query)
    expect(found.length).toBeGreaterThan(0);
  });

  it('Can add some events', async () => {
    const NUMBER_OF_EVENTS = 5;
    const mockEvents: Event[] = new EthereumService(contract).mockEvents(NUMBER_OF_EVENTS)
    await client.create(thread, collectionName, mockEvents);
    const found = await client.find(thread, collectionName, {})
    expect(found.length).toBeGreaterThanOrEqual(NUMBER_OF_EVENTS);
  });

  it('Can query by event stream id', async () => {
    const query = new Where('eventStreamId').eq(0);
    const found = await client.find(thread, collectionName, query);
    const foundAll = await client.find(thread, collectionName, {});
    expect(found.length).toBeGreaterThan(0);
    expect(found.length).toBeLessThan(foundAll.length);
    console.log(`
    Final Report:
    ---------------------------
    Found Length: ${found.length}
    FoundAll Length: ${foundAll.length}
    ---------------------------
    `
    , foundAll);
  })
})
