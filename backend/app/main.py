import asyncio
import json
import threading
import logging
from fastapi import FastAPI, WebSocket, BackgroundTasks
from .odds import fetch_odds
from .agents import get_votes
from .bet import place_bet, check_guardrails
from .cache import redis_client
from .firestore import log_stats
from .models import Stats
from .ws import ws_stream

app = FastAPI()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await ws_stream(websocket)

def run_main_loop():
    async def main_loop():
        bankroll = 1000.0
        profit = 0.0
        import logging
        while True:
            try:
                odds = await fetch_odds()
                for market in odds.get("markets", []):
                    votes = await get_votes(market)
                    yes_votes = [v for v in votes if v["vote"] == "YES"]
                    edge = max([v["edge_pct"] for v in votes])
                    await redis_client.lpush("latest_votes", *[json.dumps(v) for v in votes])
                    await redis_client.ltrim("latest_votes", 0, 4)
                    if len(yes_votes) >= 3 and edge >= 0.8:
                        bet = await place_bet(market, bankroll, votes)
                        profit += bet.edge_pct * bet.stake  # Simulated
                        bankroll += profit
                        await redis_client.set("profit", profit)
                        await redis_client.hset("open_bets", bet.market_id, bet.json())
                    stats = Stats(
                        bankroll=bankroll,
                        roi=(profit / bankroll) if bankroll else 0,
                        profit=profit,
                        open_bets=[],
                        latest_votes=votes
                    )
                    log_stats(stats.dict())
                    if not await check_guardrails(stats):
                        break
            except Exception as e:
                logging.exception("Main loop error:")
            await asyncio.sleep(4)
    return main_loop

@app.post("/start-loop")
def start_main_loop(background_tasks: BackgroundTasks):
    def runner():
        asyncio.run(run_main_loop()())
    background_tasks.add_task(runner)
    return {"status": "main loop started"}
