import { Sequelize } from "sequelize";

import {
  Address,
  AddressAttributes,
  AddressCreationAttributes,
} from "./address";
import {
  AddressBalance,
  AddressBalanceAttributes,
  AddressBalanceCreationAttributes,
} from "./addr_balance";
import {
  ExchangeRate,
  ExchangeRateAttributes,
  ExchangeRateCreationAttributes,
} from "./exchange_rate";

export {
  Address,
  AddressAttributes,
  AddressCreationAttributes,
  AddressBalance,
  AddressBalanceAttributes,
  AddressBalanceCreationAttributes,
  ExchangeRate,
  ExchangeRateAttributes,
  ExchangeRateCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  Address.initModel(sequelize);
  AddressBalance.initModel(sequelize);
  ExchangeRate.initModel(sequelize);

  AddressBalance.belongsTo(Address, {
    targetKey: "id",
    foreignKey: "addressId",
  });
  Address.hasMany(AddressBalance, { sourceKey: "id", foreignKey: "addressId" });

  return {
    Address,
    AddressBalance,
    ExchangeRate,
  };
}
