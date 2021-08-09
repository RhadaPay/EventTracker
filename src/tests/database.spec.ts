import { Event } from '@/interfaces/events.interface';
import { collectionFromSchema, create, createDB, createQuery, setupClient, setupDB } from '@/plugins/database';
import { Client, PrivateKey, ThreadID } from '@textile/hub';

const key = 'b76eqxm5clyev5ns5wlvl3ke7fm';
const secret = 'bbccrsod3av46mivruobgaljggmgtkx6nzjf4fei';
const pk = 
'bbaareqg7fnt2wz26rvl5jeewrhyhlz2qcmsjxyybidrde6w4bqpilvun3x4xvx4au4dwis4fvopoabylawlj6sxu7ai4cdesradsdo7oedbno'
;

describe('Accessing the database', () => {
  jest.setTimeout(20_000);

  let client: Client;
  let thread: ThreadID;

  const collectionName = 'Test';
  const event: Event = {
    id: 0,
    eventStreamId: 1,
    createdOn: new Date().toString()
  }

  it('Generates a consistent key from a string', async () => {
    const restored = PrivateKey.fromString(pk);
    const identity = PrivateKey.fromString(restored.toString());
    expect(restored).toEqual(identity);
  });

  it('Is able to create a client', async () => {
    client = await setupClient({ key, secret });
    console.log(client);
  });

  it('Is able to create a new DB', async () => {
    thread = await createDB(client);
    console.log(thread);
  });

  it('Can setup a collection and add data', async () => {
    await collectionFromSchema(client, thread, collectionName);
    await create(client, thread, collectionName, event);
  });

  it('Can query the new collection', async () => {
    const data = await createQuery(client, thread, {});
    expect(data.length).toEqual(1);
  })
})