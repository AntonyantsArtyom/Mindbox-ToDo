import { Input, Card, Checkbox, Flex, Radio, Button, ConfigProvider } from "antd";
import { useState, type KeyboardEventHandler } from "react";
import { v4 as uuidv4 } from "uuid";
import { ContainerStyled, GlobalStyle, themeConfig, TitleStyled } from "./App.styles";

interface ITask {
  value: string;
  description: string;
  checked: boolean;
}

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [filter, setFilter] = useState<"All" | "Active" | "Completed">("All");

  const addNewTask: KeyboardEventHandler<HTMLInputElement> = (e) => {
    const value = e.currentTarget.value.trim();
    if (!value) return;

    setTasks((tasks) => [
      ...tasks,
      {
        value: uuidv4(),
        description: value,
        checked: false,
      },
    ]);

    e.currentTarget.value = "";
  };

  const toggleChecked = (value: string) => {
    setTasks((tasks) => tasks.map((task) => (task.value === value ? { ...task, checked: !task.checked } : task)));
  };

  const clearCompleted = () => {
    setTasks((tasks) => tasks.filter((task) => !task.checked));
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
        <Card>
          <Input onPressEnter={addNewTask} name="new_task" placeholder="введите новую задачу..." />
          <Flex vertical>
            {filteredTasks.map((task) => (
              <Checkbox key={task.value} checked={task.checked} onChange={() => toggleChecked(task.value)}>
                {task.description}
              </Checkbox>
            ))}
          </Flex>
          <Flex>
            <Radio.Group value={filter} onChange={(e) => setFilter(e.target.value)}>
              <Radio.Button value="All">все</Radio.Button>
              <Radio.Button value="Active">активные</Radio.Button>
              <Radio.Button value="Completed">выполненные</Radio.Button>
            </Radio.Group>
            <Button onClick={clearCompleted}>очистить выполненные</Button>
          </Flex>
        </Card>
      </ContainerStyled>
    </ConfigProvider>
  );
}

export default App;
