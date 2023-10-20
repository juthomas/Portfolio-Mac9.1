import { Flex, List, Space, Text, Title } from '@mantine/core';
import DraggableShortcut from '@/components/DraggableShortcut/DraggableShortcut';
import profileIcon from '@/assets/icons/folderProfile.png';
import projectsIcon from '@/assets/icons/folderProjects.png';
import contactIcon from '@/assets/icons/folderContact.png';

export default function MainWindow(): JSX.Element {
  return (
    <Flex direction="column" align="center" h="100%" pt="xl">
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
        <DraggableShortcut draggable={false} icon={profileIcon} windowId="profile" text="My Profile" />
        <DraggableShortcut draggable={false} icon={projectsIcon} windowId="projects" text="My Projects" />
        <DraggableShortcut draggable={false} icon={contactIcon} windowId="contact" text="Contact Me" />
      </Flex>
    </Flex>
  );
}
