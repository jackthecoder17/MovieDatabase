"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LegacyMovieRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("movieId");

  useEffect(() => {
    if (id) router.replace(`/movie/${id}`);
    else router.replace("/");
  }, [id, router]);

  return null;
}
