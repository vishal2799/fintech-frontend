import { useState } from 'react';
import { NavLink } from 'react-router'; 
import { Group, Collapse, UnstyledButton, useMantineTheme, useMantineColorScheme } from '@mantine/core';
import { IconChevronDown, IconChevronRight } from '@tabler/icons-react';

type SubLink = { label: string; link: string };
type Props = {
  label: string;
  icon: React.FC<any>;
  initiallyOpened?: boolean;
  links?: SubLink[];
  link?: string;
};

export function LinksGroup({ icon: Icon, label, initiallyOpened, links, link }: Props) {
  const [opened, setOpened] = useState(initiallyOpened || false);
  const theme = useMantineTheme();
const { colorScheme } = useMantineColorScheme();

  const primaryColor = theme.colors[theme.primaryColor][5];

  const hasLinks = Array.isArray(links) && links.length > 0;

  return (
    <div>
      <UnstyledButton
        onClick={() => (hasLinks ? setOpened((o) => !o) : null)}
        className="flex items-center w-full px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800"
      >
        <Group justify="space-between" className="flex-1">
          <Group gap="xs">
            <Icon size={18} />
            {hasLinks ? (
              <span className="font-medium text-sm">{label}</span>
            ) : (
              <NavLink
                to={link || '#'}
                className={({ isActive }) =>
                  `text-sm font-medium ${
                    isActive
                      ? 'font-semibold'
                      : 'text-gray-800 dark:text-gray-100'
                  }`
                }
                style={({ isActive }) =>
                  isActive ? { color: primaryColor } : undefined
                }
              >
                {label}
              </NavLink>
            )}
          </Group>
          {hasLinks && (opened ? <IconChevronDown size={16} /> : <IconChevronRight size={16} />)}
        </Group>
      </UnstyledButton>

      {hasLinks && (
        <Collapse in={opened}>
          <div className="pl-6 mt-1 flex flex-col gap-1">
            {links.map((item) => (
              <NavLink
                key={item.label}
                to={item.link}
                className="text-sm rounded-md px-2 py-1 hover:bg-gray-100 dark:hover:bg-zinc-800"
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: primaryColor,
                        fontWeight: 600,
                        backgroundColor: colorScheme === 'dark' ? theme.colors.dark[6] : '#f1f5f9',
                      }
                    : undefined
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </Collapse>
      )}
    </div>
  );
}
