import ratelimit from "../config/upstash.js"

const rateLimiter = async (req,res,next)=>{ //can't limit per userid cause dont have authentication
    try {
        const{success} = await ratelimit.limit("my-rate-limit");

        if(!success) return res.status(429).json({ message: "too many request"});

        next();
    } catch (error) {
        console.log("Rate limiter error", error);
        next(error);
    }
}

export default rateLimiter