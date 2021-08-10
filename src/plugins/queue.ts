import Bull, { DoneCallback, Job } from 'bull';

const queue = new Bull(
  'queue', {
      redis: {
        port: 6379,
        host: 'redis',
    } 
  }
);
const delay = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

const processQueue = async (job: Job, done: DoneCallback) => {
  const index = Math.floor(Math.random() * 100);
  console.log('processing data', {
    time: new Date().getUTCSeconds(),
    index
  });
  await delay(3000);
  console.log('Processed!', index);
  done();
};

try {
  queue.process(processQueue);
} catch (err) {
  console.warn('Process failed to execute, err: ', err);
}

const addToQueue = <T>(data: T) => {
  console.log(`Queued data:`, data);
  queue.add(data);
};

export { addToQueue };