import handleSocketEvents from "@controllers/socketController";
import { Server as HttpServer } from "http";
import { Server as SocketServer } from "socket.io";

const initSocketIO = (http: HttpServer): SocketServer => {
  const io = new SocketServer(http);
  handleSocketEvents(io);
  return io;
};

export default initSocketIO;
