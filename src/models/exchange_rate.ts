import Sequelize, { DataTypes, Model, Optional } from "sequelize";

export interface ExchangeRateAttributes {
  id?: number;
  symbol?: string;
  price?: number;
}

export type ExchangeRatePk = "id";
export type ExchangeRateId = ExchangeRate[ExchangeRatePk];
export type ExchangeRateCreationAttributes = Optional<
  ExchangeRateAttributes,
  ExchangeRatePk
>;

export class ExchangeRate
  extends Model<ExchangeRateAttributes, ExchangeRateCreationAttributes>
  implements ExchangeRateAttributes {
  id?: number;
  symbol?: string;
  price?: number;

  public readonly createdAt!: Date;
  countExchangeRateItems!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize) {
    ExchangeRate.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: true,
          primaryKey: true,
          field: "Id",
        },
        symbol: {
          type: DataTypes.STRING,
          allowNull: false,
          field: "Symbol",
        },
        price: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          field: "Price",
        },
      },
      {
        sequelize,
        tableName: "ExchangeRate",
        timestamps: true,
      }
    );
    return ExchangeRate;
  }
}
