import Image from "next/image";
import fetchSticktimes from "@/lib/fetch";

export default async function Home() {
  const sticktimes = await fetchSticktimes();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}
