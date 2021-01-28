import { Context } from "koa";
import { Controller, Ctx, Get, Params, Post } from "koa-ts-controllers";
import { Address } from "@/models/address";

@Controller("/address")
export default class AddressController {
  @Post("/")
  async add(@Ctx() ctx: Context) {
    const {
      addr,
      addrType,
    }: { addr: string; addrType: string } = ctx.request.body;
    const regex = new RegExp(/^0x[a-fA-F0-9]{40}$/);

    if (regex.test(addr)) {
      const new_addr = await Address.create({
        address: addr,
        type: addrType,
      });

      return {
        success: true,
        payload: new_addr,
      };
    } else {
      return {
        success: false,
        reason: "Invalid format",
      };
    }
  }

  @Get("/")
  async index(@Ctx() ctx: Context) {
    return await Address.findAll();
  }
}
