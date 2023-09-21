'use client';

import Image from 'next/image';
import { Menu, Group, Center, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
// import { MantineLogo } from '@mantine/ds';
import classes from './Header.module.css';
import juthomasLogo from '@/assets/juthomas_logo.svg';

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
          key={link.label}
          trigger="click"
          transitionProps={{ exitDuration: 0 }}
          withinPortal
        >
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                {/* <IconChevronDown size="0.9rem" stroke={1.5} /> */}
              </Center>
            </a>
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

  return (
    <header className={classes.header}>
      {/* <Container size="md"> */}
      <div className={classes.inner}>
        {/* <MantineLogo size={28} /> */}
        <Group style={{ height: '100%', padding: 3 }} gap={15} visibleFrom="sm">
          {/* <Image
            src={juthomasLogo}
            alt="logo"
            width={0}
            height={0}
            style={{ width: 'auto', height: '100%' }}
          /> */}
          <Menu trigger="click" transitionProps={{ exitDuration: 0 }} withinPortal>
            <Menu.Target>
              <div className={classes.link}>
                <Image
                  src={juthomasLogo}
                  alt="logo"
                  width={0}
                  height={0}
                  style={{ width: 'auto', height: '100%' }}
                />
              </div>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item>À propos de cette page</Menu.Item>
            </Menu.Dropdown>
          </Menu>

          {items}
        </Group>
        <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
      </div>
      {/* </Container> */}
    </header>
  );
}
