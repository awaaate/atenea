"use client";
import {
  useFieldArray,
  Control,
  useFormContext,
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  Input,
  Textarea,
  FormMessage,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  Icon,
  Spinner,
  ScrollArea,
  DialogFooter,
} from "@shared/ui";

import { z } from "zod";
import { formSchema } from "./form-schema";
import { Suspense } from "react";
import { TeamCommanMennu } from "../command-menus";

interface TeamFieldprops {
  control: Control<z.infer<typeof formSchema>>;
}

export const TeamField: React.FC<TeamFieldprops> = ({ control }) => {
  const { register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "team",
  });

  return (
    <FormItem className="flex flex-col">
      <FormLabel htmlFor="team">
        Team members
        <TeamCommanMennu
          addTeam={(team: any) => {
            append(team);
          }}
        />
      </FormLabel>
      {fields.map((team, index) => (
        <div key={team.id} className="flex gap-2 ">
          <FormItem className="flex-1">
            <FormLabel htmlFor="name">Name</FormLabel>
            <FormControl>
              <Input {...register(`team.${index}.name`)} placeholder="Name" />
            </FormControl>
          </FormItem>

          <div className="flex gap-1 items-end">
            <Button
              type="button"
              onClick={() => remove(index)}
              variant={"destructive"}
            >
              <Icon name="Trash2" />
            </Button>
            <Dialog>
              <DialogTrigger>
                <Icon name="MoreHorizontal" />
              </DialogTrigger>

              <DialogContent>
                <ScrollArea className="h-[400px]">
                  <DialogHeader>Edit Team Member</DialogHeader>
                  <div className="p-6 space-y-4">
                    <FormItem>
                      <FormLabel htmlFor="what">What</FormLabel>
                      <FormControl>
                        <Textarea
                          {...register(`team.${index}.what`)}
                          placeholder="What he did"
                        />
                      </FormControl>
                    </FormItem>
                    <FormItem>
                      <FormLabel htmlFor="walletAddress">
                        Wallet Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...register(`team.${index}.walletAddress`)}
                          placeholder="0x000"
                        />
                      </FormControl>
                    </FormItem>
                    <FormLabel htmlFor="socialmediaHandles">
                      Social Media Handles
                    </FormLabel>
                    <FormControl>
                      <SocialMediaHandlesField
                        control={control}
                        index={index}
                      />
                    </FormControl>
                    <FormMessage {...team} />
                  </div>
                </ScrollArea>
                <DialogFooter>
                  <p className="text-md text-text-weaker">
                    It's saved automatically{" "}
                  </p>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      ))}

      <FormDescription>
        Add the team members that will be working on this project.
      </FormDescription>
    </FormItem>
  );
};

const SocialMediaHandlesField: React.FC<{
  control: Control<z.infer<typeof formSchema>>;
  index: number;
}> = ({ control, index }) => {
  const { register, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `team.${index}.socialmediaHandles`,
  });

  console.log(watch(`team.${index}.socialmediaHandles`));

  return (
    <div className="mt-4">
      <div className="flex items-center">
        <FormLabel
          htmlFor="socialmediaHandles"
          className="text-lg font-semibold "
        >
          Social Media Handles
        </FormLabel>
        <Button
          type="button"
          onClick={() => append({ name: "", url: "" })}
          className="inline-flex ml-2"
          variant={"ghost"}
        >
          <Icon name="Plus" />
        </Button>
      </div>
      {fields.map((socialLink, socialLinkIndex) => (
        <div
          key={socialLink.id}
          className="flex flex-col gap-2 justify-between mt-4"
        >
          <FormItem>
            <FormLabel htmlFor="name">Name</FormLabel>
            <FormControl>
              <Input
                {...register(
                  `team.${index}.socialmediaHandles.${socialLinkIndex}.name`
                )}
              />
            </FormControl>
          </FormItem>
          <FormItem>
            <FormLabel htmlFor="url">URL</FormLabel>
            <FormControl>
              <Input
                {...register(
                  `team.${index}.socialmediaHandles.${socialLinkIndex}.url`
                )}
              />
            </FormControl>
          </FormItem>

          <FormMessage {...socialLink} />
          <Button
            type="button"
            variant={"destructive"}
            onClick={() => remove(index)}
          >
            Remove Social Link
          </Button>
        </div>
      ))}
    </div>
  );
};
