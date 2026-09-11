import Sidebar from "@/app/Components/Sidebar";
import Header from "@/app/Components/Header";
import AddTaskButton from "@/app/Components/AddTaskButton"
import TaskList from "@/app/Components/TaskList"

export default function Home() {
  return (
    <main className="flex min-h-screen bg-white text-black">
      <Sidebar />

      <div className="flex flex-1 flex-col">  {/*With Header*/}
        <Header />

        <div className="flex p-8 justify-between"> {/*Top Message*/}
          <div className="self-start">
            <h1 className="text-[25px] font-bold">
              Good Afternoon, [Name]!
            </h1>
            <p className="text-[#7E8B9E] pt-2">
              Here's what you need done today.
            </p>
          </div>
          <AddTaskButton />
        </div>
        <div className="px-8">
          <TaskList />
        </div>
      </div>
    </main>
  );
}
