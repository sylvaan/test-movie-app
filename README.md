# 🎬 Movie App

A modern movie discovery and management web application, using data from [The Movie Database (TMDB)](https://www.themoviedb.org/).

🌐 **Live:** [test-movie-app-sylvaan.pages.dev](https://test-movie-app-sylvaan.pages.dev)

## 🛠️ Tech Stack

| Technology      | Purpose                                |
| --------------- | -------------------------------------- |
| React 19 + Vite | Core framework & build tool            |
| TypeScript      | Type safety                            |
| Redux Toolkit   | State management (CRUD, filters, etc.) |
| Tailwind CSS v4 | Styling                                |
| Axios           | HTTP client for TMDB API               |
| Lucide React    | Icon library                           |
| React Router v7 | Client-side routing                    |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A [TMDB API Key](https://www.themoviedb.org/settings/api)

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/test-movie-app.git
cd test-movie-app

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Then edit .env and fill in your TMDB API key
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── app/
│   └── store.ts              # Redux store configuration
├── components/
│   ├── Layout.tsx            # App shell (navbar, dark mode)
│   ├── MovieCard.tsx         # Movie card with bookmark & actions
│   └── MovieModal.tsx        # Add / Edit movie modal
├── features/
│   ├── movies/
│   │   └── moviesSlice.ts    # Movies state, CRUD, TMDB fetch
│   ├── bookmarks/
│   │   └── bookmarksSlice.ts # Bookmarks toggle state
│   └── genres/
│       └── genresSlice.ts    # Genre list from TMDB
├── pages/
│   ├── Home.tsx              # Main movie list page
│   └── Bookmarks.tsx         # Saved bookmarks page
└── data/
    └── mockMovies.ts         # Movie TypeScript interface
```

## 🌐 Deployment

This app is deployed on **Cloudflare Pages**.

Set the following environment variable in your Cloudflare Pages project settings:

```
VITE_TMDB_API_KEY = <your_tmdb_api_key>
```

Build settings:

- **Build command:** `npm run build`
- **Output directory:** `dist`

---

_Built with ❤️ for the Kecilin.id Frontend Developer Test_
