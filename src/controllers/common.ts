import { Context } from "koa";
import { Controller, Ctx, Get } from "koa-ts-controllers";

@Controller("/")
export default class BaseController {
  @Get("/available_tokens")
  async available_tokens(@Ctx() ctx: Context) {
    let tokens: string[] = [];
    if (process.env.TOKENS) {
      tokens = process.env.TOKENS.split(",");
    }
    return tokens;
  }

  @Get("/available_currencies")
  async available_currencies(@Ctx() ctx: Context) {
    let currencies: string[] = [];
    if (process.env.CURRENCIES) {
      currencies = process.env.CURRENCIES.split(",");
    }
    return currencies;
  }
}
