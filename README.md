# Zero — Personal Digital Garden

<p align="center">
  <img src="./app/icon.svg" alt="Zero logo" width="80" />
</p>

Zero is my corner of the internet: a place to publish tech essays, journal stories, code snippets, projects, and photo gallery.

## Highlights

- Next.js 15 + React 19 with the App Router, typed with TypeScript.
- MDX publishing pipeline powered by `@content-collections` and custom remark/rehype plugins.
- Content synced from an external `blog` repository via `scripts/sync-blog.ts`, keeping the `/public/blog` directory up to date before every dev/build run.
- Theming with Tailwind CSS 4, Rose Pine palettes.

## Directory Overview

```text
zero/
├── app/
│   ├── page.tsx              # Landing page with latest content
│   ├── articles/             # Tech posts
│   ├── journal/              # Daily life
│   ├── snippets/             # Code snippets
│   ├── gallery/              # Photo gallery
│   ├── projects/             # GitHub project showcase
│   ├── og/                   # Dynamic Open Graph image routes
│   └── api/                  # Edge runtime endpoints
├── components/               # UI primitives and feature components
├── hooks/                    # Reusable client-side hooks
├── lib/
│   ├── api/                  # GitHub REST/GraphQL helpers with fetch wrappers
│   ├── constants/            # Site metadata and external links
│   ├── mdx/                  # Custom remark/rehype plugins
│   ├── meta/                 # RSS feed & sitemap generators
│   └── utils/                # Shared utilities
├── public/
│   ├── assets/               # Static assets
│   └── blog/                 # Synced MDX content
├── scripts/                  # Automation scripts
├── stores/                   # Zustand stores for UI state
├── styles/                   # Tailwind layers and theme tokens
├── content-collections.ts    # MDX collection definitions
├── env.ts                    # Runtime environment schema
└── types/                    # Ambient type declarations
```

## Content Types

| Type     | Source directory      | Route prefix |
| -------- | --------------------- | ------------ |
| Articles | `public/blog/article` | `/articles`  |
| Journal  | `public/blog/journal` | `/journal`   |
| Snippets | `public/blog/snippet` | `/snippets`  |
| Albums   | `public/blog/album`   | `/gallery`   |

## Getting Started

### Prerequisites

- Node.js >= 20
- pnpm (recommended), npm, yarn, or bun
- GitHub personal access token with at least `read:user`, `repo`, and `discussions` scopes (prefixed with `ghp_`)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/chanshiyucx/zero.git
   cd zero
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # npm install / yarn install / bun install
   ```

3. **Configure environment variables**

   Create a `.env` file in the project root:

   ```bash
   GITHUB_TOKEN=ghp_your_personal_access_token
   ```

4. **Sync MDX content**

   ```bash
   pnpm predev
   ```

   This runs `scripts/sync-blog.ts`, cloning or pulling the external `blog` repository into `public/blog`.

5. **Start the development server**

   ```bash
   pnpm dev
   ```

   Visit `http://localhost:3000` to explore the site. Turbopack is enabled by default for faster HMR.

6. **Production build**

   ```bash
   pnpm build
   pnpm start
   ```

## License

Distributed under the [MIT License](./LICENSE).

---

<p align="center">Made with ❤️ by Chanshiyu</p>
