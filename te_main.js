import redisClient from './utils/redis';

(async () => {
  console.log(await redisClient.isAlive());
})();
