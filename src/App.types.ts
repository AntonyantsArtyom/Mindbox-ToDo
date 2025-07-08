export interface ITask {
  value: string;
  description: string;
  checked: boolean;
}

export type TTaskTypes = "All" | "Active" | "Completed";
