import httpx
from .config import settings

async def fetch_odds():
    url = "https://api.bet105.com/odds"
    headers = {"Authorization": f"Bearer {settings.BET105_KEY}"}
    try:
        async with httpx.AsyncClient() as client:
            resp = await client.get(url, headers=headers, timeout=5)
            resp.raise_for_status()
            return resp.json()
    except Exception:
        # Return mock odds for demo
        return {
            "markets": [
                {"id": "demo-market-1", "desc": "Team A vs Team B"}
            ]
        }
