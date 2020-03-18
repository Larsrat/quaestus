export type TaskType = {
  id: string;
  title: string;
  subtasks: SubtaskType[];
};

export type SubtaskType = {
  id: string;
  title: string;
  workload: 1 | 2 | 3 | 4 | 5;
  description: string;
  dueDate: Date;
  subtasks: SubtaskType[];
  status: "not started" | "started" | "halfwayish" | "almost done" | "finished";
};
