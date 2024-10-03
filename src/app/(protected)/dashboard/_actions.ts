"use server";

import { db } from "@/db";
import { rooms } from "@/db/schema";
import { actionClient } from "@/lib/safe-action";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const deleteRoomSchema = z.object({
  roomId: z.string(),
});

export const deleteRoomAction = actionClient
  .schema(deleteRoomSchema)
  .action(async (data) => {
    const { roomId } = data.parsedInput;
    try {
      await db.delete(rooms).where(eq(rooms.id, roomId));
      return { success: true };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
      return { success: false, error: "Something went wrong" };
    } finally {
      revalidatePath("/dashboard");
    }
  });

const createRoomSchema = z.object({
  name: z.string().min(1),
});

export const createRoomAction = actionClient
  .schema(createRoomSchema)
  .action(async (data) => {
    const { name } = data.parsedInput;
    const user = await currentUser();
    if (!user) throw new Error("User not found");
    try {
      const room = await db.insert(rooms).values({
        name,
        createdBy: user.id,
        participants: 0,
      });
      return { success: true, roomId: room.lastInsertRowid };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
      return { success: false, error: "Something went wrong" };
    } finally {
      revalidatePath("/dashboard");
    }
  });
