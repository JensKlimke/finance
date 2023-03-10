import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { createClient } from 'redis';
import {v4} from "uuid";
import cors from 'cors';

dotenv.config();

const app : Express = express();
const PORT = process.env.PORT || 8000;

const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = process.env.REDIS_PORT || '6379';

const url = `redis://${REDIS_HOST}:${REDIS_PORT}`;
console.log(`Connecting to redis server ${url}`);

const client = createClient({url});
client.connect().catch(console.error);


// enable cors
app.use(cors());
app.options('*', cors());

app.get('/', async (req: Request, res: Response) => {
// get id
  let id = await client.hGet('whois', 'id');
  // check id
  if (!id) {
    // generate id
    id = v4();
    // save id
    await client.hSet('whois', 'id', id);
  }
  // send users
  res.send(id);
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
