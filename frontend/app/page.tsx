import AgentsPanel from "./dashboard/agents";

function WalletFeed() {
  // Simulated wallet feed
  const feed = [
    { type: "deposit", amount: 5000, time: "12:01" },
    { type: "bet", amount: -150, time: "12:04", desc: "Panthers ML" },
    { type: "payout", amount: 285, time: "12:40" },
    { type: "bet", amount: -200, time: "13:10", desc: "Leafs ML" },
    { type: "payout", amount: 380, time: "13:55" },
    { type: "bet", amount: -100, time: "14:22", desc: "Rangers ML" },
    { type: "payout", amount: 0, time: "14:50" },
  ];
  return (
    <div className="bg-black bg-opacity-80 rounded-lg shadow mb-4 overflow-x-auto whitespace-nowrap flex items-center px-4 py-2 text-xs text-green-400 font-mono animate-marquee">
      {feed.map((f, i) => (
        <span key={i} className={`mx-4 ${f.type === "bet" ? "text-yellow-400" : f.type === "payout" ? "text-green-400" : "text-blue-400"}`}>
          [{f.time}] {f.type.toUpperCase()}: {f.amount > 0 ? "+" : ""}{f.amount} {f.desc ? `(${f.desc})` : ""}
        </span>
      ))}
    </div>
  );
}

function OddsBoard() {
  // Simulated odds board
  const markets = [
    { id: "1", matchup: "Panthers vs Maple Leafs", oddsA: "+110", oddsB: "-130", status: "debating" },
    { id: "2", matchup: "Rangers vs Bruins", oddsA: "+120", oddsB: "-140", status: "resolved" },
    { id: "3", matchup: "Oilers vs Stars", oddsA: "+105", oddsB: "-125", status: "pending" },
  ];
  return (
    <div className="bg-gray-900 rounded-xl shadow p-4 mb-8">
      <div className="font-bold text-lg mb-2 text-white">Live Market Odds (Bet105)</div>
      <table className="w-full text-sm text-gray-200">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="text-left">Matchup</th>
            <th>Team A</th>
            <th>Team B</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {markets.map((m) => (
            <tr key={m.id} className="border-b border-gray-800">
              <td>{m.matchup}</td>
              <td>{m.oddsA}</td>
              <td>{m.oddsB}</td>
              <td>{m.status === "debating" ? <span className="text-yellow-400 animate-pulse">Debating</span> : m.status === "resolved" ? <span className="text-green-400">Resolved</span> : <span className="text-gray-400">Pending</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BetExecution() {
  // Simulated Playwright bet execution
  return (
    <div className="bg-gray-800 rounded-xl shadow p-4 flex flex-col items-center mb-8">
      <div className="font-bold text-lg text-white mb-2">Playwright: Automated Bet Execution</div>
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded-full bg-blue-500 animate-pulse"></div>
        <span className="text-white text-sm">Logging in...</span>
        <div className="w-8 h-8 rounded-full bg-green-500 animate-pulse"></div>
        <span className="text-white text-sm">Clicking odds...</span>
        <div className="w-8 h-8 rounded-full bg-yellow-400 animate-pulse"></div>
        <span className="text-white text-sm">Stake entered...</span>
        <div className="w-8 h-8 rounded-full bg-purple-500 animate-pulse"></div>
        <span className="text-white text-sm">Slip confirmed!</span>
      </div>
      <div className="mt-4 text-xs text-gray-300">(PNG slip saved for audit)</div>
    </div>
  );
}

function GuardrailsStats() {
  // Simulated stats
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-gray-900 rounded-xl p-4 text-center text-white">
        <div className="text-xs text-gray-400 mb-1">Bankroll</div>
        <div className="text-2xl font-bold">$5,081</div>
      </div>
      <div className="bg-gray-900 rounded-xl p-4 text-center text-white">
        <div className="text-xs text-gray-400 mb-1">ROI</div>
        <div className="text-2xl font-bold text-green-400">23.4%</div>
      </div>
      <div className="bg-gray-900 rounded-xl p-4 text-center text-white">
        <div className="text-xs text-gray-400 mb-1">Risk Meter</div>
        <div className="text-2xl font-bold text-yellow-400">Low</div>
      </div>
      <div className="bg-gray-900 rounded-xl p-4 text-center text-white">
        <div className="text-xs text-gray-400 mb-1">Guardrails</div>
        <div className="text-xs">Max 3%/bet<br />Stop-loss −10%<br />Profit lock 25%</div>
      </div>
    </div>
  );
}

function Quickstart() {
  return (
    <div className="bg-gray-900 rounded-xl shadow p-4 mb-8 text-white">
      <div className="font-bold text-lg mb-2">How It Works</div>
      <ol className="list-decimal ml-5 text-sm mb-2">
        <li>Plug in your API keys (Bet105, OpenAI, Anthropic, Gemini, etc).</li>
        <li>Run <span className="bg-gray-800 px-2 py-1 rounded text-xs">docker compose up</span>.</li>
        <li>Watch the live agent debate, bet execution, and wallet feed update in real time.</li>
        <li>Guardrails and stats update automatically. All code is MIT—fork and remix!</li>
      </ol>
      <div className="flex gap-4 mt-2">
        <span className="bg-blue-700 px-2 py-1 rounded text-xs">Redis</span>
        <span className="bg-purple-700 px-2 py-1 rounded text-xs">LangGraph</span>
        <span className="bg-green-700 px-2 py-1 rounded text-xs">Playwright</span>
        <span className="bg-yellow-700 px-2 py-1 rounded text-xs">Prometheus</span>
        <span className="bg-pink-700 px-2 py-1 rounded text-xs">Grafana</span>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="text-xs text-gray-400 text-center mt-10 mb-2">
      MIT Licensed • <a href="https://github.com/sirajraval/betswarm" className="underline">GitHub Repo</a> • Drop your AI agent prediction in the comments!
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-white px-2 pb-10">
      <div className="max-w-5xl mx-auto pt-10">
        <header className="mb-8 flex flex-col items-center">
          <h1 className="text-4xl font-extrabold mb-2">BetSwarm</h1>
          <div className="text-lg text-gray-300 mb-2">5 AI Swarm Betting Bot — Plug &amp; Play Demo</div>
          <WalletFeed />
        </header>
        <GuardrailsStats />
        <AgentsPanel />
        <OddsBoard />
        <BetExecution />
        <Quickstart />
        <Footer />
      </div>
    </div>
  );
}
