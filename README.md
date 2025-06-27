# Zero - A Personal Blog & Portfolio

<p align="center">
  <img src="./public/apple-touch-icon.png" alt="Zero Logo" width="80" />
</p>

<p align="center">
  <a href="https://github.com/chanshiyucx/zero/stargazers">
    <img src="https://img.shields.io/github/stars/chanshiyucx/zero" alt="Stars"/>
  </a>
  <a href="https://github.com/chanshiyucx/zero/network/members">
    <img src="https://img.shields.io/github/forks/chanshiyucx/zero" alt="Forks"/>
  </a>
  <a href="https://github.com/chanshiyucx/zero/issues">
    <img src="https://img.shields.io/github/issues/chanshiyucx/zero" alt="Issues"/>
  </a>
  <a href="https://github.com/chanshiyucx/zero/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/chanshiyucx/zero" alt="License"/>
  </a>
</p>

A modern, elegant personal blog and portfolio built with Next.js, TypeScript, and Tailwind CSS. Features include blog posts, LeetCode solutions, project showcases, photo albums, and more.

## Features

- 🚀 Built with Next.js 15 and TypeScript
- 💅 Styled with Tailwind CSS and Rose Pine theme
- 📝 MDX support for blog posts and documentation
- 🔍 Full-text search with kbar
- 🌓 Dark/Light mode support
- 📱 Responsive design
- 📊 GitHub integration
- 📷 Photo album gallery
- 🔗 RSS feed support
- 🗺️ Sitemap generation

## Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Content:** MDX with Content Collections
- **Deployment:** Vercel/Cloudflare

## Project Structure

```
zero/
├── app/                # Next.js app directory
│   ├── blog/          # Blog pages
│   ├── leetcode/      # LeetCode solutions
│   ├── projects/      # Project showcase
│   └── album/         # Photo gallery
├── components/         # React components
├── lib/               # Utility functions and constants
├── styles/            # Global styles
├── public/            # Static files
│   └── blog/          # Blog content (synced from external repo)
└── content/           # Content collections configuration
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm/npm/yarn/bun
- GitHub Personal Access Token (for GitHub integration)
- WakaTime API Key (optional, for coding stats)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/chanshiyucx/zero.git
cd zero
```

2. Install dependencies:

```bash
pnpm install
# or
npm install
# or
yarn install
# or
bun install
```

3. Set up environment variables:

Create a `.env` file in the root directory with the following variables:

```bash
# Required for GitHub integration
GITHUB_TOKEN=your_github_token

# Optional for WakaTime integration
WAKATIME_API_KEY=your_wakatime_api_key
```

4. Sync blog content:

```bash
pnpm predev
# or
npm run predev
```

5. Start the development server:

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

To create a production build:

```bash
pnpm build
# or
npm run build
# or
yarn build
# or
bun run build
```

Then start the production server:

```bash
pnpm start
# or
npm start
# or
yarn start
# or
bun start
```

## Contributing

Contributions are always welcome! Please feel free to open an issue or create a pull request.

## License

This project is [MIT](./LICENSE) licensed.

Copyright © 2024 [Chanshiyu(蝉時雨)](https://github.com/chanshiyucx)

## Star History

<p align="center">
  <a href="https://star-history.com/#chanshiyucx/zero&Date">
    <img src="https://api.star-history.com/svg?repos=chanshiyucx/zero&type=Date" alt="Star History Chart" />
  </a>
</p>

---

<p align="center">Made with ❤️ by Chanshiyu</p>
