import { Input, Checkbox, Button, ConfigProvider } from "antd";
import { useEffect, useState, type ChangeEventHandler, type KeyboardEventHandler } from "react";
import { v4 as uuidv4 } from "uuid";
import { CardStyled, ContainerStyled, FooterStyled, GlobalStyle, SettingsAreaStyled, TabsStyled, TasksListStyled, TaskTextStyled, TextStyled, themeConfig, TitleStyled } from "./App.styles";
import type { ITask, TTaskTypes } from "./App.types";
import { useTranslation } from "react-i18next";

function App() {
  const { t, i18n } = useTranslation();

  const localStorageTasks = localStorage.getItem("tasks");
  const [tasks, setTasks] = useState<ITask[]>(localStorageTasks ? JSON.parse(localStorageTasks) : []);
  const [newTaskText, setNewTaskText] = useState("");
  const [filter, setFilter] = useState<TTaskTypes>("All");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

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
        <TitleStyled className="title">{t("title")}</TitleStyled>
        <CardStyled>
          <Input value={newTaskText} onChange={inputChangeHandler} variant="underlined" onPressEnter={addNewTask} data-testid="new-task-input" placeholder={t("placeholder")} />
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
              { key: "All", label: t("all") },
              { key: "Active", label: t("active") },
              { key: "Completed", label: t("completed") },
            ]}
          />
          <FooterStyled>
            <TextStyled>{t("left", { count: tasks.filter((t) => !t.checked).length })}</TextStyled>
            <Button data-testid="clear-button" onClick={clearCompleted}>
              {t("clear")}
            </Button>
          </FooterStyled>
        </CardStyled>
        <SettingsAreaStyled>
          <Button data-testid="lang-button" className="langButton" onClick={() => i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru")}>
            {i18n.language === "ru" ? "RU" : "EN"}
          </Button>
        </SettingsAreaStyled>
      </ContainerStyled>
    </ConfigProvider>
  );
}

export default App;
