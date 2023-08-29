import {
  Button,
  FormDescription,
  FormItem,
  FormLabel,
  Icon,
  useFormContext,
} from "@shared/ui";
import React from "react";
import * as z from "zod";
import { proposalSchema } from "./proposal-form";
import Image from "next/image";
import { UploadButton } from "@/lib/utils";

type proposalType = z.infer<typeof proposalSchema>;
const CoverImageInput = () => {
  const form = useFormContext<proposalType>();

  if (form.watch("coverImage")) {
    return (
      <div className="relative">
        <Image
          src={form.getValues("coverImage")}
          alt="cover image"
          width={500}
          height={500}
        />
        <Button
          variant={"ghost"}
          onClick={() => form.setValue("coverImage", "")}
          className="absolute top-0 right-0"
        >
          <Icon name="Trash2" />
        </Button>
      </div>
    );
  }
  return (
    <FormItem>
      <FormLabel>Cover Image</FormLabel>
      <UploadButton
        content={{
          button: "Upload Image",
        }}
        className="bg-surface-default p-8 ut-label:text-lg ut-allowed-content:ut-uploading:text-red-300 ut-button:p-2 ut-button:bg-accent border-2 rounded-default"
        appearance={{
          allowedContent: "image/*",
        }}
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          if (!res) return;

          form.setValue("coverImage", res[0].url);
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
      <FormDescription>Upload a cover image for your proposal.</FormDescription>
    </FormItem>
  );
};

export { CoverImageInput };
