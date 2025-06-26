const { z } = require('zod');

const ItemSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().nonnegative()
});


module.exports = { ItemSchema };
