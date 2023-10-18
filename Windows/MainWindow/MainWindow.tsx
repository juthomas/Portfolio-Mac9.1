import { Flex, List, Space, Text, Title } from '@mantine/core';
import DraggableShortcut from '@/components/DraggableShortcut/DraggableShortcut';

export default function MainWindow(): JSX.Element {
  return (
    <Flex direction="column" align="center" justify="center" h="100%">
      <Title>Julien THOMAS</Title>
      <Text size="xl">Freelance Developper</Text>
      <Space h="lg" />

      <List>
        <List.Item>Creation of websites</List.Item>
        <List.Item>Creation of mobile applications</List.Item>
        <List.Item>Project management</List.Item>
      </List>
      <Space h="lg" />
      <Flex>
        <DraggableShortcut draggable={false} windowId="3" text="My Profile" />
        <DraggableShortcut draggable={false} windowId="3" text="My Projects" />
        <DraggableShortcut draggable={false} windowId="3" text="Contact Me" />
      </Flex>
    </Flex>
  );
}
