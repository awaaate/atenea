import { Badge } from "@shared/ui/src/badge";

export function ProposalCategoryView({ categories }: { categories: string[] }) {
  return (
    <div className="flex w-full  gap-2 p-2">
      {categories.map((category) => (
        <Badge key={category} className="p-2 text-md px-8" variant="highlight">
          {category}
        </Badge>
      ))}
    </div>
  );
}
