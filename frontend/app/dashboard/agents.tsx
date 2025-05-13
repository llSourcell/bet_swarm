"use client";
import { useEffect, useState } from "react";

const AGENTS = [
  {
    name: "GPT-4o",
    color: "bg-purple-600",
    desc: "Crunches advanced stats and recent form.",
  },
  {
    name: "Claude Sonnet",
    color: "bg-amber-500",
    desc: "Summarizes long injury reports and press notes.",
  },
  {
    name: "Gemini 2.5",
    color: "bg-cyan-500",
    desc: "Live-web search for line-moving tweets.",
  },
  {
    name: "Llama-4-70B",
    color: "bg-pink-500",
    desc: "Contrarian value from historical betting data.",
  },
  {
    name: "DeepSeek",
    color: "bg-green-500",
    desc: "Multimodal, spots graphical mis-prices fast.",
  },
];

const rationales = [
  "Panthers goalie scratched, edge rises!",
  "Maple Leafs moneyline is +EV by 4%.",
  "Contrarian value on underdog.",
  "Market hasn't moved after injury tweet.",
  "Graphical misprice detected on odds board.",
];

export default function AgentsPanel() {
  const [votes, setVotes] = useState(
    AGENTS.map((a, i) => ({
      pick: "...",
      edge: null,
      rationale: "Thinking...",
      loading: true,
    }))
  );

  useEffect(() => {
    // Animate agent decisions
    const timers = AGENTS.map((_, i) =>
      setTimeout(() => {
        setVotes((prev) => {
          const newVotes = [...prev];
          newVotes[i] = {
            pick: i % 2 === 0 ? "Panthers ML" : "Maple Leafs ML",
            edge: `${(3 + i).toFixed(1)}%`,
            rationale: rationales[i],
            loading: false,
          };
          return newVotes;
        });
      }, 1000 + i * 1200)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
      {AGENTS.map((agent, i) => (
        <div
          key={agent.name}
          className={`rounded-xl shadow-lg p-4 flex flex-col items-center ${agent.color} bg-opacity-80 text-white animate-fade-in`}
        >
          <div className="font-bold text-lg mb-2">{agent.name}</div>
          <div className="text-xs mb-3 opacity-80">{agent.desc}</div>
          <div className="text-2xl font-mono mb-1">
            {votes[i].loading ? <span className="animate-pulse">...</span> : votes[i].pick}
          </div>
          <div className="text-sm mb-1">
            {votes[i].loading ? <span className="animate-pulse">Calculating edge...</span> : `Edge: ${votes[i].edge}`}
          </div>
          <div className="text-xs italic text-center">
            {votes[i].rationale}
          </div>
        </div>
      ))}
    </div>
  );
}
