import {
  Button,
  FormDescription,
  FormItem,
  FormLabel,
  Icon,
  Spinner,
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
      <div className="relative bg-surface-raised border p-2 rounded-default m-4">
        <img
          src={form.getValues("coverImage")}
          alt="cover image"
          className="w-full h-full rounded-default"
          width={500}
          height={500}
        />
        <Button
          variant={"destructive"}
          onClick={() => form.setValue("coverImage", "")}
          className="absolute top-0 right-0 rounded-full icon-xl p-1"
        >
          <Icon name="Trash2" className="text-current" />
        </Button>
      </div>
    );
  }
  return (
    <FormItem className="bg-s">
      <FormLabel>Cover Image</FormLabel>
      <UploadButton
        content={{
          button(arg) {
            return (
              <Button
                {...arg}
                variant={"primary"}
                className="pointer-events-none"
              >
                {arg.isUploading ? (
                  <Spinner className=" text-black/20 fill-black icon-s" />
                ) : (
                  "Upload cover Image"
                )}
              </Button>
            );
          },
          allowedContent({ ready, fileTypes, isUploading }) {
            if (!ready) return "Checking what you allow";
            if (isUploading) return "uploading...";
            return `Stuff you can upload: ${fileTypes.join(", ")}`;
          },
        }}
        className="bg-surface-raised p-8 ut-label:text-lg ut-allowed-content:ut-uploading:text-red-300 border-2 rounded-default"
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
