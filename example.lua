--[[
    tesla_redis example


    tesla_redis supports imperitive synchronous and / async calls (through memoization)
    and doesn't require a server script for your resource. Client to server communication
    is handled by wtf_redis, so all you need to do is retrieve and store your data.

    No callback hell or server/client events!

    There are two ways of making calls to Redis, the first is synchronous, which works
    great on threads where UI isn't actively displayed, or when storing any information.

    For threads where UI is actively displayed in a loop (e.g. Citizen.Wait(1) loops),
    wtf_redis support memoized calls to retrieve data.

    Standard calls are synchronous, e.g.
        Redis.<cmd>(...) => result, error

    Memoized calls allow the same in-line syntax, the initial call is synchronous, however,
    subsequent calls are returned instantly and updated based on the memoization interval.

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
]]

-- Draw the current game timer value on the ped using 3D space floating text
Citizen.CreateThread(function()
    while true do
        Citizen.Wait(1)
        -- memoize the Redis get call to only refresh every 100 calls
        local foo = Redis.memoize(100).get('gametimer')

        local ped = GetPlayerPed(-1)
        local coords = GetEntityCoords(ped)
        DrawText3Ds(coords.x, coords.y, coords.z, foo, 255, 255, 255)
    end
end)

-- Update the gametimer value in Redis every 1500 ticks
Citizen.CreateThread(function()
    while true do
        Citizen.Wait(1500)
        Redis.set('gametimer', GetGameTimer())
    end
end)

--- Draws Text in 3D space helper
function DrawText3Ds(x, y, z, text, r, g, b)
    r = r or 255
    g = g or 255
    b = b or 255
    local _, _x, _y = World3dToScreen2d(x,y,z)
    SetTextScale(0.35, 0.35)
    SetTextFont(4)
    SetTextProportional(1)
    SetTextColour(r, g, b, 215)
    SetTextEntry("STRING")
    SetTextCentre(1)
    AddTextComponentString(text)
    DrawText(_x,_y)
    local factor = (string.len(text)) / 370
    DrawRect(_x,_y+0.0125, 0.015+ factor, 0.03, 41, 11, 41, 68)
end
