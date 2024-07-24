import Filters from "@/components/Filters";
import fetchSticktimes from "@/lib/fetch";

export const revalidate = 3600;

export default async function Home() {
  const sticktimes = await fetchSticktimes();
  return (
    <main className="min-h-screen bg-gradient-to-r gap-8 from-slate-900 via-slate-800 to-slate-900 flex-col flex items-center justify-between py-16 px-8 sm:px-16 md:p-24">
      <h1 className="text-[#a4e6d0] font-bold text-4xl w-full text-center sm:text-left">
        SticktimeApp
      </h1>

      <p className="text-sm px-4 sm:px-0 sm:text-lg w-full text-center sm:text-left">
        Discover and access a comprehensive list of local stick times in the
        Greater Westchester area. No more searching through multiple websites to
        find a stick time that works for you.{" "}
      </p>

      <p className="italic text-xs px-4 sm:px-0 w-full text-neutral-300 text-center sm:text-left">
        We do not guarantee the validity of this data. Always verify on the
        rink&apos;s website that the sticktime is available and if there are any
        booking requirements.
      </p>

      <Filters sticktimes={sticktimes} />
    </main>
  );
}
