import Sidebar from "@/app/Components/Sidebar";
import Header from "@/app/Components/Header";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-white text-black">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Header />

        <section className="flex-1 p-8">
          <h1 className="text-[25px] font-bold">
            Good Afternoon, [Name]!
          </h1>
          <p className="text-[#7E8B9E] pt-2">
            Here's what you need done today.
          </p>
        </section>
      </div>
    </main>
  );
}
