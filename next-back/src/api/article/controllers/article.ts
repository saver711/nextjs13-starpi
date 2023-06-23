/**
 * article controller
 */
import { factories } from "@strapi/strapi";
import axios from "axios";
// import  { parseMultipartData } from "@strapi/utils/lib"

// const parseBody = (ctx) => {
//   if (ctx.is("multipart")) {
//     return parseMultipartData(ctx);
//   }

//   const { data } = ctx.request.body || {};

//   return { data };
// };

// const isObject = (a) => a instanceof Object;

export default factories.createCoreController(
  "api::article.article",
  ({ strapi }) => ({
    async create(ctx) {
      const response = await super.create(ctx);

      if (response) {
        await axios.get(
          "http://localhost:3000/api/revalidate?path=/articles&secret=6101998"
        );
      }


      return response;
    },
    async update(ctx) {
        const response = await super.update(ctx);

        if (response) {
          await axios.get(
            "http://localhost:3000/api/revalidate?path=/articles&secret=6101998"
          );
        }

        return response;
    },
  })
);
