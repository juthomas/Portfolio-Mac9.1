import { useContext, useRef, useState } from 'react';
import { Box, Flex, Stack, Text } from '@mantine/core';
import classes from './TerminalWindow.module.css';
import { WindowManagerContext } from '@/components/WindowsManager/WindowManagerProvider';

type commandsType = {
  [key: string]: (param: string) => JSX.Element;
};

type fileSystemType = {
  [key: string]: fileSystemType | (() => void | string) | string;
};

const homeDirectory = 'Users/juthomas';

export default function TerminalWindow(): JSX.Element {
  const windowContext = useContext(WindowManagerContext);

  const fileSystem: fileSystemType = {
    Applications: {},
    Library: {},
    System: {},
    Users: {
      juthomas: {
        //   'README.md': 'onefortree',
        'README.md':
          'Welcome to my portfolio terminal!\nSupported commands are:\n - cat   : Print .md & .txt files\n - cd    : Change directory\n - clear : Clear terminal \n - ls    : List directory\n - open  : Open .app files\n - pwd   : Current directory\n',
        Applications: {
          'Onefortree.app': () => {
            windowContext?.OpenWindow && windowContext?.OpenWindow('onefortree');
          },
          'Portfolio.app': () => {
            windowContext?.OpenWindow && windowContext?.OpenWindow('main');
          },
          'Profile.app': () => {
            windowContext?.OpenWindow && windowContext?.OpenWindow('profile');
          },
          'Contact.app': () => {
            windowContext?.OpenWindow && windowContext?.OpenWindow('contact');
          },
          'Projects.app': () => {
            windowContext?.OpenWindow && windowContext?.OpenWindow('projects');
          },
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
  const [currentDirectory, setCurrentDirectory] = useState(homeDirectory);

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
    if (!param) return 'Usage: cat [filename]';

    const newPath =
      param[0] === '/'
        ? param.replace(/(?<!^)\/$/, '')
        : `${currentDirectory}/${param}`.replace(/(?<!^)\/$/, '').replace('//', '/');

    const pathParts = newPath.split('/').filter((part) => part.length > 0);

    let currentPath = fileSystem;
    let outputMessage = null;

    pathParts.some((part) => {
      if (currentPath[part]) {
        if (typeof currentPath[part] === 'function') {
          outputMessage = `cat : ${param}: Not a text file`;
          return true; // Arrête l'itération
        }

        if (typeof currentPath[part] === 'string') {
          outputMessage = currentPath[part];
          return true; // Arrête l'itération
        }
        if (typeof currentPath[part] === 'object') {
          currentPath = currentPath[part] as fileSystemType;
          return false; // Continue l'itération
        }
        return false; // Continue l'itération
      }
      outputMessage = `cat : ${param}: Cannot open file`;
      return true; // Arrête l'itération
    });

    return outputMessage;
  }

  function openCommand(param: string) {
    if (!param) return 'Usage: open [filename]';

    const newPath =
      param[0] === '/'
        ? param.replace(/(?<!^)\/$/, '')
        : `${currentDirectory}/${param}`.replace(/(?<!^)\/$/, '').replace('//', '/');

    const pathParts = newPath.split('/').filter((part) => part.length > 0);

    let currentPath = fileSystem;
    let outputMessage = null;

    pathParts.some((part) => {
      if (currentPath[part]) {
        if (typeof currentPath[part] === 'function') {
          const appFunction = currentPath[part];
          outputMessage = typeof appFunction === 'function' ? appFunction() : null;
          return true; // Arrête l'itération
        }
        if (typeof currentPath[part] === 'string') {
          outputMessage = `open : ${param}: Not an executable file`;
          return true; // Arrête l'itération
        }
        if (typeof currentPath[part] === 'object') {
          currentPath = currentPath[part] as fileSystemType;
          return false; // Continue l'itération
        }
        return false; // Continue l'itération
      }
      outputMessage = `open : ${param}: Cannot open file`;
      return true; // Arrête l'itération
    });

    return outputMessage;
  }

  function changeDirectory(param: string) {
    if (param === '') {
      setCurrentDirectory(homeDirectory);
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
      location: homeDirectory,
      answer: (
        <>
          {formatText(
            'Welcome to my portfolio terminal!\nSupported commands are:\n - cat   : Print .md & .txt files\n - cd    : Change directory\n - clear : Clear terminal \n - ls    : List directory\n - open  : Open .app files\n - pwd   : Current directory\n'
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
    if (path === homeDirectory) {
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
