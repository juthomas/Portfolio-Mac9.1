import { Box, Flex, Space, Text } from '@mantine/core';

import { Carousel } from '@/components/Carousel/Carousel';
import mdma from '@/assets/carousels/mdma.webp';
import classes from '@/styles/theme.module.css';

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

import { SeeMoreButton } from '@/components/SeeMoreButton/SeeMoreButton';

export default function ProjectsWindow(): JSX.Element {
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

  return (
    <Flex direction="column" align="center" h="100%">
      <Flex direction="column" align="center" h="100%" w="100%" pt="xl" maw="calc(700px + 5%)">
        <Text fz="lg" ta="left" pl={70} mb="xs" w="100%">
          Projet IOTA
        </Text>
        <Flex columnGap="xl" rowGap="lg" align="stretch" wrap="wrap" justify="center" px="5%">
          <Carousel style={{ flex: 1 }} slides={IOTA_slides} options={{ loop: true }} />
          <Box
            p="xs"
            miw={250}
            w="100%"
            bg="white"
            pos="relative"
            style={{ flex: 1 }}
            className={classes.retroBox}
          >
            <Text ta="left" w="100%">
              {`Welcome to the IOTA universe, a committed and non-profit initiative whose mission is
              to equip the younger generations with the essential tools to thrive in our
              increasingly connected world. With IOTA, our mission is to bridge the digital divide! `}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Text>
            <SeeMoreButton />
          </Box>
        </Flex>
        <Space h="xl" />
        <Text fz="lg" ta="left" pl={70} mb="xs" w="100%">
          One For Tree
        </Text>
        <Flex columnGap="xl" rowGap="lg" align="stretch" wrap="wrap" justify="center" px="5%">
          <Carousel style={{ flex: 1 }} slides={OFT_slides} options={{ loop: true }} />
          <Box
            p="xs"
            miw={250}
            w="100%"
            bg="white"
            pos="relative"
            style={{ flex: 1 }}
            className={classes.retroBox}
          >
            <Text ta="left" w="100%">
              {`Triumphant winner of a 48-hour Gamejam hosted by Vivatech, One For Tree immerses you
              in the world of captivating little robots! Join forces with your allies to reforest a
              planet ravaged by pollution. An absolutely adorable multiplayer game, proudly carrying
              an inspiring and positive green tech message! `}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Text>
            <SeeMoreButton />
          </Box>
        </Flex>
        <Space h="xl" />
        <Text fz="lg" ta="left" pl={70} mb="xs" w="100%">
          Mega Drinking Machina Adventure
        </Text>
        <Flex columnGap="xl" rowGap="lg" align="stretch" wrap="wrap" justify="center" px="5%">
          <Carousel style={{ flex: 1 }} slides={MDMA_slides} options={{ loop: true }} />
          <Box
            p="xs"
            miw={250}
            w="100%"
            bg="white"
            pos="relative"
            style={{ flex: 1 }}
            className={classes.retroBox}
          >
            <Text ta="left" w="100%">
              {`Through the Mega Drinking Machina Adventure™ project, we aim to provide our dear
              future users with a family-friendly simulation of this extraordinary adventure. A
              compilation of 11 games playable by 5 players will put your friendships and nerves to
              the ultimate test. `}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Text>
            <SeeMoreButton />
          </Box>
        </Flex>
        <Space h="xl" />
        <Text fz="lg" ta="left" pl={70} mb="xs" w="100%">
          NSDOS App
        </Text>
        <Flex columnGap="xl" rowGap="lg" align="stretch" wrap="wrap" justify="center" px="5%">
          <Carousel style={{ flex: 1 }} slides={NSDOS_slides} options={{ loop: true }} />
          <Box
            p="xs"
            miw={250}
            w="100%"
            bg="white"
            pos="relative"
            style={{ flex: 1 }}
            className={classes.retroBox}
          >
            <Text ta="left" w="100%">
              {`Discover an application for composing scores in an esoteric language! Customize your
              synthesizer, broadcast to devices connected to the same WiFi, create as many audio
              channels as desired, and collaborate in real-time. An unprecedented collaborative
              musical adventure! `}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Text>
            <SeeMoreButton />
          </Box>
        </Flex>
        <Space h="xl" />

        {/* <Space h="lg" />
        <Text fz="lg" ta="left" ml={70} mb="xs" w="100%">
          One For Tree
        </Text>
        <Flex gap="xl" align="stretch">
          <Carousel style={{flex : 1}} slides={slides} options={{ loop: true }} />
          <Box p="xs" w="100%" bg="white" pos="relative" className={classes.retroBox}>
            <Text ta="left" w="100%">
              {`Jeu gagnant d'une Gamejam de 48h organisé par la Vivatech, One For Tree vous fait
              incarner un robot qui doit coopérer avec ses compères pour reboiser une planète
              poluée. Un jeu mignon, multijoueur avec un message green tech et positif.`}
            </Text>
            <SeeMoreButton />
          </Box>
        </Flex>
        <Space h="lg" />
        <Text fz="lg" ta="left" ml={70} mb="xs" w="100%">
          Mega Drinking Machina Adventure
        </Text>
        <Flex gap="xl" align="stretch">
          <Carousel style={{flex : 1}} slides={slides} options={{ loop: true }} />
          <Box p="xs" w="100%" bg="white" pos="relative" className={classes.retroBox}>
            <Text ta="left" w="100%">
              {`A travers le projet Mega Drinking Machina Adventure™ nous voulons faire vivre à nos
              très chers futurs utilisateurs une simulation, familiale, de cette aventure hors du
              commun. Une compilation de 11 jeux jouables à 5 joueurs mettront vos amitiés et vos
              nerfs à rudes épreuves.`}
            </Text>
            <SeeMoreButton />
          </Box>
        </Flex>
        <Space h="lg" />
        <Text fz="lg" ta="left" ml={70} mb="xs" w="100%">
          NSDOS App
        </Text>
        <Flex gap="xl" align="stretch">
          <Carousel style={{flex : 1}} slides={NSDOS_slides} options={{ loop: true }} />
          <Box p="xs" w="100%" bg="white" className={classes.retroBox}>
            <Text ta="left" w="100%">
              {`A travers le projet Mega Drinking Machina Adventure™ nous voulons faire vivre à nos
              très chers futurs utilisateurs une simulation, familiale, de cette aventure hors du
              commun. Une compilation de 11 jeux jouables à 5 joueurs mettront vos amitiés et vos
              nerfs à rudes épreuves.`}
            </Text>
            <SeeMoreButton />
          </Box>
        </Flex>
        <Space h="xl" /> */}
      </Flex>
    </Flex>
  );
}
