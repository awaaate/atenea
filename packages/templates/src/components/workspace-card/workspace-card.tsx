"use client";
import { getAccentColor } from "@shared/ui/src/accent-picker";
import { Icon } from "@shared/ui/src/icon";
import { Link } from "@shared/ui/src/link";
import React from "react";
interface WorkspaceCardProps {
  title: string;
  description: string;
  accentColor: string;
  id: string;
}

export const WorkspaceCard: React.FC<WorkspaceCardProps> = ({
  accentColor,
  title,
  description,
  id,
}) => {
  return (
    <span
      ref={(el) => {
        if (el) {
          console.log(el.getBoundingClientRect());
          el.style.setProperty(
            "--theme-color-accent",
            getAccentColor(accentColor)
          );
        }
      }}
    >
      <Link
        className={
          "bg-accent/5 p-2 rounded-default border-2 border-accent/10 transition-all  hover:bg-accent/10  block  "
        }
        href={`/app/${id}`}
      >
        <Icon name="LayoutDashboard" className="text-text-weakest " size="l" />
        <h3 className="text-text-weak font-semibold mt-4 mb-1">{title}</h3>
        <p className="text-text-weaker break-words ">
          {description.slice(0, 100)}
        </p>
      </Link>
    </span>
  );
};

export const CreateWorkspaceCard: React.FC = () => {
  return (
    <Link
      className={
        " transition-all bg-accent/5 p-2 rounded-default border-2 border-accent/10 hover:bg-accent/20 cursor-pointer  flex flex-col items-center justify-center"
      }
      href="/create"
    >
      <Icon name="Plus" className="text-text-weakest " variant={"button"} />
      <span>New Workspace</span>
    </Link>
  );
};
