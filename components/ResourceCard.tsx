import Image from "next/image";
import Link from "next/link";
import Card from "~/components/Card";
import Resource from "~/types/Resource";

export default function LeaderboardGridItem({
  resource,
  className,
}: {
  resource: Resource;
  className?: string;
}) {
  return (
    <Link href={resource.link} target="_blank">
      <Card
        className={`overflow-hidden h-full flex flex-col justify-end hover:scale-105 cursor-pointer transition duration-300 ${className}`}
      >
        <div className="">
          <div className="relative min-w-[50px] min-h-[250px] flex items-center justify-center min-w-lg bg-tan-500 border-b border-gray-300">
            <Image
              src={resource.image_url}
              alt={resource.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex items-center justify-between h-20 min-w-0 gap-3 px-4 py-4 sm:px-6">
            <div className="">
              <h4 className="flex items-center gap-1">
                <span className="truncate">{resource.title}</span>
              </h4>
              {resource.supporting_text && (
                <p className="text-sm text-gray-500">
                  {resource.supporting_text}
                </p>
              )}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
