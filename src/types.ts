export type TaskType = {
  id: number,
  title: string,
  subtasks: SubtaskType[],
}

export type SubtaskType = {
  id: number,
  title: string,
  workload: 1|2|3|4|5,
  description: string,
  dueDate: Date,
  subtasks: SubtaskType[],
  status: "not started" | "started" |"halfwayish" | "almost done" | "finished",
}
