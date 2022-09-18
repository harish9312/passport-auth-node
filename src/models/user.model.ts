// import { DataTypes } from "sequelize/types";
const { DataTypes } = require("sequelize");
import { compare, compareSync, genSalt } from "bcrypt";
import postgres from "../configuration/postgres.connection";
// import passportLocalSequelize from "passport-local-sequelize";

export const User = postgres.define(
  "Data",
  {
    id: {
      type: DataTypes.INTEGER,

      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    repeatPaswword: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "Data",
    timestamps: false,
  }
);

User.sync();
User.prototype.comparePassword = async function (password: string, cb) {
  console.log(password, this.password);
  var didMatch = await compare(password, this.password);
  console.log(didMatch);
};
