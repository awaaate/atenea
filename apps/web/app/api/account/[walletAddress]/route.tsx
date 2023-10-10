import { generateNounImage, getAccountNouns } from "@shared/api/src/noun-image";
export async function GET(
  request: Request,
  { params }: { params: { walletAddress: string } }
) {
  const nounId = await getAccountNouns(params.walletAddress);

  if (!nounId) {
    return new Response(null, {
      headers: {
        "Content-Type": "image/svg+xml",
      },
    });
  }

  const image = await generateNounImage(nounId.id);
  //fallback to default image

  return new Response(image, {
    headers: {
      "Content-Type": "image/svg+xml",
    },
  });
}
