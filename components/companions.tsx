import { Companion } from "@prisma/client";
import Image from "next/image";
import { number } from "zod";
import { Card, CardFooter, CardHeader } from "./ui/card";
import Link from "next/link";
import { MessageSquare } from "lucide-react";

interface CompanionProps {
  data: (Companion & {
    _count: {
      messages: number;
    };
  })[];
}

export const Companions = ({ data }: CompanionProps) => {
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center pt-10 space-y-3">
        <div className="relative w-60 h-60">
          <Image fill alt="Empty" src="/empty.png" />
        </div>
        <p className="text-sm text-muted-foreground">No Companions found.</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-2 pb-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {data.map((item) => (
        <Card
          key={item.id}
          className="transition border-0 cursor-pointer bg-primary/10 rounded-xl hover:opacity-75"
        >
          <Link href={`/chat/${item.id}`}>
            <CardHeader className="flex items-center justify-center text-center text-muted-foreground">
              <div className="relative w-32 h-32">
                <Image
                  src={item.src}
                  fill
                  className="object-cover rounded-xl"
                  alt="Companion"
                />
              </div>
              <p className="font-bold">{item.name}</p>
              <p className="text-xs">{item.description}</p>
            </CardHeader>
            <CardFooter className="items-center justify-between text-xs flext text-muted-foreground">
              <p className="lowercase">@{item.userName}</p>
              <div className="flex items-center">
                <MessageSquare className="w-3 h-3 mr-1" />
                {item._count.messages}
              </div>
            </CardFooter>
          </Link>
        </Card>
      ))}
    </div>
  );
};
