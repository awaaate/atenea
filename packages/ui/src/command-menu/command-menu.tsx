import { IconName, Icon } from "../icon";
import React, { ComponentProps, useMemo } from "react";

import { Dialog, DialogContent } from "../dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "../commands";
interface CommandMenuItem {
  id: string;
  name: string;
  shortcut?: string;
  icon?: IconName;
  group?: string;
  handler: () => void;
}

interface CommandMenuProps extends ComponentProps<typeof DialogContent> {
  items: CommandMenuItem[];
  onDismiss: () => void;
}

const CommandMenu = ({ items, ...props }: CommandMenuProps) => {
  //group by group
  const groups = useMemo(() => {
    return items.reduce(
      (acc, item) => {
        if (!item.group) {
          acc.default.push(item);
          return acc;
        }
        if (!acc[item.group]) acc[item.group] = [];
        acc[item.group].push(item);
        return acc;
      },
      { default: [] } as Record<string, CommandMenuItem[]>
    );
  }, [items]);

  return (
    <DialogContent {...props}>
      <Command className="rounded-lg ">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {Object.entries(groups).map(
            ([group, items]) =>
              items[0] && (
                <>
                  <CommandGroup heading={group} key={group}>
                    {items.map((item) => (
                      <CommandMenuItem {...item} key={item.id} />
                    ))}
                  </CommandGroup>
                </>
              )
          )}
        </CommandList>
        <div className="py-1.5 px-4 text-xs  text-text-weaker flex items-center">
          Press esc to exit
        </div>
      </Command>
    </DialogContent>
  );
};

const CommandMenuItem: React.FC<CommandMenuItem> = ({
  id,
  name,
  shortcut,
  icon,
  handler,
}) => {
  return (
    <>
      <CommandItem key={id} onSelect={handler}>
        {icon && <Icon name={icon} className="mr-2 text-current" />}
        {name}
        {shortcut && <CommandShortcut>{shortcut}</CommandShortcut>}
      </CommandItem>
    </>
  );
};

export { CommandMenu };
export type { CommandMenuItem, CommandMenuProps };
