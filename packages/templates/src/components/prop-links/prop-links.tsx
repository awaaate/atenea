import { Button } from "@shared/ui/src/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@shared/ui/src/card";
import { Icon } from "@shared/ui/src/icon";
import { Separator } from "@shared/ui/src/separator";

interface PropLinksProps {
  id: string;
}
export const PropLinks: React.FC<PropLinksProps> = ({ id }) => {
  return (
    <Card
      className="bg-surface-default shadow-card rounded-lg  w-full border"
      style={{
        maxWidth: 400,
      }}
    >
      <CardHeader className="">
        <CardTitle className="text-center text-lg text-text-weak font-bold">
          Where you want to view this proposal?
        </CardTitle>
      </CardHeader>
      <PropLink name="Atenea" value={`https://atenea.wtf/w/${id}`} />
      <Separator />
      <PropLink name="Nouns" value={`https://nouns.wtf/vote/${id}`} />
      <Separator />
      <PropLink name="Agora" value={`https://nounsagora.com/proposals/${id}`} />
    </Card>
  );
};

const PropLink: React.FC<{ name: string; value: string }> = ({
  name,
  value,
}) => {
  return (
    <a
      href={value}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 w-full  transition-colors justify-between flex items-center hover:bg-active-default"
    >
      {name}
      <Icon name="ArrowRight" />
    </a>
  );
};
