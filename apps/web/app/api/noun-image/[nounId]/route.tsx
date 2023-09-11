import { generateNounImage } from "@shared/api/src/noun-image";
export async function GET(
  request: Request,
  { params }: { params: { nounId: string } }
) {
  const nounId = params.nounId;

  const image = await generateNounImage(nounId);

  return new Response(image, {
    headers: {
      "Content-Type": "image/svg+xml",
    },
  });
}
