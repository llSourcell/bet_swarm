from pydantic import BaseModel
from typing import List

class VoteResponse(BaseModel):
    market_id: str
    edge_pct: float
    vote: str
    agent: str

class ProfitResponse(BaseModel):
    profit: float

class BetResponse(BaseModel):
    market_id: str
    stake: float
    status: str
    placed_at: str

class WSMessage(BaseModel):
    profit: float
    open_bets: List[BetResponse]
    latest_votes: List[VoteResponse]
