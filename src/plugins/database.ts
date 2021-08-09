import { Client, PrivateKey, UserAuth, Identity, ThreadID, QueryJSON, createUserAuth } from '@textile/hub'
import { Event } from '@/interfaces/events.interface'

export interface Names {
  db: string;
  collection: string;
} 

export interface AuthParams {
  key: string;
  secret: string;
}


/******************************
 * SETUP DATABASE CONNECTION
 * @see https://docs.textile.io/threads/#creating-a-new-thread
 ******************************/

/**************************************************************************************************** */
/**
 * To start a new, empty Thread, with remote networking using the Hub APIs,
 * initialize a Thread with the UserAuth object.
 * @param auth API Token object generated from Textile Hub
 * @returns authenticated client instance
 */
export async function setup(auth: UserAuth) {
  const user = await PrivateKey.fromRandom()
  const client = await Client.withUserAuth(auth)

  return client
}

export async function setupClient({ key, secret }: AuthParams) {
  const auth: UserAuth = await createUserAuth(key, secret);
  return Client.withUserAuth(auth);
}

/**
 * We must generate a new API token for each user we want on our API.
 * @param client authenticated client instance
 * @param user private api key
 * @returns authorization token
 */
export async function newToken(client: Client, user: PrivateKey) {
  const token = await client.getToken(user)
  return token
}

/**
 * Create a new database
 * @param client authenticated client instance
 * @returns ThreadID of the db instance
 */
export async function createDB(client: Client) {
  const thread: ThreadID = await client.newDB()
  return thread
}
/**************************************************************************************************** */

/**
 * Second option to create a database with a collection
 *
 * @param auth The user auth object or an async callback that returns a user auth object.
 * @param identity A user identity to use for creating records in the database. A random
 *                 identity can be created with `Client.randomIdentity(), however, it is
 *                 not easy/possible to migrate identities after the fact. Please store or
 *                 otherwise persist any identity information if you wish to retrieve user
 *                 data later, or use an external identity provider.
 * @returns the ID of the database
 * @see https://textileio.github.io/js-textile/docs/hub.client
 */



export async function setupDB(auth: UserAuth, identity: Identity, names: Names) {
  // Initialize the client
  const client = Client.withUserAuth(auth)

  // Connect the user to your API
  const userToken = await client.getToken(identity)
  // Create a new DB

  const threadID = await client.newDB(null, names.db)

  // Create a new Collection from an Object
  const event: Event = {
    id: 0,
    eventStreamId: 1,
    createdOn: '2009-01-03'
  }
  const eventWithId = {...event, _id: '' }

  await client.newCollectionFromObject(threadID, eventWithId, { name: names.collection })
  // Store the event object in the new collection
  await client.create(threadID, names.collection, [event])

  return threadID
}


/******************************
 * CREATE
 ******************************/
const eventsSchema = {
  title: 'Events',
  type: 'object',
  properties: {
    id: { type: 'string' },
    eventStreamId: { type: 'number' },
    createdOn: { type: 'string' }
  }
}

// Requires the started database we created above
export async function collectionFromSchema(client: Client, threadID: ThreadID, name: string = 'Events') {
  await client.newCollection(threadID, { name, schema: eventsSchema })
}
/**
 * Add an Instance
 *
 * @param client authenticated client
 * @param threadId the ID of the database
 * @param collection The human-readable name of the model to use.
 * @param event the event to be inserted into the database
 */
export async function create(client: Client, threadId: ThreadID, collection: string, event: Event) {
  // dont know why the example created a variable here, but will leave for now
  const created = await client.create(threadId, collection, [{
    id: event.id,
    eventStreamId: event.eventStreamId,
    createdOn: event.createdOn
  }])
}

/******************************
 * READ
 ******************************/
/**
 * Requires the started database we generated above containing the Player collection
 *
 * @param client authenticated client
 * @param threadID the ID of the database
 * @param query The object that describes the query. User Query class or primitive QueryJSON type.
 * @returns
 */
export async function createQuery(client: Client, threadID: ThreadID, query: QueryJSON) {
  // Get results
  const all = await client.find(threadID, 'Events', query)
  return all
}
