import { ProfilePage } from "@/components/profile-page";
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
import { Suspense } from "react";
import { CreateRoomDialog } from "./create-room";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

export async function RecentRooms() {
  const user = await currentUser();
  if (!user) throw new Error("User not found");
  const rooms = await db.query.rooms.findMany({
    where: (table, { eq }) => eq(table.createdBy, user.id),
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
                    {new Date(room.createdAt).toLocaleString()}
                  </TableCell>
                  {/* <TableCell>{room.createdBy}</TableCell> */}
                  <TableCell>
                    <Link href={`/room/${room.id}`}>
                      <Button>View</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {rooms.length === 0 && (
            <p className="text-center mt-4 text-muted-foreground">
              No rooms found matching your search.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
