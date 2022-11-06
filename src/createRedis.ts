import { createClient } from 'redis';
import * as Session from 'express-session';
import * as createRedisStore from 'connect-redis';

export const createRedisStorage = (configService) => {
  const RedisStore = createRedisStore(Session);
  const redisHost: string = configService.getValue('REDIS_HOST');
  const redisPort: number = +configService.getValue('REDIS_PORT');
  const redisClient = createClient({
    url: `redis://${configService.getValue(
      'REDIS_USERNAME',
    )}:${configService.getValue('REDIS_PASSWORD')}@${redisHost}:${redisPort}`,
  });

  redisClient.on('error', (err) =>
    console.log('Could not establish a connection with redis. ' + err),
  );
  redisClient.on('connect', () =>
    console.log('Connected to redis successfully'),
  );

  return new RedisStore({ client: redisClient as any });
};
