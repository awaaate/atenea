import { PropLinks } from "@shared/templates/src/components/prop-links";
export default function Home({
  params,
}: {
  params: {
    propId: string;
  };
}) {
  return (
    <div className="bg-surface-lowered w-screen h-screen flex justify-center items-center">
      <PropLinks id={params.propId} />
    </div>
  );
}
