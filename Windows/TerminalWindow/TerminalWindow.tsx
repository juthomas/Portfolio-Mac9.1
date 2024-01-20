import { useRef, useState } from 'react';
import { Box, Flex, Stack, Text } from '@mantine/core';
import classes from './TerminalWindow.module.css';

type commandsType = {
  [key: string]: () => JSX.Element;
};

export default function TerminalWindow(): JSX.Element {
  const [oldPrompts, setOldPrompts] = useState([{ prompt: 'Hello World!', answer: <></> }]);

  const [prompt, setPrompt] = useState('');

  const ref = useRef<HTMLInputElement | null>(null);

  const [currentDirectory, setCurrentDirectory] = useState('/home/juthomas');

  function formatText(value: string) {
    return (
      <Text style={{ lineHeight: '0.95' }} className={`${classes.text} ${classes.white} `}>
        {value}
      </Text>
    );
  }

  const commands: commandsType = {
    pwd: () => formatText(currentDirectory),
    clear: () => {
      setOldPrompts([]);
      return <></>;
    },
  };

  //   const;

  return (
    <Stack
      onClick={() => {
        ref.current?.focus();
      }}
      w="100%"
      mih="100%"
      pos="relative"
      bg="#222"
      gap={0}
    >
      {oldPrompts.map((elem) => (
        <Box mb={1}>
          <p
            style={{ margin: 0, lineHeight: 0.95, wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}
          >
            <span className={`${classes.text} ${classes.prompt} ${classes.green}`}>➜&nbsp;</span>
            <span className={`${classes.text} ${classes.prompt} ${classes.blue}`}>~&nbsp;</span>
            <span className={`${classes.text} ${classes.white} `}>{elem.prompt}</span>
          </p>
          {elem.answer}
        </Box>
      ))}
      <Flex style={{ marginTop: -5 }}>
        <span className={`${classes.text} ${classes.prompt} ${classes.green}`}>➜&nbsp;</span>
        <span className={`${classes.text} ${classes.prompt} ${classes.blue}`}>~&nbsp;</span>
        <input
          spellCheck="false"
          data-autofocus
          ref={ref}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setOldPrompts((old) => [
                ...old,
                {
                  prompt,
                  answer: commands[prompt]
                    ? commands[prompt]()
                    : formatText(`zsh: command not found: ${prompt}`),
                },
              ]);
              setPrompt('');
            }
          }}
          onChange={(event) => setPrompt(event.target.value)}
          value={prompt}
          className={`${classes.input} ${classes.text} ${classes.white}`}
        />
      </Flex>
    </Stack>
  );
}
