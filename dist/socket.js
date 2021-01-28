"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const init_models_1 = require("./models/init-models");
const streams = [];
const removeStreamBySocketId = (socket_id) => {
    const index = streams.findIndex((s) => s.ws_id === socket_id);
    if (index !== -1)
        streams.splice(index, 1);
};
setInterval(() => {
    streams.forEach((st) => {
        init_models_1.AddressBalance.findOne({
            where: {
                addressId: st.addr_id,
            },
            order: [["createdAt", "DESC"]],
        }).then((latest) => latest && io.to(st.ws_id).emit("updateBalance", latest.value));
    });
}, Number(process.env.BALANCE_UPDATE_PERIOD_MS));
const io = new socket_io_1.Server(8080, {
    cors: {
        origin: "*",
        credentials: true,
    },
});
io.on("connect", (socket) => {
    console.log(`connect ${socket.id}`);
    socket.on("subscribe", (addr_id) => __awaiter(void 0, void 0, void 0, function* () {
        init_models_1.AddressBalance.findOne({
            where: {
                addressId: addr_id,
            },
            order: [["createdAt", "DESC"]],
        }).then((latest) => latest && socket.emit("updateBalance", latest.value));
        streams.push({
            ws_id: socket.id,
            addr_id: addr_id,
        });
    }));
    socket.on("unsubscribe", () => __awaiter(void 0, void 0, void 0, function* () { return removeStreamBySocketId(socket.id); }));
    socket.on("disconnect", () => {
        console.log(`disconnect ${socket.id}`);
        removeStreamBySocketId(socket.id);
    });
});
//# sourceMappingURL=socket.js.map