import { Input, Checkbox, Flex, Button, ConfigProvider } from "antd";
import { useState, type ChangeEventHandler, type KeyboardEventHandler } from "react";
import { v4 as uuidv4 } from "uuid";
import { CardStyled, ContainerStyled, GlobalStyle, TabsStyled, TasksListStyled, TaskTextStyled, TextStyled, themeConfig, TitleStyled } from "./App.styles";

interface ITask {
  value: string;
  description: string;
  checked: boolean;
}

type TTaskTypes = "All" | "Active" | "Completed";

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [filter, setFilter] = useState<TTaskTypes>("All");

  const addNewTask: KeyboardEventHandler<HTMLInputElement> = () => {
    const value = newTaskText.trim();
    if (!value) return;

    setTasks((tasks) => [
      ...tasks,
      {
        value: uuidv4(),
        description: value,
        checked: false,
      },
    ]);

    setNewTaskText("");
  };

  const toggleChecked = (value: string) => {
    setTasks((tasks) => tasks.map((task) => (task.value === value ? { ...task, checked: !task.checked } : task)));
  };

  const clearCompleted = () => {
    setTasks((tasks) => tasks.filter((task) => !task.checked));
  };

  const inputChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNewTaskText(e.target.value);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Active") return !task.checked;
    if (filter === "Completed") return task.checked;
    return true;
  });

  return (
    <ConfigProvider theme={themeConfig}>
      <GlobalStyle />
      <ContainerStyled>
        <TitleStyled>todos</TitleStyled>
        <CardStyled>
          <Input value={newTaskText} onChange={inputChangeHandler} variant="underlined" onPressEnter={addNewTask} name="new_task" placeholder="введите новую задачу..." />
          <TasksListStyled>
            {filteredTasks.map((task) => (
              <Checkbox key={task.value} checked={task.checked} onChange={() => toggleChecked(task.value)}>
                <TaskTextStyled checked={task.checked}>{task.description}</TaskTextStyled>
              </Checkbox>
            ))}
          </TasksListStyled>
          <TabsStyled
            activeKey={filter}
            onChange={(key) => setFilter(key as TTaskTypes)}
            items={[
              { key: "All", label: "все задачи" },
              { key: "Active", label: "активные" },
              { key: "Completed", label: "завершенные" },
            ]}
          />
          <Flex align="center" justify="space-between">
            <TextStyled>осталось задач: {tasks.filter((t) => !t.checked).length}</TextStyled>
            <Button onClick={clearCompleted}>очистить завершенные</Button>
          </Flex>
        </CardStyled>
      </ContainerStyled>
    </ConfigProvider>
  );
}

export default App;
