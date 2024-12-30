import { gql } from "urql";
import { Pool } from "../models";
import { CustomError } from "../utils/error_factory";
import { client } from "..";
import { NextFunction, Request, Response } from "express";
import { addPool, getSnapShots } from "../functions/pool";

const getPools = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const pools_query = gql`
      query MyQuery {
        Pool(limit: 100, order_by: { tvlUSD: desc }) {
          asset_0
          asset_1
          id
          create_time
          decimals_0
          decimals_1
          reserve_0
          reserve_1
          is_stable
          tvl
          tvlUSD
        }
      }
    `;

    //@ts-ignore
    const result = await client.query(pools_query);

    const pools = result.data.Pool;

    const toSend = [];

    for (const pool of pools) {
      let dbPool = await addPool(pool, next);

      toSend.push(dbPool);
    }

    return res.status(200).json({ success: toSend });
  } catch (error) {
    const statusCode = 500;
    const message = "Failed to get pools";

    return next(
      new CustomError(message, statusCode, { context: "getPools", error })
    );
  }
};

export { getPools };
