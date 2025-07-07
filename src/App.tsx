import { Input, Typography, Card, Checkbox, Flex, Radio, Button } from "antd";

const { Title } = Typography;

function App() {
  const tasks = ["сделать TODO", "пофиксить баги"];

  return (
    <>
      <Title>todos</Title>
      <Card>
        <Input name="new_task" variant="underlined" placeholder="введите новую задачу..." />
        <Flex vertical>
          {tasks.map((task) => (
            <Checkbox>{task}</Checkbox>
          ))}
        </Flex>
        <Flex>
          <Radio.Group defaultValue="All">
            <Radio.Button value="All">все</Radio.Button>
            <Radio.Button value="Active">активные</Radio.Button>
            <Radio.Button value="Completed">выполненные</Radio.Button>
          </Radio.Group>
          <Button>очистить выполненные</Button>
        </Flex>
      </Card>
    </>
  );
}

export default App;
