"use client";

import {
  addTodo,
  updateTodo,
  deleteTodo,
} from "@/actions/todoActions";
import React, { useRef, useState } from "react";

export default function TodosComponent({ todos }) {
  const [currentTodo, setCurrentTodo] = useState(null);
  const ref = useRef(null);

  const handleUpdateClick = (todo) => {
    setCurrentTodo(todo);
    // Populate the form fields with the todo data
    ref.current.title.value = todo.title;
    ref.current.description.value = todo.description;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (currentTodo) {
      await updateTodo({
        ...currentTodo,
        title: formData.get("title"),
        description: formData.get("description"),
      });
    } else {
      await addTodo(formData);
    }
    ref.current.reset();
    setCurrentTodo(null); // Reset the currentTodo state
  };

  return (
    <>
      <div className="container px-5 py-5 mx-auto flex justify-center">
        <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col w-full relative border border-gray-200 shadow-md">
          <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
            {currentTodo ? "Update Todo" : "Add Todo"}
          </h2>
          <form
            ref={ref}
            // action={async (formData) => {
            //   ref.current?.reset();
            //   // input validations are here
            //   await addTodo(formData);
            // }}
            onSubmit={handleSubmit}
          >
            <div className="relative mb-4">
              <label htmlFor="title" className="leading-7 text-sm text-gray-600">
                Todo title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                required
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="description"
                className="leading-7 text-sm text-gray-600"
              >
                Todo Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                required
              ></textarea>
            </div>
            <button className="text-white border-0 py-2 px-6 focus:outline-none rounded text-lg bg-green-500 hover:bg-green-600">
              {currentTodo ? "Update" : "Add"}
            </button>
          </form>
        </div>
      </div>

      <div className="flex flex-wrap px-5 py-5">
        {todos?.map((todo) => (
          <div key={todo.id} className="xl:w-1/3 md:w-1/2 p-4">
            <div className="border border-gray-200 p-6 rounded-lg">
              <h2 className="text-lg text-gray-900 font-semibold title-font mb-2">
                {todo.title}
              </h2>
              <p className="leading-relaxed text-base mb-2">
                {todo.description}
              </p>
              <div className="flex gap-3">
                <button
                  className="text-white border-0 py-2 px-6 focus:outline-none rounded text-base bg-indigo-500 hover:bg-indigo-600"
                  onClick={() => handleUpdateClick(todo)}
                >
                  Update
                </button>
                <button
                  className="text-white border-0 py-2 px-6 focus:outline-none rounded text-base bg-red-500 hover:bg-red-600"
                  onClick={async () => {
                    await deleteTodo(todo.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
