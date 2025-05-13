from fastapi import WebSocket
from .cache import redis_client
import json
import asyncio

async def ws_stream(websocket: WebSocket):
    await websocket.accept()
    while True:
        profit = await redis_client.get("profit") or 0
        open_bets = await redis_client.hvals("open_bets") or []
        latest_votes = await redis_client.lrange("latest_votes", 0, 4) or []
        await websocket.send_json({
            "profit": float(profit),
            "open_bets": [json.loads(b) for b in open_bets],
            "latest_votes": [json.loads(v) for v in latest_votes]
        })
        await asyncio.sleep(2)
