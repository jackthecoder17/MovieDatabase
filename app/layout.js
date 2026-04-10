import "./globals.css";
import { Inter } from "next/font/google";
import ReactQueryClient from "./components/useClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MovieDB App",
  description: "Modern movie discovery experience powered by TMDB",
};

export const dynamic = "force-dynamic";

async function getRandomBackdrop() {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) return "";

  try {
    const randomPage = Math.floor(Math.random() * 5) + 1;
    const url = new URL("https://api.themoviedb.org/3/movie/popular");
    url.searchParams.set("api_key", apiKey);
    url.searchParams.set("page", String(randomPage));

    const res = await fetch(url.toString(), {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) return "";

    const data = await res.json();
    const withBackdrop = (data?.results || []).filter((movie) => movie?.backdrop_path);
    if (!withBackdrop.length) return "";

    const picked = withBackdrop[Math.floor(Math.random() * withBackdrop.length)];
    return `https://image.tmdb.org/t/p/original/${picked.backdrop_path}`;
  } catch {
    return "";
  }
}

export default async function RootLayout({ children }) {
  const backdrop = await getRandomBackdrop();

  return (
    <html lang="en">
      <body className={inter.className}>
        <div
          className="min-h-screen"
          style={
            backdrop
              ? {
                  backgroundImage: `url(${backdrop})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundAttachment: "fixed",
                }
              : undefined
          }
        >
          <div className="min-h-screen bg-slate-950/80">
            <ReactQueryClient>
              <div className="mx-auto min-h-screen max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">{children}</div>
            </ReactQueryClient>
          </div>
        </div>
      </body>
    </html>
  );
}
