import { Box, Flex, Space, Text } from '@mantine/core';

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

import { SeeMoreButton } from '@/components/SeeMoreButton/SeeMoreButton';

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

  return (
    <Flex align="center" h="100%">
      <div style={{ height: '100%', flex: 1, padding: 20 }}>
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
                <th className={`${classes.th} ${classes.thtd}`}>Begin Date</th>
                <th className={`${classes.th} ${classes.thtd}`}>End Date</th>
                <th className={`${classes.th} ${classes.thtd}`}>Type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={`${classes.td} ${classes.thtd}`}>test1</td>
                <td className={`${classes.td} ${classes.thtd}`}>test2</td>
                <td className={`${classes.td} ${classes.thtd}`}>test3</td>
                <td className={`${classes.td} ${classes.thtd}`}>test4</td>
              </tr>
              <tr>
              <td className={`${classes.td} ${classes.thtd}`}>test1</td>
                <td className={`${classes.td} ${classes.thtd}`}>test2</td>
                <td className={`${classes.td} ${classes.thtd}`}>test3</td>
                <td className={`${classes.td} ${classes.thtd}`}>test4</td>
              </tr>
              <tr>
              <td className={`${classes.td} ${classes.thtd}`}>test1</td>
                <td className={`${classes.td} ${classes.thtd}`}>test2</td>
                <td className={`${classes.td} ${classes.thtd}`}>test3</td>
                <td className={`${classes.td} ${classes.thtd}`}>test4</td>
              </tr>
            </tbody>
          </table>
        </Box>
      </div>
      <div style={{ backgroundColor: 'blue', height: '100%', flex: 1 }}>test</div>
    </Flex>
  );
}
