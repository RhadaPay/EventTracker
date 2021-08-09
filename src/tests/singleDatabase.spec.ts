import { Event } from '@/interfaces/events.interface';
import { collectionFromSchema, create, createDB, createQuery, setupClient, setupDB } from '@/plugins/database';
import { Client, PrivateKey, QueryJSON, ThreadID } from '@textile/hub';
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
  const THREADNAME = 'JordanLevi';

  const collectionName = 'Test';
  const event/* : Event */ = {
    _id: '0',
    eventId: "0",
    eventStreamId: 1,
    createdOn: new Date().toString()
  }


  it('Is able to connect to the existing client', async () => {
    client = await setupClient({ key, secret });
    console.log(client);
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
    console.log(thread);
  });

  it('Can query an existing collection', async () => {
    const found = await client.find(thread, collectionName, {})
    console.log('found:', found.length, found)
    expect(found.length).toEqual(1);
  });
})
