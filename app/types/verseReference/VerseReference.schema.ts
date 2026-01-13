import { z } from "zod";

export const verseReferenceSchema = z.object({
  id: z.int(),
  slug: z.string(),
  text: z.string(),
})