import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/database";
import { NextResponse } from "next/server";

type SubmittedArticleInsert = Database["public"]["Tables"]["submitted_articles"]["Insert"];
type SubmittedAirdropInsert = Database["public"]["Tables"]["submitted_airdrops"]["Insert"];

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error(
      `Missing Supabase env vars. URL: ${!!supabaseUrl}, Key: ${!!supabaseServiceKey}`
    );
  }

  return createClient<Database>(supabaseUrl, supabaseServiceKey);
}

const articles = [
  {
    article_title: "The Ultimate Guide to IO Traders",
    excerpt:
      "Master the art of trading with IOTraders - comprehensive guide covering strategies, tools, and best practices for crypto traders.",
    author: "Sarah Chen",
    category: "Trading",
    article_content: `<h2>Introduction to IO Traders</h2><p>IO Traders is a revolutionary platform designed for modern cryptocurrency traders. Whether you're a beginner or an experienced trader, this guide will help you maximize your trading potential.</p><h3>Getting Started</h3><p>Setting up your IO Traders account is straightforward. Sign up, verify your identity, and connect your wallet to begin trading.</p><h3>Core Trading Strategies</h3><ul><li><strong>Day Trading:</strong> Quick trades within a single day for rapid gains</li><li><strong>Swing Trading:</strong> Hold positions for days or weeks to catch market swings</li><li><strong>Arbitrage:</strong> Exploit price differences across exchanges</li><li><strong>Scalping:</strong> Make small frequent trades for consistent gains</li></ul><h3>Risk Management Tips</h3><ol><li>Never invest more than you can afford to lose</li><li>Use stop-loss orders to limit potential losses</li><li>Diversify your portfolio across multiple assets</li><li>Keep your private keys secure</li><li>Monitor your positions regularly</li></ol><h3>Advanced Features</h3><p>IO Traders offers advanced charting tools, real-time market analysis, and automated trading bots for experienced traders.</p><h3>Conclusion</h3><p>With proper strategy and risk management, IO Traders can be a powerful tool in your cryptocurrency trading arsenal.</p>`,
    article_logo_url: "/images/articles/ultimate-guide-io-traders.png",
    tags: "trading,iotraders,beginner,advanced",
    status: "published",
    featured: true,
    slug: "ultimate-guide-io-traders",
  },
  {
    article_title: "DeFi Security 101: Protecting Your Assets",
    excerpt:
      "Essential security practices for DeFi users to protect their cryptocurrency and prevent common hacks and exploits.",
    author: "Michael Rodriguez",
    category: "Security",
    article_content: `<h2>Understanding DeFi Risks</h2><p>Decentralized finance offers incredible opportunities but comes with significant risks. Understanding these risks is your first line of defense.</p><h3>Common Attack Vectors</h3><ul><li><strong>Smart Contract Vulnerabilities:</strong> Bugs in code can lead to fund losses</li><li><strong>Rug Pulls:</strong> Developers abandon projects and steal funds</li><li><strong>Flash Loans:</strong> Attackers exploit price manipulation</li><li><strong>Phishing:</strong> Fraudulent websites and emails targeting users</li></ul><h3>Best Security Practices</h3><ol><li>Use hardware wallets for large amounts</li><li>Enable two-factor authentication everywhere</li><li>Verify URLs before connecting wallets</li><li>Research projects before investing</li><li>Keep seed phrases offline in multiple locations</li></ol><h3>Identifying Scams</h3><p>Red flags include unrealistic returns, pressure to invest quickly, and promises of guaranteed profits. Be skeptical of any investment promising returns above market averages.</p>`,
    article_logo_url: "/images/articles/defi-security-101.png",
    tags: "security,defi,safety,risk-management",
    status: "published",
    featured: true,
    slug: "defi-security-101",
  },
  {
    article_title: "Blockchain Fundamentals Explained",
    excerpt:
      "A beginner-friendly introduction to blockchain technology, how it works, and why it matters for cryptocurrency.",
    author: "David Kumar",
    category: "Education",
    article_content: `<h2>What is Blockchain?</h2><p>A blockchain is a distributed ledger technology that maintains a continuously growing list of records, called blocks, which are linked using cryptography.</p><h3>Key Components</h3><ul><li><strong>Blocks:</strong> Data structures containing transaction records</li><li><strong>Nodes:</strong> Computers maintaining the blockchain network</li><li><strong>Smart Contracts:</strong> Self-executing code on the blockchain</li><li><strong>Consensus:</strong> Agreement mechanisms like Proof of Work or Proof of Stake</li></ul><h3>How Blockchain Works</h3><ol><li>Transactions are broadcast to the network</li><li>Nodes validate transactions using consensus mechanisms</li><li>Valid transactions are grouped into blocks</li><li>Blocks are cryptographically linked to previous blocks</li><li>The chain becomes immutable and permanent</li></ol><h3>Applications Beyond Cryptocurrency</h3><p>Blockchain technology is being used in supply chain management, healthcare records, voting systems, and intellectual property protection.</p>`,
    article_logo_url: "/images/articles/blockchain-fundamentals.png",
    tags: "blockchain,education,fundamentals,beginner",
    status: "published",
    featured: true,
    slug: "blockchain-fundamentals",
  },
  {
    article_title: "NFT Market Guide: Trading Digital Assets",
    excerpt:
      "Complete guide to understanding, buying, and selling NFTs in the digital marketplace.",
    author: "Jessica Wu",
    category: "NFT",
    article_content: `<h2>What Are NFTs?</h2><p>Non-Fungible Tokens (NFTs) are unique digital assets verified on the blockchain, representing ownership of digital or physical items.</p><h3>Getting Started with NFTs</h3><ul><li>Set up a cryptocurrency wallet</li><li>Purchase cryptocurrency (ETH, SOL, etc.)</li><li>Connect wallet to NFT marketplace</li><li>Browse and purchase collections</li></ul><h3>Popular NFT Marketplaces</h3><p>OpenSea, Blur, Magic Eden, and LooksRare are among the largest NFT trading platforms with diverse collections.</p><h3>Investment Considerations</h3><ol><li>Understand project fundamentals and team</li><li>Check transaction history and floor prices</li><li>Be aware of gas fees and transaction costs</li><li>Diversify your NFT holdings</li><li>Store valuable NFTs in secure wallets</li></ol>`,
    article_logo_url: "/images/articles/nft-market-guide.png",
    tags: "nft,trading,marketplace,digital-assets",
    status: "published",
    featured: false,
    slug: "nft-market-guide",
  },
  {
    article_title: "Layer 2 Solutions: Scaling Ethereum",
    excerpt:
      "Understanding Layer 2 protocols and how they solve Ethereum's scalability challenges.",
    author: "Alex Turner",
    category: "DeFi",
    article_content: `<h2>The Scaling Problem</h2><p>Ethereum's main network can process only 15 transactions per second, creating congestion and high gas fees. Layer 2 solutions offer an answer.</p><h3>Types of Layer 2 Solutions</h3><ul><li><strong>Rollups:</strong> Bundle transactions and post to Ethereum (Optimistic and ZK)</li><li><strong>Sidechains:</strong> Independent blockchains with their own validators</li><li><strong>Payment Channels:</strong> Off-chain transactions between parties</li><li><strong>Plasma:</strong> Hierarchical chains with periodic checkpoints</li></ul><h3>Popular Layer 2s</h3><p>Arbitrum, Optimism, zkSync, Polygon, and StarkNet are leading Layer 2 solutions with significant DeFi activity and TVL.</p><h3>Advantages</h3><ol><li>Significantly lower gas fees (90-99% reduction)</li><li>Faster transaction confirmation</li><li>Increased throughput capacity</li><li>Maintained Ethereum security guarantees</li></ol>`,
    article_logo_url: "/images/articles/layer2-solutions.png",
    tags: "layer2,scaling,ethereum,defi",
    status: "published",
    featured: false,
    slug: "layer2-solutions",
  },
  {
    article_title: "Smart Contract Audits: Ensuring Code Safety",
    excerpt:
      "Why smart contract audits matter and how to evaluate audit reports for DeFi protocols.",
    author: "Emma Blockchain",
    category: "Security",
    article_content: `<h2>What is a Smart Contract Audit?</h2><p>A smart contract audit is a comprehensive review of contract code by security experts to identify vulnerabilities and potential exploits.</p><h3>Common Vulnerabilities Found</h3><ul><li>Reentrancy attacks</li><li>Integer overflow/underflow</li><li>Front-running vulnerabilities</li><li>Access control issues</li><li>Logic errors and edge cases</li></ul><h3>Reading Audit Reports</h3><p>Look for audit firms' reputation, number of findings, severity levels, and remediation status. Multiple audits from reputable firms provide better assurance.</p><h3>Top Audit Firms</h3><p>OpenZeppelin, Chainalysis, Trail of Bits, and ConsenSys are among the most respected smart contract audit providers in the industry.</p>`,
    article_logo_url: "/images/articles/smart-contract-audit.png",
    tags: "security,smartcontracts,audit,development",
    status: "published",
    featured: false,
    slug: "smart-contract-audit",
  },
  {
    article_title: "Arbitrage Strategies for Crypto Traders",
    excerpt:
      "Explore profitable arbitrage strategies to exploit price differences across cryptocurrency exchanges.",
    author: "Brian Wong",
    category: "Trading",
    article_content: `<h2>Understanding Arbitrage</h2><p>Arbitrage involves buying an asset on one exchange and selling it on another to profit from price differences.</p><h3>Types of Arbitrage</h3><ul><li><strong>Spatial Arbitrage:</strong> Buy low on one exchange, sell high on another</li><li><strong>Temporal Arbitrage:</strong> Exploit price differences over time</li><li><strong>Cross-chain Arbitrage:</strong> Trade across different blockchains</li><li><strong>Triangular Arbitrage:</strong> Trade three different pairs for profit</li></ul><h3>Challenges</h3><ol><li>Transaction fees can eliminate profits</li><li>Speed is critical - prices move quickly</li><li>Withdrawal limits on exchanges</li><li>Regulatory and KYC requirements</li></ol><h3>Tools for Arbitrage</h3><p>Automated bots, exchange APIs, and real-time price monitors help identify and execute arbitrage opportunities efficiently.</p>`,
    article_logo_url: "/images/articles/arbitrage-strategies.png",
    tags: "trading,arbitrage,strategy,advanced",
    status: "published",
    featured: false,
    slug: "arbitrage-strategies",
  },
  {
    article_title: "Yield Farming: Maximizing Crypto Returns",
    excerpt:
      "Complete guide to yield farming strategies, risks, and how to optimize returns in DeFi.",
    author: "Lisa Park",
    category: "DeFi",
    article_content: `<h2>What is Yield Farming?</h2><p>Yield farming involves depositing cryptocurrency into smart contracts to earn rewards in the form of tokens or interest.</p><h3>How Yield Farming Works</h3><ol><li>Deposit crypto into a liquidity pool</li><li>Earn trading fees from pool usage</li><li>Receive governance or native tokens as incentives</li><li>Compound returns by re-investing</li></ol><h3>APY vs APR</h3><p>APR (Annual Percentage Rate) is the simple rate, while APY (Annual Percentage Yield) accounts for compounding. Always compare APY for accurate returns.</p><h3>Risks to Consider</h3><ul><li>Impermanent loss in liquidity pools</li><li>Smart contract risks</li><li>Slippage and trading costs</li><li>Token value depreciation</li><li>Rug pull risks</li></ul><h3>Optimization Tips</h3><p>Monitor APYs regularly, diversify across protocols, use automated aggregators, and reinvest earnings strategically.</p>`,
    article_logo_url: "/images/articles/yield-farming-guide.png",
    tags: "defi,yield-farming,returns,strategy",
    status: "published",
    featured: false,
    slug: "yield-farming-guide",
  },
  {
    article_title: "Wallets and Custody Solutions",
    excerpt:
      "Comprehensive guide to cryptocurrency wallets, custody options, and best practices for securing digital assets.",
    author: "James Mitchell",
    category: "Security",
    article_content: `<h2>Types of Wallets</h2><ul><li><strong>Hot Wallets:</strong> Online and connected to internet (convenient but higher risk)</li><li><strong>Cold Wallets:</strong> Offline storage (secure but less convenient)</li><li><strong>Hardware Wallets:</strong> Physical devices like Ledger and Trezor</li><li><strong>Paper Wallets:</strong> Printed private keys (maximum security)</li><li><strong>Custodial Wallets:</strong> Third-party custody (convenience vs control trade-off)</li></ul><h3>Wallet Selection Criteria</h3><ol><li>Security features and audit history</li><li>Supported cryptocurrencies and tokens</li><li>User interface and ease of use</li><li>Backup and recovery options</li><li>Multi-signature support for additional security</li></ol><h3>Custody Solutions</h3><p>Coinbase Custody, Kraken Custody, and Fidelity offer institutional-grade custody for large holdings.</p>`,
    article_logo_url: "/images/articles/wallets-custody.png",
    tags: "security,wallets,custody,storage",
    status: "published",
    featured: false,
    slug: "wallets-custody",
  },
  {
    article_title: "Crypto Market Analysis 2024",
    excerpt:
      "In-depth analysis of cryptocurrency market trends, predictions, and investment strategies for 2024.",
    author: "Robert Chang",
    category: "Market Analysis",
    article_content: `<h2>Market Overview</h2><p>The cryptocurrency market continues to mature with increasing institutional adoption and regulatory clarity.</p><h3>Key Trends</h3><ul><li>Bitcoin ETF approvals driving institutional investment</li><li>Layer 2 scaling solutions gaining traction</li><li>Tokenization of real-world assets</li><li>Regulatory frameworks becoming clearer</li><li>DeFi innovation accelerating</li></ul><h3>Market Cycles</h3><p>Understanding market cycles helps traders identify buying and selling opportunities. Bitcoin halving events typically influence market behavior.</p><h3>2024 Outlook</h3><ol><li>Increased institutional participation</li><li>Regulatory convergence globally</li><li>Performance upgrades on major chains</li><li>Increased interoperability</li><li>Enhanced user experience improvements</li></ol>`,
    article_logo_url: "/images/articles/market-analysis-2024.png",
    tags: "market-analysis,trends,2024,outlook",
    status: "published",
    featured: false,
    slug: "market-analysis-2024",
  },
  {
    article_title: "Staking and Earning Rewards",
    excerpt:
      "Guide to cryptocurrency staking, validator setup, and strategies for maximizing passive income.",
    author: "Patricia Lee",
    category: "DeFi",
    article_content: `<h2>Introduction to Staking</h2><p>Staking allows cryptocurrency holders to earn rewards by participating in network validation and security.</p><h3>How Staking Works</h3><ol><li>Hold cryptocurrency in a blockchain network</li><li>Contribute to network consensus (Proof of Stake)</li><li>Earn rewards for honest validation</li><li>Receive additional tokens as incentives</li></ol><h3>Popular Staking Networks</h3><ul><li>Ethereum - 3-5% annual rewards</li><li>Solana - 6-8% annual rewards</li><li>Polkadot - 10-15% annual rewards</li><li>Cosmos - 10-25% annual rewards</li><li>Cardano - 4-6% annual rewards</li></ul><h3>Staking Risks</h3><p>Slashing penalties, lockup periods, validator downtime, and market volatility are risks to consider when staking.</p>`,
    article_logo_url: "/images/articles/staking-rewards.png",
    tags: "staking,passive-income,defi,rewards",
    status: "published",
    featured: false,
    slug: "staking-rewards",
  },
  {
    article_title: "Token Distribution and Tokenomics",
    excerpt:
      "Understanding token distribution models, tokenomics, and evaluation criteria for cryptocurrency projects.",
    author: "Vincent Park",
    category: "Education",
    article_content: `<h2>What is Tokenomics?</h2><p>Tokenomics refers to the economic principles and mechanics governing a cryptocurrency token's creation, distribution, and utility.</p><h3>Key Tokenomic Factors</h3><ul><li><strong>Total Supply:</strong> Maximum tokens ever created</li><li><strong>Circulating Supply:</strong> Tokens currently in circulation</li><li><strong>Distribution:</strong> How tokens are allocated at launch</li><li><strong>Inflation:</strong> New token creation over time</li><li><strong>Utility:</strong> What tokens can be used for</li></ul><h3>Evaluation Criteria</h3><ol><li>Fair distribution avoiding excessive concentration</li><li>Clear vesting schedules for team/investors</li><li>Inflation mechanisms and burn mechanisms</li><li>Governance capabilities for token holders</li><li>Real utility beyond speculation</li></ol><h3>Red Flags</h3><p>Extreme early distributions to founders, infinite supply, rapid minting, and lack of tokenomic clarity are warning signs.</p>`,
    article_logo_url: "/images/articles/token-distribution.png",
    tags: "tokenomics,education,evaluation,fundamentals",
    status: "published",
    featured: false,
    slug: "token-distribution",
  },
  {
    article_title: "DAO Governance and Voting",
    excerpt:
      "Understanding decentralized autonomous organizations and how governance voting works in crypto.",
    author: "Natasha Romanov",
    category: "DeFi",
    article_content: `<h2>What is a DAO?</h2><p>A Decentralized Autonomous Organization (DAO) is an organization represented by rules encoded as computer programs on a blockchain.</p><h3>Governance Structure</h3><ul><li>Token holders vote on proposals</li><li>Multi-sig wallets for fund management</li><li>Smart contracts execute decisions</li><li>Transparent decision-making</li><li>No central authority or intermediaries</li></ul><h3>Voting Mechanisms</h3><ol><li>Token-based voting (one token = one vote)</li><li>Quadratic voting for fairness</li><li>Weighted voting by stake percentage</li><li>Delegation to representatives</li><li>Multi-choice and ranked voting</li></ol><h3>Popular DAOs</h3><p>Uniswap, Aave, Curve, and Compound are major DeFi DAOs where governance tokens determine protocol direction.</p>`,
    article_logo_url: "/images/articles/governance-voting.png",
    tags: "dao,governance,voting,defi",
    status: "published",
    featured: false,
    slug: "governance-voting",
  },
  {
    article_title: "Cross-Chain Bridges and Interoperability",
    excerpt:
      "Guide to cross-chain bridges, how they work, and strategies for safe cross-chain asset transfers.",
    author: "Kevin Zhang",
    category: "DeFi",
    article_content: `<h2>The Need for Bridges</h2><p>Different blockchains operate independently, creating fragmentation. Bridges enable asset transfers and communication between chains.</p><h3>Types of Bridges</h3><ul><li><strong>Wrapped Bridges:</strong> Lock asset on source, mint wrapped version on destination</li><li><strong>Liquidity Bridges:</strong> Use liquidity pools for swaps</li><li><strong>Light Client Bridges:</strong> Verify state on both chains</li><li><strong>Optimistic Bridges:</strong> Assume validity with fraud proofs</li></ul><h3>Popular Bridges</h3><p>Stargate Finance, Across Protocol, and LayerZero provide decentralized cross-chain solutions with varying security models.</p><h3>Risks and Best Practices</h3><ol><li>Audit status and security history</li><li>Bridge TVL and liquidity</li><li>Slippage and fee structures</li><li>Recovery mechanisms for failures</li><li>Stay informed on bridge updates</li></ol>`,
    article_logo_url: "/images/articles/cross-chain-bridges.png",
    tags: "bridges,interoperability,cross-chain,defi",
    status: "published",
    featured: false,
    slug: "cross-chain-bridges",
  },
  {
    article_title: "Liquidity Mining: Providing Liquidity for Rewards",
    excerpt:
      "Comprehensive guide to liquidity mining, how to provide liquidity, and strategies for maximizing rewards.",
    author: "Monica Garcia",
    category: "DeFi",
    article_content: `<h2>What is Liquidity Mining?</h2><p>Liquidity mining rewards users for providing liquidity to decentralized exchanges or lending protocols.</p><h3>How to Provide Liquidity</h3><ol><li>Choose a DEX or protocol</li><li>Select a trading pair</li><li>Deposit equal value of both assets</li><li>Receive LP tokens representing your share</li><li>Earn trading fees and bonus rewards</li></ol><h3>Impermanent Loss</h3><p>Impermanent loss occurs when the price ratio changes, resulting in lower value than if you'd held tokens separately. Understanding this is crucial for mining.</p><h3>Popular Liquidity Mining Programs</h3><ul><li>Uniswap V3 concentrated liquidity</li><li>Aave liquidation mining</li><li>Curve stable swap pairs</li><li>Balancer protocol</li><li>Velodrome on Optimism</li></ul><h3>Optimization Strategies</h3><p>Focus on stable pairs to minimize impermanent loss, use concentrated liquidity for capital efficiency, and monitor APYs regularly.</p>`,
    article_logo_url: "/images/articles/liquidity-mining.png",
    tags: "liquidity-mining,defi,passive-income,strategy",
    status: "published",
    featured: false,
    slug: "liquidity-mining",
  },
];

