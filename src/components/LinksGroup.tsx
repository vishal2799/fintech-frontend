import { useState } from 'react';
import { NavLink } from 'react-router';
import { Group, Collapse, UnstyledButton } from '@mantine/core';
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
                className="text-sm font-medium text-gray-800 dark:text-gray-100"
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
                className={({ isActive }) =>
                  `text-sm rounded-md px-2 py-1 hover:bg-gray-100 dark:hover:bg-zinc-800 ${
                    isActive ? 'text-blue-600 font-semibold' : 'text-gray-700 dark:text-gray-200'
                  }`
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
