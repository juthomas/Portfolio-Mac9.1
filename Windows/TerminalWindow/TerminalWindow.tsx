import { useRef, useState } from 'react';
import { Flex, Stack } from '@mantine/core';
import classes from './TerminalWindow.module.css';

export default function TerminalWindow(): JSX.Element {
  const [oldPrompts, setOldPrompts] = useState(['Hello World!']);

  const [prompt, setPrompt] = useState('');

  const ref = useRef<HTMLInputElement | null>(null);

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
        <Flex h="20px">
          <span className={`${classes.text} ${classes.prompt} ${classes.green}`}>➜&nbsp;</span>
          <span className={`${classes.text} ${classes.prompt} ${classes.blue}`}>~&nbsp;</span>
          <span className={`${classes.text} ${classes.white} `}>{elem}</span>
          {/* <input
          className={`${classes.input} ${classes.text} ${classes.white} `}
          style={{ width: '100%', maxWidth: '100%', flex: 1 }}
        ></input> */}
        </Flex>
      ))}
      <Flex>
        <span className={`${classes.text} ${classes.prompt} ${classes.green}`}>➜&nbsp;</span>
        <span className={`${classes.text} ${classes.prompt} ${classes.blue}`}>~&nbsp;</span>
        <input
          data-autofocus
          ref={ref}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setOldPrompts((old) => [...old, prompt]);
              setPrompt('');
            }
          }}
          onChange={(event) => setPrompt(event.target.value)}
          value={prompt}
          className={`${classes.input} ${classes.text} ${classes.white} `}
          style={{ width: '100%', maxWidth: '100%', flex: 1 }}
        />
      </Flex>
    </Stack>
  );
}
