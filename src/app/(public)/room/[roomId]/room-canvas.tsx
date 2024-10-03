"use client";

import { useSyncDemo } from "@tldraw/sync";
import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";

export function RoomCanvas({ roomId }: { roomId: string }) {
  const store = useSyncDemo({ roomId });

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <Tldraw store={store} />
    </div>
  );
}
