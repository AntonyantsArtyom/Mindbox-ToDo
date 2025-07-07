import { Input, Checkbox, Flex, Button, ConfigProvider, Tabs } from "antd";
import { useState, type KeyboardEventHandler } from "react";
import { v4 as uuidv4 } from "uuid";
import { CardStyled, ContainerStyled, GlobalStyle, TextStyled, themeConfig, TitleStyled } from "./App.styles";

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
        <CardStyled>
          <Input variant="underlined" onPressEnter={addNewTask} name="new_task" placeholder="введите новую задачу..." />
          <Flex vertical>
            {filteredTasks.map((task) => (
              <Checkbox key={task.value} checked={task.checked} onChange={() => toggleChecked(task.value)}>
                {task.description}
              </Checkbox>
            ))}
          </Flex>
          <Tabs
            activeKey={filter}
            onChange={(key) => setFilter(key as "All" | "Active" | "Completed")}
            items={[
              { key: "All", label: "все задачи" },
              { key: "Active", label: "активные" },
              { key: "Completed", label: "завершенные" },
            ]}
          />
          <Flex align="center" justify="space-between">
            <TextStyled>осталось задач: {tasks.filter((t) => !t.checked).length}</TextStyled>
            <Button onClick={clearCompleted}>убрать завершенные</Button>
          </Flex>
        </CardStyled>
      </ContainerStyled>
    </ConfigProvider>
  );
}

export default App;
