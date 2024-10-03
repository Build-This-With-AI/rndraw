import { RoomCanvas } from "./room-canvas";

interface PageProps {
  params: {
    roomId: string;
  };
}

export default function RoomPage({ params }: PageProps) {
  return (
    <div className="flex-1 relative">
      <RoomCanvas roomId={params.roomId} />
    </div>
  );
}
