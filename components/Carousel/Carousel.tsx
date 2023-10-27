import Image, { StaticImageData } from 'next/image';
import React, { useCallback } from 'react';
import useEmblaCarousel, { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Box, Button, Flex } from '@mantine/core';
import { usePrevNextButtons } from './CarouselButtons';
// import imageByIndex from './imageByIndex';
import arrowRight from '@/assets/icons/arrowRight.svg';
import arrowLeft from '@/assets/icons/arrowLeft.svg';

// import './base.css';
// import './sandbox.css';
// import './embla.css';
import emblaClasses from './Carousel.module.css';
import themeClasses from '@/styles/theme.module.css';

type PropType = {
  slides: { image: StaticImageData; alt?: string; background?: string }[];
  options?: EmblaOptionsType;
  size?: string;
};

export const Carousel: React.FC<PropType> = ({ slides, options }: PropType) => {
  // const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

  const onButtonClick = useCallback((emblaApiCb: EmblaCarouselType) => {
    const { autoplay } = emblaApiCb.plugins();
    if (!autoplay) return;
    if (autoplay.options.stopOnInteraction !== false) autoplay.stop();
  }, []);

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi, onButtonClick);

  return (
    <Flex gap="xs" align="center" justify="center" style={{ flex: 1 }}>
      <Button
        className={emblaClasses.button}
        onClick={onPrevButtonClick}
        disabled={prevBtnDisabled}
        pr={2}
      >
        <Image alt="left arrow" src={arrowLeft} />
      </Button>

      <Box className={themeClasses.retroBox} my={0}>
        <div className={emblaClasses.embla}>
          <div className={emblaClasses.embla__viewport} ref={emblaRef}>
            <div className={emblaClasses.embla__container}>
              {slides.map((slide, index) => (
                <div className={emblaClasses.embla__slide} key={index}>
                  <Box
                    style={{ backgroundColor: slide.background || undefined }}
                    className={emblaClasses.embla__slide_img_container}
                  >
                    <Image
                      className={emblaClasses.embla__slide__img}
                      src={slide.image}
                      alt={slide.alt || 'Image Alt'}
                    />
                  </Box>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Box>
      <Button
        className={emblaClasses.button}
        onClick={onNextButtonClick}
        disabled={nextBtnDisabled}
        pl={2}
      >
        <Image alt="right arrow" src={arrowRight} />
      </Button>
    </Flex>
  );
};
