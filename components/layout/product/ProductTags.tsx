import { Badge } from "@/components/ui/badge";

const ProductsTags = ({ tags }: { tags: string[] | undefined }) => {
  return (
    <>
      {tags && tags.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag: string, index: number) => (
              <Badge key={index} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductsTags;
