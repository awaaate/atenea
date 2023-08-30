"use client";
import { z } from "zod";
import {
  useForm,
  Form,
  zodResolver,
  FormField,
  FormControl,
  FormDescription,
  FormLabel,
  FormMessage,
  FormItem,
  Input,
  Textarea,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Button,
  Icon,
  Spinner,
  Link,
  Banner,
  BannerTitle,
  BannerDescription,
  BannerRoot,
} from "@shared/ui";
import { CoverImageInput } from "./cover-image-input";
import { FormValues, defaultFormValues, formSchema } from "./form-schema";
import React from "react";
import { TeamField } from "./team-form";
import { CategoriesField } from "./categories-field";
import { BudgetField } from "./budget-field";
import { RoadmapField } from "./roadmap-field";
import { ProjectField } from "./project-field";
import { trpc } from "@/lib/trpcClient";
import PromptMaker from "../prompt-maker";

export const proposalSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  coverImage: z.string(),
  budgetTotal: z.number(),
});

interface ProposalFormProps extends Partial<FormValues> {}

const ProposalForm: React.FC<ProposalFormProps> = ({ ...defaultValues }) => {
  const [json, setJson] = React.useState<string>("");
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultFormValues(defaultValues),
  });
  console.log(form.watch("budget.totalAmount"));

  const { mutateAsync: updateProposal, isLoading } =
    trpc.updateProposal.useMutation();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (data) => {
          console.log(data);
          const response = await updateProposal(data);
          console.log(response);
        })}
        className="space-y-8"
      >
        <Tabs
          className="bg-surface-default rounded-default shadow-popout-dark"
          defaultValue="proposal"
          onValueChange={() => {
            setJson(JSON.stringify(form.getValues(), null, 4));
          }}
        >
          <div className="border-b w-full py-2 px-6 flex  gap-4 justify-between items-center">
            <Button type="submit" className="float-right" variant={"ghost"}>
              <Link href="/proposals">
                <Icon name="ArrowLeft" className="mr-2" />
                Back to proposals
              </Link>
            </Button>
            <div className="flex gap-2">
              <Button type="submit" className="float-right">
                {isLoading ? <Spinner size="sm" /> : "Save"}
              </Button>
              <Button variant={"primary"} className="float-right mr-2">
                <Link href={`/proposal/${form.watch("id")}`} target="_blank">
                  View
                </Link>
              </Button>
            </div>
          </div>
          <TabsList className="bg-surface-default">
            <TabsTrigger value="proposal">Proposal</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
            <TabsTrigger value="project">Project</TabsTrigger>
            <TabsTrigger value="roadmap">Roadamp</TabsTrigger>
            <TabsTrigger value="json">JSON</TabsTrigger>
            <TabsTrigger value="prompt">Prompt</TabsTrigger>
          </TabsList>

          <TabsContent value="proposal" className="p-6">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Id</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="320"
                      {...field}
                      type="number"
                      onChange={({ target }) => {
                        field.onChange(parseInt(target.value));
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    The id of the proposal. This is a unique identifier.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Nouns proposal" {...field} />
                  </FormControl>
                  <FormDescription>The title of the proposal.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter description here" {...field} />
                  </FormControl>
                  <FormDescription>
                    The description of the proposal.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CoverImageInput />
            <CategoriesField control={form.control} />
          </TabsContent>
          <TabsContent value="team" className="p-6">
            <TeamField control={form.control} />
          </TabsContent>
          <TabsContent value="budget" className="p-6">
            <BudgetField control={form.control} />
          </TabsContent>
          <TabsContent value="roadmap" className="p-6">
            <RoadmapField control={form.control} />
          </TabsContent>
          <TabsContent value="project" className="p-6">
            <ProjectField control={form.control} />
          </TabsContent>
          <TabsContent value="json">
            <Textarea
              value={json}
              onChange={(e) => {
                setJson(e.target.value);
              }}
            ></Textarea>

            <Button
              type="button"
              onClick={() => {
                const newData = JSON.parse(json);
                console.log(newData);
                form.reset(newData);
              }}
            >
              Update json
            </Button>
          </TabsContent>
          <TabsContent value="prompt">
            <PromptMaker />
          </TabsContent>
        </Tabs>
        <BannerRoot variant={"danger"}>
          <BannerTitle>Form error</BannerTitle>
          <BannerDescription>
            {Object.entries(form.formState.errors).map(([name, error]) => (
              <li key={name}>
                {name}: {error.message}
              </li>
            ))}
          </BannerDescription>
        </BannerRoot>
      </form>
    </Form>
  );
};

export { ProposalForm };

//@trpc/client @trpc/react-query @tanstack/react-query
