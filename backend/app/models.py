from pydantic import BaseModel
from typing import List, Literal, Optional

class Vote(BaseModel):
    market_id: str
    edge_pct: float
    vote: Literal["YES", "NO"]
    agent: str

class Bet(BaseModel):
    market_id: str
    stake: float
    edge_pct: float
    votes: List[Vote]
    status: Literal["OPEN", "WON", "LOST"]
    placed_at: str
    settled_at: Optional[str] = None

class Stats(BaseModel):
    bankroll: float
    roi: float
    profit: float
    open_bets: List[Bet]
    latest_votes: List[Vote]
