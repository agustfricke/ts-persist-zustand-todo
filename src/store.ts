import create from 'zustand';
import { v4 as uuidv4 } from 'uuid';

import { Task } from './model/Task';

interface TaskState {
  tasks: Task[];
  addTask: (body: string) => void;
  removeTask: (id: string) => void;
  toggleTask: (id: string) => void;
}

export const useStore = create<TaskState>((set) => ({
  tasks: [],
  addTask: (body: string) => {
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          id: uuidv4(),
          body,
          completed: false,
        } as Task,
      ],
    }));
  },
  removeTask: (id) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }));
  },
  toggleTask: (id) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? ({ ...task, completed: !task.completed } as Task)
          : task
      ),
    }));
  },
}));