import { Box, Flex, List, Space, Text, Title } from '@mantine/core';

import { Carousel } from '@/components/Carousel/Carousel';
import mdma from '@/assets/carousels/mdma.webp';
import iota from '@/assets/carousels/holy.webp';
import classes from '@/styles/theme.module.css';

export default function ProjectsWindow(): JSX.Element {
  const slides = [
    { image: mdma, alt: 'mdma image' },
    { image: iota, alt: 'iota image' },
  ];

  return (
    <Flex direction="column" align="center" h="100%">
      <Flex direction="column" align="center" h="100%" w="100%" pt="xl" maw="700px">
        <Text fz="lg" ta="left" ml={70} mb="xs" w="100%">
          Projet IOTA
        </Text>
        <Flex gap="xl" align="center">
          <Carousel slides={slides} options={{ loop: true }} />
          <Box p="xs" w="100%" h="100%" bg="white" className={classes.retroBox}>
            <Text ta="left" w="100%">
              {`Bienvenue dans l'univers IOTA, une initiative engagée et à but non lucratif qui se
              donne pour mission d'équiper les jeunes générations des outils indispensables pour
              s'épanouir dans notre monde de plus en plus connecté. Avec IOTA, nous nous donnons
              comme mission de réduire la fracture numérique !`}
            </Text>
          </Box>
        </Flex>
        <Space h="lg" />
        <Text fz="lg" ta="left" ml={70} mb="xs" w="100%">
          One For Tree
        </Text>
        <Flex gap="xl" align="center">
          <Carousel slides={slides} options={{ loop: true }} />
          <Box p="xs" w="100%" h="100%" bg="white" className={classes.retroBox}>
            <Text ta="left" w="100%">
              {`Jeu gagnant d'une Gamejam de 48h organisé par la Vivatech, One For Tree vous fait
              incarner un robot qui doit coopérer avec ses compères pour reboiser une planète
              poluée. Un jeu mignon, multijoueur avec un message green tech et positif.`}
            </Text>
          </Box>
        </Flex>
        <Space h="lg" />
        <Text fz="lg" ta="left" ml={70} mb="xs" w="100%">
          Mega Drinking Machina Adventure
        </Text>
        <Flex gap="xl" align="center">
          <Carousel slides={slides} options={{ loop: true }} />
          <Box p="xs" w="100%" h="100%" bg="white" className={classes.retroBox}>
            <Text ta="left" w="100%">
              {`A travers le projet Mega Drinking Machina Adventure™ nous voulons faire vivre à nos
              très chers futurs utilisateurs une simulation, familiale, de cette aventure hors du
              commun. Une compilation de 11 jeux jouables à 5 joueurs mettront vos amitiés et vos
              nerfs à rudes épreuves.`}
            </Text>
          </Box>
        </Flex>
        <Space h="lg" />
        <Text fz="lg" ta="left" ml={70} mb="xs" w="100%">
          Mega Drinking Machina Adventure
        </Text>
        <Flex gap="xl" align="center">
          <Carousel slides={slides} options={{ loop: true }} />
          <Box p="xs" w="100%" h="100%" bg="white" className={classes.retroBox}>
            <Text ta="left" w="100%">
              {`A travers le projet Mega Drinking Machina Adventure™ nous voulons faire vivre à nos
              très chers futurs utilisateurs une simulation, familiale, de cette aventure hors du
              commun. Une compilation de 11 jeux jouables à 5 joueurs mettront vos amitiés et vos
              nerfs à rudes épreuves.`}
            </Text>
          </Box>
        </Flex>
        <Space h="xl" />

        <Carousel slides={slides} options={{ loop: true }} />
      </Flex>
    </Flex>
  );
}