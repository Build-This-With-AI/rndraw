import { ProfilePage } from "@/components/profile-page";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { DeleteRoomButton } from "./_interactive";
import { CreateRoomDialog } from "./create-room";

export default function Dashboard() {
  return (
    <div className="flex-1">
      <ProfilePage />
      <Suspense>
        <RecentRooms />
      </Suspense>
    </div>
  );
}

async function RecentRooms() {
  const user = await currentUser();
  if (!user) throw new Error("User not found");
  const rooms = await db.query.rooms.findMany({
    where: (table, { eq }) => eq(table.createdBy, user.id),
    orderBy: (table, { desc }) => desc(table.createdAt),
  });
  return (
    <div className="mx-auto p-6 space-y-6 w-full">
      <div className="flex justify-end">
        <CreateRoomDialog />
      </div>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Room Name</TableHead>
                <TableHead>Created At</TableHead>
                {/* <TableHead>Created By</TableHead> */}
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rooms.map((room) => (
                <TableRow
                  key={room.id}
                  className="cursor-pointer hover:bg-muted"
                >
                  <TableCell className="font-medium">{room.name}</TableCell>
                  <TableCell>
                    {new Date(room.createdAt).toLocaleDateString()}
                  </TableCell>
                  {/* <TableCell>{room.createdBy}</TableCell> */}
                  <TableCell>
                    <div className="flex gap-2">
                      <Link href={`/room/${room.id}`}>
                        <Button size="icon">
                          <EyeIcon className="size-4" />
                        </Button>
                      </Link>
                      <DeleteRoomButton roomId={room.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {rooms.length === 0 && (
            <p className="text-center mt-4 text-muted-foreground">
              No rooms yet.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
