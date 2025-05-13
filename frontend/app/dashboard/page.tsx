"use client";
import { useEffect, useState } from "react";

type Vote = {
  market_id: string;
  edge_pct: number;
  vote: string;
  agent: string;
};

type Bet = {
  market_id: string;
  stake: number;
  status: string;
  placed_at: string;
};

export default function Dashboard() {
  const [profit, setProfit] = useState(0);
  const [openBets, setOpenBets] = useState<Bet[]>([]);
  const [votes, setVotes] = useState<Vote[]>([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws");
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setProfit(data.profit);
      setOpenBets(data.open_bets);
      setVotes(data.latest_votes);
    };
    return () => ws.close();
  }, []);

  const agentLogo = (agent: string) => {
    if (agent.includes("GPT")) return "/logos/gpt4o.png";
    if (agent.includes("Claude")) return "/logos/claude.png";
    if (agent.includes("Gemini")) return "/logos/gemini.png";
    if (agent.includes("Llama")) return "/logos/llama.png";
    if (agent.includes("DeepSeek")) return "/logos/deepseek.png";
    return "";
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <div className="text-5xl font-bold mb-6 text-center">
        <span className={profit >= 0 ? "text-green-400" : "text-red-400"}>
          ${profit.toFixed(2)}
        </span>
      </div>
      <div className="mb-8">
        <div className="flex items-center justify-center gap-6">
          {votes.map((v, i) => (
            <div key={i} className="flex flex-col items-center">
              <img src={agentLogo(v.agent)} alt={v.agent} className="h-12 w-12 mb-1" />
              <span className="text-xs">{v.agent}</span>
              <span className={v.vote === "YES" ? "text-green-400" : "text-red-400"}>{v.vote}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-lg mb-2 font-semibold">Open Bets</h2>
        <table className="w-full text-sm bg-gray-900 rounded">
          <thead>
            <tr>
              <th className="p-2">Market</th>
              <th className="p-2">Stake</th>
              <th className="p-2">Status</th>
              <th className="p-2">Placed At</th>
            </tr>
          </thead>
          <tbody>
            {openBets.map((b, i) => (
              <tr key={i}>
                <td className="p-2">{b.market_id}</td>
                <td className="p-2">${b.stake}</td>
                <td className="p-2">{b.status}</td>
                <td className="p-2">{b.placed_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
