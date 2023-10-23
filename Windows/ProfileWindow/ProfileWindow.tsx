import Image from 'next/image';
import { Box, Flex, List, Space, Text, Title } from '@mantine/core';
import DraggableShortcut from '@/components/DraggableShortcut/DraggableShortcut';
import juthomasPicture from '@/assets/juthomas-picture.png';
import contactIcon from '@/assets/icons/folderContact.png';
import classes from '@/styles/theme.module.css';

export default function ProfileWindow(): JSX.Element {
  return (
    <Flex direction="column" align="center" h="100%">
      <Flex
        direction="column"
        align="center"
        h="100%"
        w="100%"
        pt="xl"
        px="5%"
        maw="calc(700px + 5%)"
      >
        <Flex align="center" justify="space-between" maw="1000px" w="100%">
          <Box h={130} className={classes.retroBox}>
            <Image alt="juthomas picture" src={juthomasPicture} height={130} />
          </Box>
          <Title mx="lg" ta="center">
            Julien THOMAS
          </Title>
          <DraggableShortcut
            draggable={false}
            icon={contactIcon}
            windowId="contact"
            text="Contact Me"
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
