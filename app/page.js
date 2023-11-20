import TodosComponent from "@/components/TodosComponent";
import Todo from "@/models/todoModel";

export default async function Home() {
  const todos = await Todo.findAll();

  return (
    <div className="min-h-screen">
      <div className="px-5 py-5 mt-3 mx-auto flex justify-center">
        <h3 className="sm:text-3xl text-2xl font-semibold title-font text-gray-900">
          Todo App
        </h3>
      </div>

      <>
        <TodosComponent todos={todos} />
      </>
    </div>
  );
}
