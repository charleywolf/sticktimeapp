import Filters from "@/components/Filters";
import fetchSticktimes from "@/lib/fetch";

export const revalidate = 3600;

export default async function Home() {
  const sticktimes = await fetchSticktimes();
  return (
    <main className="min-h-screen bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 flex-col flex gap-16 items-center justify-between py-16 px-8 sm:px-16 md:p-24">
      <div className="flex flex-col gap-8 text-center sm:text-left">
        <h1 className="text-[#a4e6d0] font-bold text-4xl">SticktimeApp</h1>
        <p className="text-sm px-4 sm:px-0 sm:text-lg">
          Discover and access a comprehensive list of local stick times in the
          Greater Westchester area. No more searching through multiple websites
          to find a stick time that works for you.{" "}
        </p>
        <p className="italic text-xs px-4 sm:px-0 text-neutral-300 ">
          We do not guarantee the validity of this data. Always verify on the
          rink&apos;s website that the sticktime is available and if there are
          any booking requirements.
        </p>
      </div>
      <section className="flex flex-col w-full gap-5">
        <Filters sticktimes={sticktimes} />
      </section>
    </main>
  );
}
