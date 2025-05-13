import asyncio
from .agents import get_votes
from .firestore import log_bet, log_stats
from .cache import redis_client
from .models import Bet, Vote, Stats
from .config import settings
from datetime import datetime

MAX_STAKE_PCT = 0.03
STOP_LOSS = -0.10
PROFIT_LOCK = 0.25

async def place_bet(market, bankroll, votes):
    # Playwright logic to place bet (simulate)
    # In prod: use Playwright to click on bet
    stake = round(bankroll * MAX_STAKE_PCT, 2)
    bet = Bet(
        market_id=market["id"],
        stake=stake,
        edge_pct=max([v["edge_pct"] for v in votes]),
        votes=[Vote(**v) for v in votes],
        status="OPEN",
        placed_at=datetime.utcnow().isoformat()
    )
    log_bet(bet.dict())
    await redis_client.hset("open_bets", bet.market_id, bet.json())
    return bet

async def check_guardrails(stats):
    if stats.profit <= STOP_LOSS * stats.bankroll:
        return False
    if stats.profit >= PROFIT_LOCK * stats.bankroll:
        return False
    return True
