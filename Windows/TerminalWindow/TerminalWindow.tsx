/* eslint-disable @typescript-eslint/no-use-before-define */
import { useContext, useEffect, useRef, useState } from 'react';
import { Box, Flex, Stack, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import classes from './TerminalWindow.module.css';
import { WindowManagerContext } from '@/components/WindowsManager/WindowManagerProvider';
import { ScrollAreaWindowContext } from '@/components/DraggableElement/DraggableElement';

type fileSystemType = {
  [key: string]: fileSystemType | ((params?: string) => void | string | JSX.Element) | string;
};

const homeDirectory = '/Users/juthomas';

export default function TerminalWindow(): JSX.Element {
  const router = useRouter();
  const [currentDirectory, setCurrentDirectory] = useState(homeDirectory);
  const [oldDirectory, setOldDirectory] = useState(homeDirectory);
  const [lastPromptError, setLastPromptError] = useState(false);
  const windowContext = useContext(WindowManagerContext);

  const currentDirectoryRef = useRef(currentDirectory);

  useEffect(() => {
    currentDirectoryRef.current = currentDirectory; // Met à jour la référence à chaque changement de monEtat
  }, [currentDirectory]);

  const oldDirectoryRef = useRef(oldDirectory);

  useEffect(() => {
    oldDirectoryRef.current = oldDirectory; // Met à jour la référence à chaque changement de monEtat
  }, [oldDirectory]);

  function openApplication(appId: string) {
    setTimeout(() => {
      windowContext?.OpenWindow && windowContext?.OpenWindow(appId);
    }, 200);
  }

  const [fileSystem, setFileSystem] = useState<fileSystemType>({
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
            openApplication('onefortree');
          },
          'Portfolio.app': () => {
            openApplication('main');
          },
          'Profile.app': () => {
            openApplication('profile');
          },
          'Contact.app': () => {
            openApplication('contact');
          },
          'Projects.app': () => {
            openApplication('projects');
          },
        },
        Desktop: {},
        Documents: {
          'Passwords.app': () => {
            window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank', 'noreferrer');
            return 'eheheh boi';
          },
        },
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
    bin: {
      cat: (params) => {
        const output = catCommand(params || '');
        return <>{output && formatText(output)} </>;
      },
      cd: (params) => {
        const output = changeDirectory(params || '');
        return <>{output && formatText(output)} </>;
      },
      clear: () => {
        setLastPromptError(false);
        setOldPrompts([]);
        return <></>;
      },
      cmds: () => {
        setLastPromptError(false);
        const keysString = `Supported commands are:\n${Object.keys(commands)
          .map((key) => ` - ${key}`)
          .join('\n')}`;

        setFileSystem((prevOuter) => {
          // Assurez-vous que prevOuter est un objet et contient la clé outerKey
          if (prevOuter && typeof prevOuter === 'object' && prevOuter['bin']) {
            // Copie profonde du dictionnaire interne
            const newInner = { ...prevOuter['bin'] }; // Ici, prevOuter[outerKey] doit être un objet

            // Supprime la clé du nouveau dictionnaire interne
            delete newInner['cmds'];

            // Retourne un nouvel objet avec le dictionnaire interne mis à jour
            return { ...prevOuter, ['bin']: newInner };
          }
          return prevOuter;
        });

        return formatText(keysString);
      },
      ls: (params) => {
        const output = listDirectory(params || '');
        return <>{output && formatText(output)} </>;
      },
      open: (params) => {
        const output = openCommand(params || '');
        return <>{output}</>;
      },
      pwd: () => {
        setLastPromptError(false);
        return formatText(currentDirectoryRef.current);
      },
      reboot: () => {
        setTimeout(() => {
          router.push('/restart');
        }, 200);
        return <></>;
      },
      rm: (params) => {
        const output = rmCommand(params || '');
        return <>{output && formatText(output)} </>;
      },
      shutdown: () => {
        setTimeout(() => {
          router.push('/shutdown');
        }, 200);
        return <></>;
      },
    },
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
  } as fileSystemType);

  const fileSystemRef = useRef(fileSystem);

  useEffect(() => {
    fileSystemRef.current = fileSystem; // Met à jour la référence à chaque changement de monEtat
  }, [fileSystem]);

  function listDirectory(param: string) {
    let directoryToList = currentDirectoryRef.current;

    if (param) {
      const newPath =
        param[0] === '/'
          ? param.replace(/(?<!^)\/$/, '')
          : `${currentDirectoryRef.current}/${param}`.replace(/(?<!^)\/$/, '').replace('//', '/');

      const pathParts = newPath.split('/').filter((part) => part.length > 0);

      let currentPath = fileSystemRef.current;
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

    let currentPath = fileSystemRef.current as fileSystemType;
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
    setLastPromptError(false);

    // Récupérer les clés du répertoire courant pour les lister
    return Object.keys(currentPath).join('\n');
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

  // Fonction pour modifier une valeur dans un dictionnaire imbriqué
  function modifyNestedValue(dictionary: NestedDictionary, keys: string[], newValue: any) {
    let currentLevel = dictionary;

    // Parcourir toutes les clés sauf la dernière
    for (let i = 0; i < keys.length - 1; i += 1) {
      const key = keys[i];

      // Vérifier si la clé existe
      if (!(key in currentLevel)) {
        throw new Error(`Key not found: ${key}`);
      }

      currentLevel = currentLevel[key];
    }

    // La dernière clé est celle de la valeur à modifier
    const lastKey = keys[keys.length - 1];
    if (!(lastKey in currentLevel)) {
      throw new Error(`Key not found: ${lastKey}`);
    }

    // Modifier la valeur
    currentLevel[lastKey] = newValue;
  }

  function rmCommand(param: string) {
    if (!param) return 'Usage: rm [filename]';

    const newPath =
      param[0] === '/'
        ? param.replace(/(?<!^)\/$/, '')
        : `${currentDirectoryRef.current}/${param}`.replace(/(?<!^)\/$/, '').replace('//', '/');

    const pathParts = newPath.split('/').filter((part) => part.length > 0);

    let currentPath = fileSystemRef.current;
    const exists = pathParts.every((part, index) => {
      if (currentPath[part] && pathParts.length === index + 1) {
        delete currentPath[part];
        return true;
      }
      if (currentPath[part]) {
        currentPath = currentPath[part] as fileSystemType;
        return true;
      }
      return false;
    });

    setFileSystem(currentPath);

    // let currentPath = fileSystemRef.current;
    // const exists = pathParts.every((part, index) => {
    //   if (currentPath[part]) {
    //     if (pathParts.length === index + 1) {
    //       // Supprime toutes les propriétés de l'objet
    //       Object.keys(currentPath[part]).forEach((key) => {
    //         delete currentPath[part][key];
    //       });
    //       return true;
    //     }
    //     currentPath = currentPath[part];
    //     return true;
    //   }
    //   return false;
    // });
    // setFileSystem((prevOuter) => {
    //   // Assurez-vous que prevOuter est un objet et contient la clé outerKey
    //   if (prevOuter && typeof prevOuter === 'object' && prevOuter['bin']) {
    //     // Copie profonde du dictionnaire interne
    //     const newInner = { ...prevOuter['bin'] }; // Ici, prevOuter[outerKey] doit être un objet

    //     // Supprime la clé du nouveau dictionnaire interne
    //     delete newInner['cmds'];

    //     // Retourne un nouvel objet avec le dictionnaire interne mis à jour
    //     return { ...prevOuter, ['bin']: newInner };
    //   }
    //   return prevOuter;
    // });

    if (!exists) {
      return `rm: ${param}: No such file or directory`;
    }
    return `rm: ${param}: exist`;
    // directoryToList = newPath;
  }

  function catCommand(param: string) {
    if (!param) return 'Usage: cat [filename]';

    const newPath =
      param[0] === '/'
        ? param.replace(/(?<!^)\/$/, '')
        : `${currentDirectoryRef.current}/${param}`.replace(/(?<!^)\/$/, '').replace('//', '/');

    const pathParts = newPath.split('/').filter((part) => part.length > 0);

    let currentPath = fileSystem;
    let outputMessage = `cat : ${param}: Not a text file`;
    pathParts.some((part) => {
      if (currentPath[part]) {
        if (typeof currentPath[part] === 'function') {
          outputMessage = `cat : ${param}: Not a text file`;
          return true; // Arrête l'itération
        }
        if (typeof currentPath[part] === 'string') {
          const message = currentPath[part];
          if (typeof message === 'string') outputMessage = message;
          setLastPromptError(false);
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
        : `${currentDirectoryRef.current}/${param}`.replace(/(?<!^)\/$/, '').replace('//', '/');

    const pathParts = newPath.split('/').filter((part) => part.length > 0);

    let currentPath = fileSystem;
    let outputMessage:
      | string
      | void
      | JSX.Element
      | null = `open : ${param}: Not an executable file`;

    pathParts.some((part) => {
      if (currentPath[part]) {
        if (typeof currentPath[part] === 'function') {
          const appFunction = currentPath[part];
          outputMessage = typeof appFunction === 'function' ? appFunction() : null;
          setLastPromptError(false);
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

    return typeof outputMessage === 'string' ? formatText(outputMessage) : outputMessage;
  }

  function changeDirectory(param: string) {
    if (param === '') {
      setOldDirectory(currentDirectoryRef.current);
      setCurrentDirectory(homeDirectory);
      setLastPromptError(false);
      return '';
    }
    if (param === '-') {
      const tmpOldDirectory = oldDirectoryRef.current;
      setOldDirectory(currentDirectoryRef.current);
      setCurrentDirectory(tmpOldDirectory);
      setLastPromptError(false);
      return '';
    }
    if (param === '.') {
      setOldDirectory(currentDirectoryRef.current);
      setLastPromptError(false);
      return '';
    }
    if (param === '..') {
      const lastSlashIndex = currentDirectoryRef.current.lastIndexOf('/');
      setOldDirectory(currentDirectoryRef.current);
      setCurrentDirectory(
        lastSlashIndex !== -1
          ? currentDirectoryRef.current.substring(0, lastSlashIndex + 1).replace(/(?<!^)\/$/, '')
          : currentDirectoryRef.current
      );
      setLastPromptError(false);
      return '';
    }
    const newPath =
      param[0] === '/'
        ? param.replace(/(?<!^)\/$/, '')
        : `${currentDirectoryRef.current}/${param}`.replace(/(?<!^)\/$/, '').replace('//', '/');

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
    setOldDirectory(currentDirectoryRef.current);

    setCurrentDirectory(newPath);
    setLastPromptError(false);

    return '';
  }

  const [oldPrompts, setOldPrompts] = useState([
    {
      prompt: '',
      location: homeDirectory,
      error: false,
      answer: (
        <>
          {formatText(
            'Welcome to my portfolio terminal!\nBasic commands are:\n - cat   : Print .md & .txt files\n - cd    : Change directory\n - clear : Clear terminal \n - cmds  : List all commands\n - ls    : List directory\n - open  : Open .app files\n - pwd   : Current directory\n'
          )}
        </>
      ),
    },
  ]);

  const commands: fileSystemType | ((params?: string) => void | string | JSX.Element) | string =
    fileSystem.bin;

  //   {
  //     cat: (params) => {
  //       const output = catCommand(params);
  //       return <>{output && formatText(output)} </>;
  //     },
  //     cd: (params) => {
  //       const output = changeDirectory(params);
  //       return <>{output && formatText(output)} </>;
  //     },
  //     clear: () => {
  //       setLastPromptError(false);
  //       setOldPrompts([]);
  //       return <></>;
  //     },
  //     cmds: () => {
  //       setLastPromptError(false);
  //       const keysString = `Supported commands are:\n${Object.keys(commands)
  //         .map((key) => ` - ${key}`)
  //         .join('\n')}`;

  //       return formatText(keysString);
  //     },
  //     ls: (params) => {
  //       const output = listDirectory(params);
  //       return <>{output && formatText(output)} </>;
  //     },
  //     open: (params) => {
  //       const output = openCommand(params);
  //       return <>{output}</>;
  //     },
  //     pwd: () => {
  //       setLastPromptError(false);
  //       return formatText(currentDirectory);
  //     },
  //     reboot: () => {
  //       setTimeout(() => {
  //         router.push('/restart');
  //       }, 200);
  //       return <></>;
  //     },
  //     shutdown: () => {
  //       setTimeout(() => {
  //         router.push('/shutdown');
  //       }, 200);
  //       return <></>;
  //     },
  //   };

  const [prompt, setPrompt] = useState('');

  const ref = useRef<HTMLInputElement | null>(null);

  const viewport = useContext(ScrollAreaWindowContext);

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
              <span
                className={`${classes.text} ${classes.prompt} ${
                  elem.error ? classes.red : classes.green
                }`}
              >
                ➜&nbsp;
              </span>
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
        <span
          className={`${classes.text} ${classes.prompt} ${
            lastPromptError ? classes.red : classes.green
          }`}
        >
          ➜&nbsp;
        </span>
        <span className={`${classes.text} ${classes.prompt} ${classes.blue}`}>
          {getCurrentDirectory(currentDirectory)}&nbsp;
        </span>
        <input
          spellCheck="false"
          autoCapitalize="none"
          data-autofocus
          ref={ref}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setLastPromptError(true);
              const [promptFunction, promptParams] = splitFirstWord(prompt);
              let command:
                | string
                | fileSystemType
                | ((params?: string | undefined) => string | void | JSX.Element)
                | null = null;
              let tmpFunction: string | JSX.Element | null = null;

              if (
                typeof commands === 'object' &&
                commands !== null &&
                promptFunction in commands &&
                typeof commands[promptFunction] === 'function'
              ) {
                command = commands[promptFunction];
              }
              if (command !== null && typeof command === 'function') {
                tmpFunction = command(promptParams) || '';
              }
              // commands[promptFunction] ? (
              // commands[promptFunction](promptParams)
              setOldPrompts((old) => [
                ...old,
                {
                  prompt: prompt || ' ',
                  location: currentDirectory,
                  error: lastPromptError,
                  answer: !promptFunction ? (
                    <></>
                  ) : tmpFunction && typeof tmpFunction !== 'string' ? (
                    tmpFunction
                  ) : (
                    formatText(`zsh: command not found: ${promptFunction}`)
                  ),
                },
              ]);
              setPrompt('');
            }
            if (e.key === 'Tab') e.preventDefault();
            if (e.key === 'ArrowUp') {
              e.preventDefault(); // Empêche le comportement par défaut de la touche flèche vers le haut
              if (oldPrompts?.length) {
                const lastPrompt = oldPrompts[oldPrompts.length - 1].prompt;
                setPrompt(lastPrompt);

                // S'assurer que le changement d'état est appliqué avant de déplacer le curseur
                setTimeout(() => {
                  const inputElement = ref.current;
                  if (inputElement) {
                    inputElement.focus();
                    const len = lastPrompt.length;
                    inputElement.setSelectionRange(len, len);
                  }
                }, 0);
              }
            }
            if (e.ctrlKey && e.key === 'c') {
              setOldPrompts((old) => [
                ...old,
                {
                  prompt: prompt || ' ',
                  error: lastPromptError,
                  location: currentDirectory,
                  answer: <></>,
                },
              ]);
              setPrompt('');
            }
            setTimeout(() => {
              viewport?.current?.scrollTo({ top: viewport?.current?.scrollHeight });
              viewport?.current?.click();
            }, 0);
          }}
          onChange={(event) => setPrompt(event.target.value)}
          value={prompt}
          className={`${classes.input} ${classes.text} ${classes.white}`}
        />
      </Flex>
    </Stack>
  );
}
