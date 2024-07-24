export default function Content({
  name,
  googleMapsEmbed,
  href,
  notes,
  rules,
  onlineRegistration,
  equipmentRequired,
  skaterLimit,
}: {
  name: string;
  href: string;
  googleMapsEmbed: string;
  notes?: { title: string; desc: string }[];
  rules?: string[];
  onlineRegistration: string;
  equipmentRequired: string;
  skaterLimit?: number | string;
}) {
  return (
    <main className="gap-12 md:gap-16 flex-col flex items-center justify-between py-16 px-8 sm:px-16 md:px-24">
      <section className="flex flex-col gap-2 w-full">
        <h1 className="w-full text-left sm:text-center text-3xl font-bold">
          {name}
        </h1>
        <h2 className="w-full text-left sm:text-center sm:pt-1">
          <a
            href={href}
            target="_blank"
            referrerPolicy="no-referrer"
            className="hover:opacity-80 underline text-xs text-neutral-200"
          >
            Visit their site for more information.
          </a>
        </h2>
      </section>
      <div className="w-full flex flex-col gap-12 lg:grid grid-cols-2">
        <section id="rink-content" className="w-full flex flex-col gap-6">
          <div>
            <h2>Equipment Requirement</h2>
            <p>{equipmentRequired}</p>
          </div>
          <div>
            <h2>Online Registration</h2>
            <p>{onlineRegistration}</p>
          </div>
          <div>
            <h2>Skater Limit</h2>
            <p>{skaterLimit ?? "None"}</p>
          </div>
          {rules && (
            <div>
              <h2>Rules</h2>
              <ul className="list-disc pl-6 py-2 flex flex-col gap-2">
                {rules.map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
            </div>
          )}
          {notes &&
            notes.map((note) => (
              <div key={note.title}>
                <h2>{note.title}</h2>
                <p>{note.desc}</p>
              </div>
            ))}
        </section>
        <section className="w-full">
          <iframe
            className="aspect-square w-full h-full rounded-2xl border-4 bg-white border-neutral-400"
            src={googleMapsEmbed}
          />
        </section>
      </div>
    </main>
  );
}