const airdrops = [
  {
    project_name: "IOTraderX",
    short_description:
      "Advanced trading platform with AI-powered market analysis and copy trading features.",
    full_description:
      "IOTraderX is a next-generation trading platform combining advanced charting, AI market analysis, and social copy trading. Airdrop: 1000+ tokens to early traders.",
    participation_steps: "1. Sign up at IOTraderX.com\n2. Complete KYC verification\n3. Trade minimum $100\n4. Claim airdrop tokens",
    category: "Trading",
    chain: "Ethereum",
    reward_info: "1000-5000 tokens based on trading volume",
    start_date: "2024-01-15",
    end_date: "2024-03-15",
    website_url: "https://iotraderx.com",
    twitter_url: "https://twitter.com/iotraderx",
    telegram_url: "https://t.me/iotraderx",
    discord_url: "https://discord.gg/iotraderx",
    logo_url: "/images/airdrops/iotraderx-logo.png",
    submitter_name: "IOTraderX Team",
    status: "active",
    featured: true,
    slug: "iotraderx",
  },
  {
    project_name: "BitJet Exchange",
    short_description:
      "High-performance crypto exchange with zero-fee trading and advanced derivatives.",
    full_description:
      "BitJet offers lightning-fast trading execution, zero maker fees, advanced derivatives, and a native utility token. Airdrop rewards early adopters.",
    participation_steps: "1. Sign up on BitJet.io\n2. Verify email\n3. Trade on platform\n4. Receive tokens automatically",
    category: "Exchange",
    chain: "Polygon",
    reward_info: "500-2000 tokens + trading fee rebates",
    start_date: "2024-02-01",
    end_date: "2024-04-01",
    website_url: "https://bitjet.io",
    twitter_url: "https://twitter.com/bitjet",
    telegram_url: "https://t.me/bitjet",
    discord_url: "https://discord.gg/bitjet",
    logo_url: "/images/airdrops/bitjet-logo.png",
    submitter_name: "BitJet",
    status: "active",
    featured: true,
    slug: "bitjet-exchange",
  },
  {
    project_name: "LayerZero Protocol",
    short_description: "Omnichain interoperability protocol enabling seamless cross-chain messaging.",
    full_description:
      "LayerZero enables applications to interact across any blockchain. The native token holders can stake for rewards and participate in governance.",
    participation_steps:
      "1. Visit LayerZero.network\n2. Complete tasks\n3. Earn points\n4. Airdrop snapshot on TBD",
    category: "Infrastructure",
    chain: "Ethereum, Polygon, Avalanche, Arbitrum",
    reward_info: "10-50 tokens based on activity",
    start_date: "2024-01-20",
    end_date: "2024-06-20",
    website_url: "https://layerzero.network",
    twitter_url: "https://twitter.com/LayerZero_Labs",
    telegram_url: "https://t.me/layerzero",
    discord_url: "https://discord.gg/layerzero",
    logo_url: "/images/airdrops/layerzero-logo.png",
    submitter_name: "LayerZero Labs",
    status: "active",
    featured: true,
    slug: "layerzero-protocol",
  },
  {
    project_name: "zkSync",
    short_description: "Ethereum Layer 2 scaling solution using zero-knowledge proofs for fast, cheap transactions.",
    full_description:
      "zkSync provides Ethereum scaling with 100x faster transactions and 1000x lower costs. Native token enables governance and validator staking.",
    participation_steps:
      "1. Use zkSync\n2. Deploy contracts\n3. Bridge assets\n4. Qualify for airdrop",
    category: "Layer 2",
    chain: "Ethereum (Layer 2)",
    reward_info: "100-1000 tokens for active users",
    start_date: "2024-01-01",
    end_date: "2024-12-31",
    website_url: "https://zksync.io",
    twitter_url: "https://twitter.com/zkSyncofficial",
    telegram_url: "https://t.me/zkSyncofficial",
    discord_url: "https://discord.gg/nMaPGrDDwk",
    logo_url: "/images/airdrops/zksync-logo.png",
    submitter_name: "zkSync Team",
    status: "active",
    featured: true,
    slug: "zksync",
  },
  {
    project_name: "Monad",
    short_description: "High-performance EVM-compatible blockchain with 10k TPS and single-slot finality.",
    full_description:
      "Monad achieves breakthrough performance through pipelined execution and asynchronous I/O. Early adopters eligible for generous token allocation.",
    participation_steps: "1. Apply on Monad.xyz\n2. Deploy contracts\n3. Qualify for airdrop\n4. Claim tokens",
    category: "Layer 1",
    chain: "Monad",
    reward_info: "500-5000 tokens based on usage",
    start_date: "2024-02-15",
    end_date: "2024-08-15",
    website_url: "https://monad.xyz",
    twitter_url: "https://twitter.com/MonadLabs",
    telegram_url: "https://t.me/monaddao",
    discord_url: "https://discord.gg/monad",
    logo_url: "/images/airdrops/monad-logo.png",
    submitter_name: "Monad Labs",
    status: "active",
    featured: false,
    slug: "monad",
  },
  {
    project_name: "Fuel Network",
    short_description: "Modular execution layer enabling Ethereum's scalability while maintaining security.",
    full_description:
      "Fuel brings modular architecture to Ethereum, enabling better scalability, throughput, and programmability. Early participants qualify for airdrops.",
    participation_steps: "1. Visit Fuel.dev\n2. Complete tasks\n3. Earn points\n4. Participate in testnet",
    category: "Layer 2",
    chain: "Ethereum (Layer 2)",
    reward_info: "1000-10000 tokens for contributors",
    start_date: "2024-01-10",
    end_date: "2024-09-10",
    website_url: "https://fuel.dev",
    twitter_url: "https://twitter.com/fuel_sh",
    telegram_url: "https://t.me/fuel_network",
    discord_url: "https://discord.gg/fuel",
    logo_url: "/images/airdrops/fuel-logo.png",
    submitter_name: "Fuel Labs",
    status: "active",
    featured: false,
    slug: "fuel-network",
  },
  {
    project_name: "Berachain",
    short_description: "EVM-compatible Layer 1 using Proof of Liquidity consensus with sustainable rewards.",
    full_description:
      "Berachain combines EVM compatibility with innovative Proof of Liquidity consensus, rewarding liquidity providers. Early adopters get token airdrops.",
    participation_steps: "1. Connect wallet to Berachain\n2. Provide liquidity\n3. Stake tokens\n4. Earn rewards",
    category: "Layer 1",
    chain: "Berachain",
    reward_info: "500-5000 tokens + trading fees",
    start_date: "2024-03-01",
    end_date: "2024-09-01",
    website_url: "https://berachain.com",
    twitter_url: "https://twitter.com/berachain",
    telegram_url: "https://t.me/berachain",
    discord_url: "https://discord.gg/berachain",
    logo_url: "/images/airdrops/berachain-logo.png",
    submitter_name: "Berachain",
    status: "active",
    featured: false,
    slug: "berachain",
  },
  {
    project_name: "Scroll",
    short_description: "Ethereum Layer 2 using native zero-knowledge proofs for security and efficiency.",
    full_description:
      "Scroll extends Ethereum bytecode with ZK proofs for bytecode generation and verification, enabling true L2 security. Early users get airdrops.",
    participation_steps: "1. Deploy on Scroll testnet\n2. Use dApps\n3. Bridge assets\n4. Qualify for mainnet airdrop",
    category: "Layer 2",
    chain: "Ethereum (Layer 2)",
    reward_info: "100-500 tokens for testnet participants",
    start_date: "2024-01-05",
    end_date: "2024-12-05",
    website_url: "https://scroll.io",
    twitter_url: "https://twitter.com/Scroll_ZKP",
    telegram_url: "https://t.me/scrollzk",
    discord_url: "https://discord.gg/scroll",
    logo_url: "/images/airdrops/scroll-logo.png",
    submitter_name: "Scroll Labs",
    status: "active",
    featured: false,
    slug: "scroll",
  },
  {
    project_name: "Linea",
    short_description: "ConsenSys Layer 2 solution combining bytecode-level EVM equivalence with ZK proofs.",
    full_description:
      "Linea provides bytecode-level EVM equivalence, making it drop-in compatible with Ethereum dApps while using ZK proofs for security.",
    participation_steps: "1. Join Linea network\n2. Deploy contracts\n3. Use dApps\n4. Collect rewards",
    category: "Layer 2",
    chain: "Ethereum (Layer 2)",
    reward_info: "50-500 tokens for early users",
    start_date: "2024-02-20",
    end_date: "2024-11-20",
    website_url: "https://linea.build",
    twitter_url: "https://twitter.com/LineaBuild",
    telegram_url: "https://t.me/linea",
    discord_url: "https://discord.gg/linea",
    logo_url: "/images/airdrops/linea-logo.png",
    submitter_name: "ConsenSys",
    status: "active",
    featured: false,
    slug: "linea",
  },
  {
    project_name: "Sonic",
    short_description: "Fantom's upgrade to 10,000 TPS throughput with sub-second finality and lower fees.",
    full_description:
      "Sonic transforms Fantom with breakthrough throughput and finality. Early participants in Sonic network qualify for significant token allocation.",
    participation_steps: "1. Bridge assets to Sonic\n2. Stake tokens\n3. Use dApps\n4. Claim rewards",
    category: "Layer 1",
    chain: "Sonic",
    reward_info: "1000-10000 tokens based on stake",
    start_date: "2024-03-15",
    end_date: "2024-09-15",
    website_url: "https://sonic.ooo",
    twitter_url: "https://twitter.com/Sonic_Ooo",
    telegram_url: "https://t.me/sonicprivate",
    discord_url: "https://discord.gg/sonic",
    logo_url: "/images/airdrops/sonic-logo.png",
    submitter_name: "Sonic Labs",
    status: "active",
    featured: false,
    slug: "sonic",
  },
  {
    project_name: "Initia",
    short_description:
      "Interoperable Layer 2 enabling seamless app chain deployment with shared liquidity and security.",
    full_description:
      "Initia enables developers to deploy customized Layer 2 chains connected through shared liquidity and bridging infrastructure.",
    participation_steps: "1. Build on Initia\n2. Deploy app chain\n3. Attract users\n4. Earn tokens",
    category: "Layer 2",
    chain: "Initia",
    reward_info: "500-5000 tokens for active developers",
    start_date: "2024-02-01",
    end_date: "2024-10-01",
    website_url: "https://initia.xyz",
    twitter_url: "https://twitter.com/initiatech",
    telegram_url: "https://t.me/initia",
    discord_url: "https://discord.gg/initia",
    logo_url: "/images/airdrops/initia-logo.png",
    submitter_name: "Initia",
    status: "active",
    featured: false,
    slug: "initia",
  },
  {
    project_name: "MegaETH",
    short_description:
      "Ethereum's first on-chain sequencer for high throughput and minimal latency with maximum security.",
    full_description:
      "MegaETH brings on-chain sequencing to Ethereum, dramatically improving throughput while maintaining full Ethereum security and decentralization.",
    participation_steps:
      "1. Use MegaETH\n2. Execute transactions\n3. Provide feedback\n4. Qualify for airdrop",
    category: "Layer 2",
    chain: "Ethereum (Layer 2)",
    reward_info: "100-1000 tokens for active users",
    start_date: "2024-04-01",
    end_date: "2024-12-01",
    website_url: "https://megaeth.io",
    twitter_url: "https://twitter.com/MegaETH_io",
    telegram_url: "https://t.me/megaeth",
    discord_url: "https://discord.gg/megaeth",
    logo_url: "/images/airdrops/megaeth-logo.png",
    submitter_name: "MegaETH",
    status: "upcoming",
    featured: false,
    slug: "megaeth",
  },
  {
    project_name: "Hyperlane",
    short_description:
      "Permissionless cross-chain interoperability protocol connecting any chain to any chain.",
    full_description:
      "Hyperlane enables any blockchain to send messages to any other blockchain without permission. Native token governance for validators.",
    participation_steps:
      "1. Deploy on supported chains\n2. Send messages\n3. Run validators\n4. Earn rewards",
    category: "Infrastructure",
    chain: "Multi-chain",
    reward_info: "200-2000 tokens for active operators",
    start_date: "2024-01-15",
    end_date: "2024-07-15",
    website_url: "https://hyperlane.xyz",
    twitter_url: "https://twitter.com/hyperlane_",
    telegram_url: "https://t.me/hyperlane",
    discord_url: "https://discord.gg/hyperlane",
    logo_url: "/images/airdrops/hyperlane-logo.png",
    submitter_name: "Hyperlane Labs",
    status: "active",
    featured: false,
    slug: "hyperlane",
  },
  {
    project_name: "Eclipse",
    short_description:
      "Ethereum-equivalent Layer 2 using Solana VM for high throughput and developer experience.",
    full_description:
      "Eclipse brings Solana's high-performance VM to Ethereum as a Layer 2, enabling 1M+ TPS with Ethereum security.",
    participation_steps: "1. Deploy contracts on Eclipse\n2. Build dApps\n3. Attract users\n4. Earn rewards",
    category: "Layer 2",
    chain: "Ethereum (Layer 2)",
    reward_info: "1000-10000 tokens for developers",
    start_date: "2024-03-01",
    end_date: "2024-09-01",
    website_url: "https://eclipse.build",
    twitter_url: "https://twitter.com/EclipseFND",
    telegram_url: "https://t.me/eclipse_fdn",
    discord_url: "https://discord.gg/eclipse",
    logo_url: "/images/airdrops/eclipse-logo.png",
    submitter_name: "Eclipse Foundation",
    status: "active",
    featured: false,
    slug: "eclipse",
  },
  {
    project_name: "Abstract",
    short_description:
      "Application-specific Layer 2 platform enabling easy deployment of custom chains optimized for apps.",
    full_description:
      "Abstract lets developers deploy app-specific Layer 2 chains in minutes with shared liquidity and native bridging infrastructure.",
    participation_steps: "1. Deploy app chain\n2. Configure parameters\n3. Attract users\n4. Share rewards",
    category: "Layer 2",
    chain: "Abstract",
    reward_info: "500-5000 tokens for app creators",
    start_date: "2024-02-01",
    end_date: "2024-08-01",
    website_url: "https://abs.xyz",
    twitter_url: "https://twitter.com/AbstractChain",
    telegram_url: "https://t.me/abstractchain",
    discord_url: "https://discord.gg/abstract",
    logo_url: "/images/airdrops/abstract-logo.png",
    submitter_name: "Abstract",
    status: "active",
    featured: false,
    slug: "abstract",
  },
];

export async function POST() {
  try {
    console.log("[seed] Starting database seeding...");
    const supabase = getSupabaseClient();

    // Insert articles
    console.log("[seed] Inserting 15 articles...");
    for (const article of articles) {
      await (supabase.from("submitted_articles") as any).insert({
        ...article,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    }

    // Insert airdrops
    console.log("[seed] Inserting 15 airdrops...");
    for (const airdrop of airdrops) {
      await (supabase.from("submitted_airdrops") as any).insert({
        ...airdrop,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    }

    console.log("[seed] Seeding completed successfully!");

    return NextResponse.json({
      success: true,
      message: "Database seeded with 15 articles and 15 airdrops",
      articles: articles.length,
      airdrops: airdrops.length,
    });
  } catch (error) {
    console.error("[seed] Error:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
