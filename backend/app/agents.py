import httpx
from .config import settings

async def gpt4o_vote(market):
    headers = {"Authorization": f"Bearer {settings.OPENAI_KEY}"}
    # Simulate call (replace with actual API)
    return {
        "market_id": market["id"],
        "edge_pct": 0.9,
        "vote": "YES",
        "agent": "GPT-4o"
    }

async def claude_vote(market):
    headers = {"x-api-key": settings.ANTHROPIC_KEY}
    return {
        "market_id": market["id"],
        "edge_pct": 0.7,
        "vote": "NO",
        "agent": "Claude-Sonnet"
    }

async def gemini_vote(market):
    headers = {"Authorization": f"Bearer {settings.GEMINI_KEY}"}
    return {
        "market_id": market["id"],
        "edge_pct": 0.8,
        "vote": "YES",
        "agent": "Gemini-2.5-Pro"
    }

async def llama_vote(market):
    # Simulate call to LLAMA_ENDPOINT
    return {
        "market_id": market["id"],
        "edge_pct": 0.85,
        "vote": "YES",
        "agent": "Llama-4-70B"
    }

async def deepseek_vote(market):
    headers = {"Authorization": f"Bearer {settings.DEEPSEEK_KEY}"}
    return {
        "market_id": market["id"],
        "edge_pct": 0.6,
        "vote": "NO",
        "agent": "DeepSeek"
    }

async def get_votes(market):
    votes = await asyncio.gather(
        gpt4o_vote(market),
        claude_vote(market),
        gemini_vote(market),
        llama_vote(market),
        deepseek_vote(market)
    )
    return votes
