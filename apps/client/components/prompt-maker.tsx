import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  Button,
  Textarea,
  Banner,
} from "@shared/ui";
import { useState } from "react";

import { formSchema } from "./forms/form-schema";
import zodToJsonSchema from "zod-to-json-schema";

const PromptMaker = () => {
  const [proposal, setProposal] = useState("");
  const [copied, setCopied] = useState(false);

  const onSubmit = () => {
    console.log("submited");

    //download the json
    const prmpt = setPrompt(proposal);

    //copy to clipboard
    navigator.clipboard.writeText(prmpt).then(() => {
      setCopied(true);
    });
  };

  return (
    <div className="space-y-8">
      <FormItem>
        <FormLabel htmlFor="proposal">Proposal</FormLabel>
        <FormControl>
          <Textarea
            onChange={(e) => {
              setProposal(e.target.value);
            }}
            value={proposal}
          />
        </FormControl>
        <Button
          type="button"
          className="w-full"
          onClick={() => {
            onSubmit();
          }}
        >
          Copy Prompt
        </Button>
        {copied && (
          <Banner variant={"success"} title="Copied to clipboard!"></Banner>
        )}
      </FormItem>
    </div>
  );
};

function setPrompt(proposal: string) {
  return `  
Make a JSON object about the text, following the schema, don't make up things

TEXT

#########
${proposal}

#########




SCHEMA

#########
${JSON.stringify(zodToJsonSchema(formSchema), null, 2)}
#########




JSON

#########
 `.trim();
}
export default PromptMaker;
