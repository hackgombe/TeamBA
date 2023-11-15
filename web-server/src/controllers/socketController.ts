import { Server, Socket } from "socket.io";
const handleSocketEvents = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("A user connected");
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
    // Other event handling logic can be added here
  });
};

export default handleSocketEvents;
