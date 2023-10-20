import { Box, Flex, List, Space, Text, Title } from '@mantine/core';
import DraggableShortcut from '@/components/DraggableShortcut/DraggableShortcut';
import classes from '@/styles/theme.module.css';

import linkedin from '@/assets/icons/linkedin.png';
import instagram from '@/assets/icons/instagram.png';
import github from '@/assets/icons/github.png';
import gitlab from '@/assets/icons/gitlab.png';
import discord from '@/assets/icons/discord.png';
import gmail from '@/assets/icons/gmail.png';

export default function ContactWindow(): JSX.Element {
  return (
    <Flex direction="column" align="center" h="100%">
      <Flex direction="column" align="center" h="100%" w="100%" pt="xl" maw="600px">
        <Flex align="center" justify="space-around" maw="1000px" w="100%">
          <DraggableShortcut
            icon={linkedin}
            draggable={false}
            link="https://www.linkedin.com/in/julien-thomas-942b18162/"
            text="LinkedIn"
          />
          <DraggableShortcut
            icon={instagram}
            draggable={false}
            link="https://instagram.com/julien_thomas__?igshid=MzNlNGNkZWQ4Mg=="
            text="Instagram"
          />
          <DraggableShortcut
            icon={github}
            draggable={false}
            link="https://github.com/juthomas"
            text="GitHub"
          />
        </Flex>
        <Flex align="center" justify="space-around" maw="1000px" w="100%" mt="xl">
          <DraggableShortcut
            icon={gitlab}
            draggable={false}
            link="https://gitlab.com/Juthomas"
            text="GitLab"
          />
          <DraggableShortcut
            icon={discord}
            draggable={false}
            link="https://discordapp.com/users/189439718654476288"
            text="Discord"
          />
          <DraggableShortcut
            icon={gmail}
            draggable={false}
            link="mailto:contact@juthomas.fr"
            text="Email"
          />
        </Flex>
        <Space h="xl" />
        <Text ta="left" ml="lg" w="100%">
          Who am I
        </Text>
        <Box my="xs" p="xs" w="100%" bg="white" className={classes.retroBox}>
          <Text ta="left" w="100%">
            {`Passionate and curious, I am a developer graduated from school 42 with more than 5 years
			  of experience. I had the opportunity to work on innovative projects and
			  interesting like the IOTA Project, a concept car, an ARG, a board game
			  electronic or even an innovative hotel site. My favorite languages are
			  TypeScript, React.js, Mantine and Three.js. Do not hesitate to contact me to discuss
			  of your needs and bring your creative and ambitious ideas to life.`}
          </Text>
        </Box>
        <Space h="lg" />
        <Text ta="left" ml="lg" w="100%">
          My Services
        </Text>
        <Flex w="100%">
          <Box w="100%">
            <Text ta="left" w="100%">
              Applications creating
            </Text>
            <Box my="xs" p="xs" w="100%" bg="white" className={classes.retroBox}>
              <List>
                <List.Item>Websites</List.Item>
                <List.Item>Mobile applications</List.Item>
                <List.Item>Augmented reality</List.Item>
                <List.Item>Video games (Windows, Max, Linux, Mobile)</List.Item>
                <List.Item>Electronic development</List.Item>
              </List>
            </Box>
          </Box>
          <Space w="lg" />
          <Box w="100%">
            <Text ta="left" w="100%">
              Support and advice
            </Text>
            <Box my="xs" p="xs" w="100%" bg="white" className={classes.retroBox}>
              <List>
                <List.Item>UX model</List.Item>
                <List.Item>Specifications</List.Item>
                <List.Item>Augmented reality</List.Item>
                <List.Item>Hosting</List.Item>
                <List.Item>Server configuration</List.Item>
              </List>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}
