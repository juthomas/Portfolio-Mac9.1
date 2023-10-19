import Image from 'next/image';
import React, { useCallback } from 'react';
import useEmblaCarousel, { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Box, Flex } from '@mantine/core';
import { PrevButton, NextButton, usePrevNextButtons } from './CarouselButtons';
// import imageByIndex from './imageByIndex';
import mdma from '@/assets/carousels/mdma.webp';
import iota from '@/assets/carousels/holy.webp';
// import './base.css';
// import './sandbox.css';
// import './embla.css';
import emblaClasses from './embla.module.css';
import themeClasses from '@/styles/theme.module.css';

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

export const Carousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

  const onButtonClick = useCallback((emblaApiCb: EmblaCarouselType) => {
    const { autoplay } = emblaApiCb.plugins();
    if (!autoplay) return;
    if (autoplay.options.stopOnInteraction !== false) autoplay.stop();
  }, []);

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi, onButtonClick);

  return (
    <Flex gap="xs">
      <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
      <Box className={themeClasses.retroBox}>
        <div className={emblaClasses.embla}>
          <div className={emblaClasses.embla__viewport} ref={emblaRef}>
            <div className={emblaClasses.embla__container}>
              {slides.map((index) => (
                <div className={emblaClasses.embla__slide} key={index}>
                  <div className={emblaClasses.embla__slide__number}>
                    <span>{index + 1}</span>
                  </div>
                  <Image
                    className={emblaClasses.embla__slide__img}
                    src={index % 2 === 0 ? mdma : iota}
                    alt="Your alt text"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Box>
      <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
    </Flex>
  );
};
