/**
 * blog controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::blog.blog');


// export default factories.createCoreController('api::blog.blog', () => ({
//   async create(ctx) {
//     // Step 1: Check if the user has manually selected a blogPublishDay via the date picker.
//     // If not provided, auto-fill it with the current date and time.
//     if (!ctx.request.body.data?.blogPublishDay) {
//       // Step 2: Spread the existing request data to preserve all other fields,
//       // then override blogPublishDay with the current UTC date/time (ISO 8601 format).
//       ctx.request.body.data = {
//         ...ctx.request.body.data,
//         blogPublishDay: new Date().toISOString(),
//       };
//     }
//     // Step 3: If the user manually selected a date, skip the above block —
//     // their chosen value is already in ctx.request.body.data.blogPublishDay.

//     // Step 4: Call the default Strapi core create handler to save the blog entry.
//     return super.create(ctx);
//   },
// }));
