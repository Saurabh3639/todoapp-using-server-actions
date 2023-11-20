"use server";

import Todo from "@/models/todoModel";
import { revalidatePath } from "next/cache";

export const addTodo = async (formData) => {
  const title = formData.get("title");
  const description = formData.get("description");

  try {
    await Todo.create({
      title: title,
      description: description,
    });
  } catch (error) {
    return error;
  }
  revalidatePath("/todos");
};

export const updateTodo = async (todoData) => {
  const { id, title, description } = todoData;

  try {
    const todoToUpdate = await Todo.findByPk(id);
    if (todoToUpdate) {
      await todoToUpdate.update({
        title: title,
        description: description,
      });
    }
  } catch (error) {
    return error;
  }
  revalidatePath("/todos");
};

export const deleteTodo = async (id) => {
  try {
    await Todo.destroy({ where: { id: id } });
  } catch (error) {
    return error;
  }
  revalidatePath("/todos");
};
