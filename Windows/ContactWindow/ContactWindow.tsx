import { Box, Button, Flex, Group, Space, Text, TextInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import axios from 'axios';
import Image from 'next/image';
import { notifications } from '@mantine/notifications';

import DraggableShortcut from '@/components/DraggableShortcut/DraggableShortcut';
import classes from '@/styles/theme.module.css';

import linkedin from '@/assets/icons/linkedin.png';
import instagram from '@/assets/icons/instagram.png';
import github from '@/assets/icons/github.png';
import gitlab from '@/assets/icons/gitlab.png';
import discord from '@/assets/icons/discord.png';
import gmail from '@/assets/icons/gmail.png';
import letter from '@/assets/icons/letter.png';

export interface ContactFormProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactWindow(): JSX.Element {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validate: {
      name: (value) => (value.length < 1 ? 'Name cannot be blank' : null),
      email: (value) =>
        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value) ? null : 'Invalid mail',
      subject: (value) => (value.length < 1 ? 'Subject cannot be blank' : null),
      message: (value) => (value.length < 1 ? 'Message cannot be blank' : null),
    },
  });

  const onSubmit = async (values: ContactFormProps) => {
    try {
      const response = await axios.post('/api/sendmail', values);
      console.log(response.data); // Affiche la réponse du serveur dans la console
      notifications.show({
        message: <Text>{'Message envoyé !'}</Text>,
      });

      // Faites ce que vous souhaitez avec la réponse du serveur (par exemple, afficher un message à l'utilisateur)
    } catch (error) {
      console.error('Error sending email:', error);
      notifications.show({
        message: <Text>{"Le message n'a pas pu être envoyé..."}</Text>,
      });
    }
  };

  return (
    <Flex direction="column" align="center" h="100%">
      <Flex direction="column" align="center" h="100%" w="100%" pt="xl" mt="lg" maw="600px">
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

        <Text ta="left" ml="lg" my="xs" w="100%">
          Contact form
        </Text>
        <form style={{ width: '100%' }} onSubmit={form.onSubmit(onSubmit)}>
          <Box style={{ display: 'flex', flexDirection: 'column' }}>
            <Group grow style={{ alignItems: 'flex-start' }}>
              <TextInput
                styles={{
                  input: {
                    borderRadius: 0,
                    border: 0,
                    fontSize: 'var(--mantine-font-size-md)',
                  },
                  root: { height: 70 },
                  error: {
                    fontSize: 'var(--mantine-font-size-md)',
                  },
                }}
                classNames={{ wrapper: classes.retroBox }}
                placeholder="Name..."
                {...form.getInputProps('name')}
              />
              <TextInput
                styles={{
                  input: {
                    borderRadius: 0,
                    border: 0,
                    fontSize: 'var(--mantine-font-size-md)',
                  },
                  root: { height: 70 },
                  error: {
                    fontSize: 'var(--mantine-font-size-md)',
                  },
                }}
                classNames={{ wrapper: classes.retroBox }}
                placeholder="Mail..."
                {...form.getInputProps('email')}
              />
            </Group>
            {/* <Space h="lg" /> */}
            <TextInput
              styles={{
                input: {
                  borderRadius: 0,
                  border: 0,
                  fontSize: 'var(--mantine-font-size-md)',
                },
                root: { height: 70 },
                error: {
                  fontSize: 'var(--mantine-font-size-md)',
                },
              }}
              classNames={{ wrapper: classes.retroBox }}
              placeholder="Subject..."
              {...form.getInputProps('subject')}
            />
            <Textarea
              styles={{
                input: {
                  borderRadius: 0,
                  border: 0,
                  fontSize: 'var(--mantine-font-size-md)',
                },
                error: {
                  fontSize: 'var(--mantine-font-size-md)',
                  height: 0,
                },
                wrapper: {
                  marginBottom: 5,
                },
              }}
              classNames={{ wrapper: classes.retroBox }}
              autosize
              minRows={5}
              maxRows={12}
              placeholder="Message..."
              {...form.getInputProps('message')}
            />
            <Group justify="flex-end" mt="md">
              <Button
                c="black"
                h={30}
                leftSection={
                  <Image
                    style={{ imageRendering: 'pixelated', marginBottom: 2 }}
                    src={letter}
                    alt="letterIcon"
                  />
                }
                className={classes.retroButton}
                type="submit"
              >
                <Text>Send</Text>
              </Button>
            </Group>
          </Box>
        </form>
      </Flex>
    </Flex>
  );
}
