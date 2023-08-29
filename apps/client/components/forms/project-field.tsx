"use client";

import {
  Button,
  FormControl,
  Input,
  FormItem,
  FormLabel,
  useFieldArray,
  Control,
  useFormContext,
  Textarea,
} from "@shared/ui";
import { z } from "zod";
import { FormValues } from "./form-schema";
import React from "react";
import { ProjectCommandMenu } from "../command-menus/project-command-menu";

interface ProjectFieldProps {
  control: Control<FormValues>;
}

export const ProjectField: React.FC<ProjectFieldProps> = ({ control }) => {
  const { register, setValue } = useFormContext();

  return (
    <FormItem>
      <FormLabel htmlFor="budget">
        Add exisiting project or create new one
        <ProjectCommandMenu
          addProject={(project) => {
            setValue("project", project);
          }}
        />
      </FormLabel>
      <FormItem>
        <FormLabel htmlFor="projectName">Project Title</FormLabel>
        <FormControl>
          <Input {...register("project.title")} />
        </FormControl>
      </FormItem>
      <FormItem>
        <FormLabel htmlFor="projectDescription">Project Description </FormLabel>
        <FormControl>
          <Textarea {...register("project.description")} />
        </FormControl>
      </FormItem>
    </FormItem>
  );
};
