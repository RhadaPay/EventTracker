import Bull from 'bull';

const queue = new Bull(
  'queue', {
      redis: {
        port: 6379,
        host: 'redis',
    } 
  }
);

queue.process((job) => {
  console.log('Added Job to Queue at', job.timestamp);
})

export { queue };