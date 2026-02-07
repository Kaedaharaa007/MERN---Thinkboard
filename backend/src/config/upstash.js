import {Ratelimit} from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import dotenv from "dotenv"

dotenv.config();//everytime we use env variable use dotenv.config

//create a ratelimiter 10 request per 20 sec
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10, "20 s")
})
export default ratelimit;