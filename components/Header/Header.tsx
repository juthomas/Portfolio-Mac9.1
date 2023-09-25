'use client';

import Image from 'next/image';
import { Menu, Group, Burger, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
// import { MantineLogo } from '@mantine/ds';
import classes from './Header.module.css';
import juthomasLogo from '@/assets/juthomas_logo.svg';
import fileIcon from '@/assets/file_icon.svg';
import frenchFlag from '@/assets/french_flag.svg';

const links = [
  {
    link: '#1',
    label: 'File',
    links: [
      { link: '/docs', label: 'Documentation' },
      { link: '/resources', label: 'Resources' },
      { link: '/community', label: 'Community' },
      { link: '/blog', label: 'Blog' },
    ],
  },
  {
    link: '#2',
    label: 'Edit',
    links: [
      { link: '/faq', label: 'FAQ' },
      { link: '/demo', label: 'Book a demo' },
      { link: '/forums', label: 'Forums' },
    ],
  },
];

export function Header() {
  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu
          // className={classes.linkMenu}
          position="bottom-start"
          key={link.label}
          trigger="click"
          transitionProps={{ exitDuration: 0 }}
          withinPortal
        >
          <Menu.Target>
            <Flex align="center" className={classes.link}>
              <a
                href={link.link}
                onClick={(event) => event.preventDefault()}
                style={{
                  textDecoration: 'none',
                  color: 'light-dark(var(--mantine-color-dark-9), var(--mantine-color-dark-0))',
                }}
              >
                <span>{link.label}</span>
                {/* <IconChevronDown size="0.9rem" stroke={1.5} /> */}
              </a>
            </Flex>
          </Menu.Target>
          <Menu.Dropdown className={classes.linkMenu}>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </a>
    );
  });

  const [time, setTime] = useState('12:00 PM');

  useEffect(() => {
    const interval = setInterval(() => {
      let hours: string | number = new Date().getHours();
      let minutes: string | number = new Date().getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours %= 12;
      hours = hours || 12; // the hour '0' should be '12'
      hours = hours < 10 ? `0${hours}` : hours;
      minutes = minutes < 10 ? `0${minutes}` : minutes;
      setTime(`${hours}:${minutes} ${ampm}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className={classes.header}>
      {/* <Container size="md"> */}
      <div className={classes.inner}>
        {/* <MantineLogo size={28} /> */}
        <Group style={{ height: '100%', width: '100%' }} justify="space-between">
          <Group style={{ height: '100%' }} gap={15} visibleFrom="sm">
            {/* <Image
            src={juthomasLogo}
            alt="logo"
            width={0}
            height={0}
            style={{ width: 'auto', height: '100%' }}
          /> */}
            <Menu
              position="bottom-start"
              trigger="click"
              transitionProps={{ exitDuration: 0 }}
              withinPortal
            >
              <Menu.Target>
                <Flex align="center" className={classes.link}>
                  <Image
                    src={juthomasLogo}
                    alt="logo"
                    width={0}
                    height={0}
                    style={{ width: 'auto', height: '100%' }}
                  />
                </Flex>
              </Menu.Target>
              <Menu.Dropdown className={classes.linkMenu}>
                <Menu.Item>À propos de cette page</Menu.Item>
              </Menu.Dropdown>
            </Menu>

            {items}
          </Group>
          <Group className={classes.menuBar} style={{ height: '100%' }}>
            <Group gap={4} style={{ height: '100%' }}>
              <Image
                src={fileIcon}
                alt="logo"
                width={0}
                height={0}
                style={{ width: 'auto', height: '100%' }}
              />
              Portfolio
            </Group>
            <Menu
              position="bottom-start"
              trigger="click"
              transitionProps={{ exitDuration: 0 }}
              withinPortal
            >
              <Menu.Target>
                <Flex align="center" className={classes.link}>
                  <Image
                    src={frenchFlag}
                    alt="logo"
                    width={0}
                    height={0}
                    style={{ width: 'auto', height: '80%' }}
                  />
                </Flex>
              </Menu.Target>

              <Menu.Dropdown className={classes.linkMenu}>
                <Menu.Item>À propos de cette page</Menu.Item>
              </Menu.Dropdown>
            </Menu>
            {time}
          </Group>
        </Group>
        <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
      </div>
      {/* </Container> */}
    </header>
  );
}
