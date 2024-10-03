import { db } from "@/db";
import { RoomCanvas } from "./room-canvas";
import { clerkClient } from "@clerk/nextjs/server";
import { CopyRoomLinkButton } from "./_interactive";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    roomId: string;
  };
}

export default async function RoomPage({ params }: PageProps) {
  const roomId = params.roomId;
  const room = await db.query.rooms.findFirst({
    where: (table, { eq }) => eq(table.id, roomId),
  });
  if (!room) notFound();
  const creator = await clerkClient.users.getUser(room.createdBy);
  return (
    <>
      <div className="p-6 *:space-y-2 flex justify-between items-center">
        <div>
          <h1 className="font-semibold text-lg">Room: {room.name}</h1>
          <p className="text-muted-foreground text-sm">
            Created by: {creator.fullName}
          </p>
        </div>
        <CopyRoomLinkButton />
      </div>
      <div className="flex-1 relative">
        <RoomCanvas roomId={params.roomId} />
      </div>
    </>
  );
}
