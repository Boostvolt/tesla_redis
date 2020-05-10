# tesla_redis
Redis client for FiveM
![alt text](https://user-images.githubusercontent.com/79330/56089925-3a985580-5e4f-11e9-9ff3-eb9430e0fbaf.jpg)
## Goals

- **Client side API**
  - API doesn't require messaging back and forth between your own client and server scripts
  - Centralized client/server messaging means you can just write your persistence layer along side your client interactions
- **Flexible**
  - Redis is inherently more flexible than MySQL in offering a "shared-heap"
  - Persistence types are analogous to local data structures
  - No schemas required

## Current State

tesla_redis supports imperitive synchronous and / async calls (through memoization) and doesn't require a server script for your resource. Client to server communication is handled by wtf_redis, so all you need to do is retrieve and store your data.
    
**No callback hell or server/client events!**
    
There are two ways of making calls to Redis, the first is synchronous, which works great on threads where UI isn't actively displayed, or when storing any information.

For threads where UI is actively displayed in a loop (e.g. `Citizen.Wait(1)` loops), wtf_redis support memoized calls to retrieve data.

- Standard calls are synchronous, e.g.
        
      Redis.<cmd>(...) => result, error
  
- Memoized calls allow the same in-line syntax, the initial call is synchronous, however, subsequent calls are returned instantly and updated based on the memoization interval.

    Updates are performed asynchronously so your UI never flickers / stutters.

    Memoized calls are first synchronous, then receive async value updates, e.g.

        -- During the first iteration of the loop the value is retrieved from Redis
        -- thereafter the loop continues and `myval` is instantly returned.
        -- It's value is updated asynchronously after 100 iterations, or in this
        -- example, 100 ticks of the game timer.
        while true do
            Citizen.Wait(1)
            local myval = Redis.memoize(100).get("somekey")
            -- some ui code using myval
        end
