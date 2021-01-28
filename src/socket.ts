import { Server, Socket } from "socket.io";
import { Address, AddressBalance } from "./models/init-models";

type Stream = {
  ws_id: string;
  addr_id: number;
};
const streams: Stream[] = [];

const removeStreamBySocketId = (socket_id: string) => {
  const index = streams.findIndex((s) => s.ws_id === socket_id);
  if (index !== -1) streams.splice(index, 1);
};

setInterval(() => {
  streams.forEach((st) => {
    AddressBalance.findOne({
      where: {
        addressId: st.addr_id,
      },
      order: [["createdAt", "DESC"]],
    }).then(
      (latest) => latest && io.to(st.ws_id).emit("updateBalance", latest.value)
    );
  });
}, Number(process.env.BALANCE_UPDATE_PERIOD_MS));

const io = new Server(8080, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

io.on("connect", (socket: Socket) => {
  console.log(`connect ${socket.id}`);

  socket.on("subscribe", async (addr_id: number) => {
    AddressBalance.findOne({
      where: {
        addressId: addr_id,
      },
      order: [["createdAt", "DESC"]],
    }).then((latest) => latest && socket.emit("updateBalance", latest.value));

    streams.push({
      ws_id: socket.id,
      addr_id: addr_id,
    });
  });

  socket.on("unsubscribe", async () => removeStreamBySocketId(socket.id));

  socket.on("disconnect", () => {
    console.log(`disconnect ${socket.id}`);
    removeStreamBySocketId(socket.id);
  });
});
