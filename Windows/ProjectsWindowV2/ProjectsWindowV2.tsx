import { useState } from 'react';
import { Box, Flex, Group, Stack, Text } from '@mantine/core';

import { Carousel } from '@/components/Carousel/Carousel';
import mdma from '@/assets/carousels/mdma.webp';
import globalClasses from '@/styles/theme.module.css';
import classes from './ProjectWindowV2.module.css';

import OFT_1 from '@/assets/carousels/OFT/oft-1.webp';
import OFT_2 from '@/assets/carousels/OFT/oft-2.webp';
import OFT_3 from '@/assets/carousels/OFT/oft-3.webp';
import IOTA_1 from '@/assets/carousels/IOTA/iota-1.webp';
import IOTA_2 from '@/assets/carousels/IOTA/iota-2.webp';
import IOTA_3 from '@/assets/carousels/IOTA/iota-3.webp';
import NSDOS_1 from '@/assets/carousels/NSDOS/NSDOS_app_1.png';
import NSDOS_2 from '@/assets/carousels/NSDOS/NSDOS_app_2.png';
import NSDOS_3 from '@/assets/carousels/NSDOS/NSDOS_app_3.png';
import NSDOS_4 from '@/assets/carousels/NSDOS/NSDOS_app_4.png';
import NSDOS_5 from '@/assets/carousels/NSDOS/NSDOS_app_5.png';

import { OpenButton } from '@/components/OpenButton/OpenButton';
import React from 'react';
import { StaticImageData } from 'next/image';

