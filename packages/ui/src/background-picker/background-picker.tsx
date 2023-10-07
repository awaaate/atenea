"use client";

import { Button } from "../button";
import { Input } from "../input";
import { cn } from "../lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";

import { ToggleGroup } from "@radix-ui/react-toggle-group";
import React, { forwardRef, useMemo } from "react";
import { Icon } from "../icon";
import { ToogleItem } from "../toggle-group";

interface BackgroundPickerProps {
  background: string;
  setBackground: (background: string) => void;
  className?: string;
}
const solids = [
  "#E2E2E2",
  "#ff75c3",
  "#ffa647",
  "#ffe83f",
  "#9fff5b",
  "#70e2ff",
  "#cd93ff",
  "#09203f",
  "transparent",
];
const gradients = [
  "linear-gradient(to top left,#accbee,#e7f0fd)",
  "linear-gradient(to top left,#d5d4d0,#d5d4d0,#eeeeec)",
  "linear-gradient(to top left,#000000,#434343)",
  "linear-gradient(to top left,#09203f,#537895)",
  "linear-gradient(to top left,#AC32E4,#7918F2,#4801FF)",
  "linear-gradient(to top left,#f953c6,#b91d73)",
  "linear-gradient(to top left,#ee0979,#ff6a00)",
  "linear-gradient(to top left,#F00000,#DC281E)",
  "linear-gradient(to top left,#00c6ff,#0072ff)",
  "linear-gradient(to top left,#4facfe,#00f2fe)",
  "linear-gradient(to top left,#0ba360,#3cba92)",
  "linear-gradient(to top left,#FDFC47,#24FE41)",
  "linear-gradient(to top left,#8a2be2,#0000cd,#228b22,#ccff00)",
  "linear-gradient(to top left,#40E0D0,#FF8C00,#FF0080)",
  "linear-gradient(to top left,#fcc5e4,#fda34b,#ff7882,#c8699e,#7046aa,#0c1db8,#020f75)",
  "linear-gradient(to top left,#ff75c3,#ffa647,#ffe83f,#9fff5b,#70e2ff,#cd93ff)",
];
const images = [
  "url(https://images.unsplash.com/photo-1691200099282-16fd34790ade?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90)",
  "url(https://images.unsplash.com/photo-1691226099773-b13a89a1d167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90",
  "url(https://images.unsplash.com/photo-1688822863426-8c5f9b257090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90)",
  "url(https://images.unsplash.com/photo-1691225850735-6e4e51834cad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90)",
  "url(/images/bg/knw.jpg)",
  "url(/images/bg/img1.jpg)",
  "url(/images/bg/img2.jpg)",
  "url(/images/bg/img3.jpg)",
  "url(/images/bg/img4.jpg)",
  "url(/images/bg/img5.jpg)",
  "url(/images/bg/img6.jpg)",
  "url(/images/bg/img7.jpg)",
  "url(/images/bg/img8.jpg)",
  "url(/images/bg/img9.jpg)",
];

export function BackgroundPicker({
  background,
  setBackground,
  className,
}: BackgroundPickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            "w-full justify-start text-left font-normal",
            !background && "text-muted-foreground",
            className
          )}
        >
          <div className="w-full flex items-center gap-2">
            {background ? (
              <div
                className="icon-m rounded !bg-center !bg-cover transition-all"
                style={{ background }}
              ></div>
            ) : (
              <Icon name="Paintbrush2" className="h-4 w-4" />
            )}
            <div className="flex-1 text-sm text-text-weak font-semibold">
              {"Background"}
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <BackgroundPickerTabs
          background={background}
          setBackground={setBackground}
        />
        <Input
          id="custom"
          value={background}
          className="col-span-2 h-8 mt-4"
          onChange={(e) => setBackground(e.currentTarget.value)}
        />
      </PopoverContent>
    </Popover>
  );
}
export const BackgroundPickerTabs: React.FC<BackgroundPickerProps> = ({
  background,
  setBackground,
}) => {
  const defaultTab = useMemo(() => {
    if (background.includes("url")) return "image";
    if (background.includes("gradient")) return "gradient";
    return "solid";
  }, [background]);
  return (
    <Tabs
      defaultValue={defaultTab}
      className="w-full justify-center flex flex-col items-center w-[300px]"
    >
      <TabsList className="w-[calc(100%-0.5rem)] my-2">
        <TabsTrigger className="flex-1" value="solid">
          Solid
        </TabsTrigger>
        <TabsTrigger className="flex-1" value="gradient">
          Gradient
        </TabsTrigger>
        <TabsTrigger className="flex-1" value="image">
          Image
        </TabsTrigger>
      </TabsList>
      <ToggleGroup
        type="single"
        className="w-full"
        value={background}
        onValueChange={setBackground}
      >
        <BackgroundsList value="solid">
          {solids.map((s) => (
            <BackgroundBox key={s} value={s} style={{ background: s }} />
          ))}
        </BackgroundsList>

        <BackgroundsList value="gradient">
          {gradients.map((s) => (
            <BackgroundBox key={s} value={s} style={{ background: s }} />
          ))}
        </BackgroundsList>

        <BackgroundsList value="image">
          {images.map((s) => (
            <BackgroundBox key={s} value={s} style={{ backgroundImage: s }} />
          ))}
        </BackgroundsList>
      </ToggleGroup>
    </Tabs>
  );
};
const BackgroundBox = forwardRef<
  React.ElementRef<typeof ToogleItem>,
  React.ComponentPropsWithoutRef<typeof ToogleItem>
>(({ className, ...props }, ref) => (
  <ToogleItem
    ref={ref}
    className={cn(
      " icon-xl  rounded-md border-2  data-[state=on]:border-blue-500 ",
      className
    )}
    {...props}
  />
));

const BackgroundsList: React.FC<React.ComponentProps<typeof TabsContent>> = ({
  className,
  ...props
}) => {
  return (
    <TabsContent
      className={cn("flex flex-wrap  gap-1 mt-0 px-2", className)}
      {...props}
    />
  );
};
