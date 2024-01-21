import { useContext, useRef, useState } from 'react';
import { Box, Flex, Stack, Text } from '@mantine/core';
import classes from './TerminalWindow.module.css';
import { WindowManagerContext } from '@/components/WindowsManager/WindowManagerProvider';

type commandsType = {
  [key: string]: (param: string) => JSX.Element;
};

type fileSystemType = {
  [key: string]: fileSystemType | (() => void) | string;
};

export default function TerminalWindow(): JSX.Element {
  const windowContext = useContext(WindowManagerContext);

  const fileSystem: fileSystemType = {
    Applications: {},
    Library: {},
    System: {},
    Users: {
      juthomas: {
        //   'README.md': 'onefortree',
        Applications: {
          Onefortree: () => {
            windowContext?.OpenWindow && windowContext?.OpenWindow('onefortree');
          },
          Portfolio: 'main',
          Profile: 'profile',
          Contact: 'contact',
          Projects: 'projects',
        },
        Desktop: {},
        Documents: {},
        Downloads: {},
        Library: {},
        Movies: {},
        Music: {},
        Pictures: {},
        Public: {},
      },
      guest: {
        Applications: {},
        Desktop: {},
        Documents: {},
        Downloads: {},
        Library: {},
        Movies: {},
        Music: {},
        Pictures: {},
        Public: {},
      },
    },
    Volumes: {},
    bin: {},
    cores: {},
    dev: {},
    etc: {},
    home: {},
    opt: {},
    private: {},
    sbin: {},
    tmp: {},
    usr: {},
    var: {},
  };
  const [currentDirectory, setCurrentDirectory] = useState('/Users/juthomas');

  function listDirectory(param: string) {
    let directoryToList = currentDirectory;

    if (param) {
      const newPath =
        param[0] === '/'
          ? param.replace(/(?<!^)\/$/, '')
          : `${currentDirectory}/${param}`.replace(/(?<!^)\/$/, '').replace('//', '/');

      const pathParts = newPath.split('/').filter((part) => part.length > 0);

      let currentPath = fileSystem;
      const exists = pathParts.every((part) => {
        if (currentPath[part] && typeof currentPath[part] === 'object') {
          currentPath = currentPath[part] as fileSystemType;
          return true;
        }
        return false;
      });

      if (!exists) {
        return `ls: ${param}: No such file or directory`;
      }
      directoryToList = newPath;
    }

    const pathParts = directoryToList.split('/').filter((part) => part.length > 0);

    let currentPath = fileSystem;
    const pathExists = pathParts.every((part) => {
      if (typeof currentPath[part] === 'object' && currentPath[part] !== null) {
        currentPath = currentPath[part] as fileSystemType;
        return true; // Continue l'itération
      }
      return false; // Arrête l'itération
    });

    if (!pathExists) {
      return `ls: ${directoryToList}: No such file or directory`;
    }

    // Récupérer les clés du répertoire courant pour les lister
    return Object.keys(currentPath).join('\n');
  }

  function catCommand(param: string) {
    if (!param) return 'Usage: open [filename]';

    const newPath =
      param[0] === '/'
        ? param.replace(/(?<!^)\/$/, '')
        : `${currentDirectory}/${param}`.replace(/(?<!^)\/$/, '').replace('//', '/');

    const pathParts = newPath.split('/').filter((part) => part.length > 0);

    let currentPath = fileSystem;
    let foundFile = null;

    pathParts.some((part) => {
      if (currentPath[part]) {
        if (typeof currentPath[part] === 'string') {
          foundFile = currentPath[part];
          return true; // Arrête l'itération
        }
        if (typeof currentPath[part] === 'object') {
          currentPath = currentPath[part] as fileSystemType;
          return false; // Continue l'itération
        }
        return false; // Continue l'itération
      }
      foundFile = `cat : ${param}: Cannot open file`;
      return true; // Arrête l'itération
    });

    return foundFile || `cat : ${param}: Not a text file`;
  }

  function openCommand(param: string) {
    if (param) {
      const newPath =
        param[0] === '/'
          ? param.replace(/(?<!^)\/$/, '')
          : `${currentDirectory}/${param}`.replace(/(?<!^)\/$/, '').replace('//', '/');

      const pathParts = newPath.split('/').filter((part) => part.length > 0);

      let currentPath = fileSystem;
      const exists = pathParts.every((part) => {
        if (currentPath[part]) {
          if (typeof currentPath[part] === 'function') {
            const appFunction = currentPath[part];
            typeof appFunction === 'function' && appFunction();
            return false;
          }
          // 	if (typeof currentPath[part] === 'string') {
          //     const windowId = currentPath[part];
          //     typeof windowId === 'string' &&
          //       windowContext?.OpenWindow &&
          //       windowContext?.OpenWindow(windowId);
          //     return false;
          //   }
          if (typeof currentPath[part] === 'object') {
            currentPath = currentPath[part] as fileSystemType;
            return true;
          }
        }
        return true;
      });

      if (exists) {
        return `open : ${param}: Cant open file`;
      }
      return '';
    }
    return 'Usage: open [filename]';
  }

  function changeDirectory(param: string) {
    if (param === '') {
      setCurrentDirectory('/Users/juthomas');
      return '';
    }
    if (param === '..') {
      const lastSlashIndex = currentDirectory.lastIndexOf('/');
      setCurrentDirectory(
        lastSlashIndex !== -1
          ? currentDirectory.substring(0, lastSlashIndex + 1).replace(/(?<!^)\/$/, '')
          : currentDirectory
      );
      return '';
    }
    const newPath =
      param[0] === '/'
        ? param.replace(/(?<!^)\/$/, '')
        : `${currentDirectory}/${param}`.replace(/(?<!^)\/$/, '').replace('//', '/');

    const pathParts = newPath.split('/').filter((part) => part.length > 0);

    let currentPath = fileSystem;
    const error = pathParts.every((part) => {
      if (currentPath[part] && typeof currentPath[part] === 'object') {
        currentPath = currentPath[part] as fileSystemType;
        return true;
      }
      return false;
    });

    if (!error) {
      return `cd: no such file or directory: ${param}`;
    }
    setCurrentDirectory(newPath);
    return '';
  }

  function formatText(value: string) {
    const lines = value.split('\n').map((line, index) => (
      // Utilisation de l'index comme clé n'est recommandée que si la liste des lignes ne change pas
      <span key={index}>
        {line}
        {index < value.split('\n').length - 1 && <br />}
      </span>
    ));

    return (
      <Text
        style={{ lineHeight: '0.95', whiteSpace: 'pre-wrap' }}
        className={`${classes.text} ${classes.white} `}
      >
        {lines}
      </Text>
    );
  }
  const [oldPrompts, setOldPrompts] = useState([
    {
      prompt: '',
      location: '/Users/juthomas',
      answer: (
        <>
          {formatText(
            'Welcome to my portfolio terminal!\nSupported commands are:\n - clear  - open\n - ls     - cd\n - pwd    - cat'
          )}
        </>
      ),
    },
  ]);

  const commands: commandsType = {
    pwd: () => formatText(currentDirectory),
    clear: () => {
      setOldPrompts([]);
      return <></>;
    },
    cd: (params) => {
      const output = changeDirectory(params);
      return <>{output && formatText(output)} </>;
    },
    ls: (params) => {
      const output = listDirectory(params);
      return <>{output && formatText(output)} </>;
    },
    open: (params) => {
      const output = openCommand(params);
      return <>{output && formatText(output)} </>;
    },
    cat: (params) => {
      const output = catCommand(params);
      return <>{output && formatText(output)} </>;
    },
  };

  const [prompt, setPrompt] = useState('');

  const ref = useRef<HTMLInputElement | null>(null);

  function splitFirstWord(text: string): [string, string] {
    // Trouver l'index du premier espace
    const firstSpaceIndex = text.indexOf(' ');

    // Si aucun espace n'est trouvé, retourner toute la chaîne comme le premier mot
    if (firstSpaceIndex === -1) {
      return [text, ''];
    }

    // Extraire le premier mot
    const firstWord = text.substring(0, firstSpaceIndex);

    // Extraire le reste de la phrase
    const restOfSentence = text.substring(firstSpaceIndex + 1);

    return [firstWord, restOfSentence];
  }

  function getCurrentDirectory(path: string) {
    if (path === '/Users/juthomas') {
      return '~';
    }
    return path.match(/^(\/[^/]*)$|\/([^/]*)$/)?.[1] || path.match(/\/([^/]*)$/)?.[1] || '';
  }

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
      style={{ cursor: 'text' }}
    >
      {oldPrompts.map((elem, index) => (
        <Box mb={1} key={index}>
          {elem.prompt && (
            <p
              style={{
                margin: 0,
                lineHeight: 0.95,
                wordBreak: 'break-all',
                whiteSpace: 'pre-wrap',
              }}
            >
              <span className={`${classes.text} ${classes.prompt} ${classes.green}`}>➜&nbsp;</span>
              <span className={`${classes.text} ${classes.prompt} ${classes.blue}`}>
                {getCurrentDirectory(elem.location)}&nbsp;
              </span>
              <span className={`${classes.text} ${classes.white} `}>{elem.prompt}</span>
            </p>
          )}
          {elem.answer}
        </Box>
      ))}
      <Flex style={{ marginTop: -5 }}>
        <span className={`${classes.text} ${classes.prompt} ${classes.green}`}>➜&nbsp;</span>
        <span className={`${classes.text} ${classes.prompt} ${classes.blue}`}>
          {getCurrentDirectory(currentDirectory)}&nbsp;
        </span>
        <input
          spellCheck="false"
          data-autofocus
          ref={ref}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const [promptFunction, promptParams] = splitFirstWord(prompt);

              setOldPrompts((old) => [
                ...old,
                {
                  prompt: prompt || ' ',
                  location: currentDirectory,
                  answer: !promptFunction ? (
                    <></>
                  ) : commands[promptFunction] ? (
                    commands[promptFunction](promptParams)
                  ) : (
                    formatText(`zsh: command not found: ${promptFunction}`)
                  ),
                },
              ]);
              setPrompt('');
            }
            if (e.key === 'Tab') e.preventDefault();
            if (e.key === 'ArrowUp') {
              oldPrompts?.length && setPrompt(oldPrompts[(oldPrompts?.length || 1) - 1].prompt);
            }
            console.log('Key pressed :', e.key);
          }}
          onChange={(event) => setPrompt(event.target.value)}
          value={prompt}
          className={`${classes.input} ${classes.text} ${classes.white}`}
        />
      </Flex>
    </Stack>
  );
}