export default function ProjectsWindowV2(): JSX.Element {
  const MDMA_slides = [{ image: mdma, alt: 'mdma image' }];

  const OFT_slides = [
    { image: OFT_1, alt: 'OFT 1' },
    { image: OFT_2, alt: 'OFT 2' },
    { image: OFT_3, alt: 'OFT 3' },
  ];

  const IOTA_slides = [
    { image: IOTA_1, alt: 'IOTA 1' },
    { image: IOTA_2, alt: 'IOTA 2' },
    { image: IOTA_3, alt: 'IOTA 3' },
  ];

  const NSDOS_slides = [
    { image: NSDOS_1, alt: 'NSDOS 1' },
    { image: NSDOS_2, alt: 'NSDOS 2' },
    { image: NSDOS_3, alt: 'NSDOS 3' },
    { image: NSDOS_4, alt: 'NSDOS 4' },
    { image: NSDOS_5, alt: 'NSDOS 5' },
  ];

  const [selected, setSelected] = useState(0);

  const data = [
    {
      projectName: 'One for tree',
      beginDate: '2021',
      endDate: '2022',
      type: 'Gamejam / Personal Project',
      domain: 'Web',
      role: 'Lead Dev',
      slides: OFT_slides,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non urna imperdiet, pulvinar ligula suscipit, lacinia tortor. Quisque ornare purus nunc, at malesuada velit varius eu. Maecenas tempus at augue vitae fermentum. Etiam sit amet nulla nisi.',
      technologies: ['Typescript', 'React.js', 'Pixi.js', 'Node.js', 'Gitlab', 'Notion'],
    },
    {
      projectName: 'Projet Iota',
      beginDate: '2022',
      endDate: '2023',
      type: 'CDD',
      role: 'Designer & Front-end Developer',
      domain: 'Web',
      slides: IOTA_slides,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non urna imperdiet, pulvinar ligula suscipit, lacinia tortor. Quisque ornare purus nunc, at malesuada velit varius eu. Maecenas tempus at augue vitae fermentum. Etiam sit amet nulla nisi.',
      technologies: [
        'Typescript',
        'React.js',
        'Next.js',
        'Three.js',
        'Storybook.js',
        'Gitlab',
        'Notion',
        'Figma',
      ],
    },
    {
      projectName: 'Lab Concept-Car',
      beginDate: '2019',
      endDate: '2020',
      type: 'Freelance / Partnership ',
      domain: 'Elec / Web',
      role: 'Researcher / Developer',
      slides: IOTA_slides,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non urna imperdiet, pulvinar ligula suscipit, lacinia tortor. Quisque ornare purus nunc, at malesuada velit varius eu. Maecenas tempus at augue vitae fermentum. Etiam sit amet nulla nisi.',
      technologies: ['Javascript', 'P5.js', 'Node.js', 'Gitlab', 'Flutter', 'Unity', 'C#'],
    },
    {
      projectName: 'ARG - CCNRB',
      beginDate: '2023',
      endDate: '2023',
      type: 'Freelance',
      domain: 'Elec / Web',
      role: 'Electronic & Web Developer',
      slides: IOTA_slides,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non urna imperdiet, pulvinar ligula suscipit, lacinia tortor. Quisque ornare purus nunc, at malesuada velit varius eu. Maecenas tempus at augue vitae fermentum. Etiam sit amet nulla nisi.',
      technologies: [
        'Typescript',
        'React.js',
        'Next.js',
        'Gitlab',
        'Figma',
        'Python',
        'Pygame',
        'Raspberry',
      ],
    },
    {
      projectName: 'GE Power',
      beginDate: '2018',
      endDate: '2019',
      type: 'Internship',
      domain: 'App',
      role: 'Software Engineer Junior',
      slides: IOTA_slides,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non urna imperdiet, pulvinar ligula suscipit, lacinia tortor. Quisque ornare purus nunc, at malesuada velit varius eu. Maecenas tempus at augue vitae fermentum. Etiam sit amet nulla nisi.',
      technologies: ['C#', 'WPF', 'SQL'],
    },
    {
      projectName: 'NSDOS',
      beginDate: '2020',
      endDate: 'now',
      type: 'Freelance',
      domain: 'Elec / App',
      role: '',
      slides: IOTA_slides,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non urna imperdiet, pulvinar ligula suscipit, lacinia tortor. Quisque ornare purus nunc, at malesuada velit varius eu. Maecenas tempus at augue vitae fermentum. Etiam sit amet nulla nisi.',
      technologies: ['C++', 'Typescript', 'React.js', 'Raspberry', 'Vue.js', 'Electron.js', 'Fusion360'],
    },
    {
      projectName: 'As-simt',
      beginDate: '2020',
      endDate: 'now',
      type: 'Personal Project',
      domain: 'Elec',
      role: '',
      slides: IOTA_slides,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non urna imperdiet, pulvinar ligula suscipit, lacinia tortor. Quisque ornare purus nunc, at malesuada velit varius eu. Maecenas tempus at augue vitae fermentum. Etiam sit amet nulla nisi.',
      technologies: ['C++', 'ESP32', 'Typescript', 'React.js', 'Fusion360'],
    },
    {
      projectName: 'CNES',
      beginDate: '2020',
      endDate: 'now',
      type: 'Freelance',
      domain: 'Elec / App',
      role: '',
      slides: IOTA_slides,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non urna imperdiet, pulvinar ligula suscipit, lacinia tortor. Quisque ornare purus nunc, at malesuada velit varius eu. Maecenas tempus at augue vitae fermentum. Etiam sit amet nulla nisi.',
      technologies: ['C', 'KiCad'],
    },
    {
      projectName: 'Way to Silence',
      beginDate: '2023',
      endDate: '2024',
      type: 'Freelance',
      domain: 'Elec',
      role: '',
      slides: IOTA_slides,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non urna imperdiet, pulvinar ligula suscipit, lacinia tortor. Quisque ornare purus nunc, at malesuada velit varius eu. Maecenas tempus at augue vitae fermentum. Etiam sit amet nulla nisi.',
      technologies: ['C++', 'ESP32', 'KiCad'],
    },
  ];

  return (
    <Flex align="stretch" h="100%">
      <div style={{ flex: 1, padding: 20 }}>
        <Box
          // p="xs"
          miw={250}
          // w="100%"
          h="100%"
          bg="white"
          pos="relative"
          style={{ flex: 1 }}
          className={globalClasses.retroBox}
        >
          <table style={{ width: '100%', borderSpacing: 0 }}>
            <thead>
              <tr>
                <th className={`${classes.th} ${classes.thtd}`}>Project Name</th>
                <th className={`${classes.th} ${classes.thtd}`}>Date</th>
                <th className={`${classes.th} ${classes.thtd}`}>Type</th>
                <th className={`${classes.th} ${classes.thtd}`} style={{ borderRight: 0 }}>
                  Domain
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((elem, index) => (
                <tr
                  key={`tr-${index}`}
                  onClick={() => setSelected(index)}
                  style={{ backgroundColor: index === selected ? '#CECEE2' : undefined }}
                >
                  <td className={`${classes.td} ${classes.thtd}`}>{elem.projectName}</td>
                  <td className={`${classes.td} ${classes.thtd}`}>{elem.beginDate}-{elem.endDate} </td>
                  <td className={`${classes.td} ${classes.thtd}`}>{elem.type}</td>
                  <td className={`${classes.td} ${classes.thtd}`}>{elem.domain}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </div>
      <Flex
        direction="column"
        align="stretch"
        justify="center"
        gap={10}
        style={{ flex: 1, padding: 20 }}
      >
        <Carousel slides={data[selected].slides} options={{ loop: true }} />
        <Stack px={60} gap={7}>
          <Text ta="center" fz={20}>
            {data[selected].projectName}
          </Text>
          <Group justify="space-between">
            <Text>Type</Text>
            <Text c="#4B4B4B">{data[selected].type}</Text>
          </Group>
          <Group justify="space-between">
            <Text>Begin Date</Text>
            <Text c="#4B4B4B">{data[selected].beginDate}</Text>
          </Group>
          <Group justify="space-between">
            <Text>End Date</Text>
            <Text c="#4B4B4B">{data[selected].endDate}</Text>
          </Group>
          <Group justify="space-between">
            <Text>Role</Text>
            <Text c="#4B4B4B">{data[selected].role}</Text>
          </Group>
          <Stack gap={0}>
            <Text>Description</Text>
            <Text c="#4B4B4B">{data[selected].description}</Text>
          </Stack>
          <Flex justify="space-between" gap={20}>
            <Text>Technologies</Text>
            <Flex justify="end" gap={6} wrap="wrap">
              {data[selected].technologies?.map((elem) => (
                  <Text className={classes.technologychip} c="#3B3B3B">
                    {elem}
                  </Text>
                ))}
            </Flex>
          </Flex>
          <Group justify="center" mt={5}>
            <OpenButton />
          </Group>
        </Stack>
      </Flex>
    </Flex>
  );
}
