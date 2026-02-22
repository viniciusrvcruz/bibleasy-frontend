import { z } from 'zod'

export enum VerseTitleTypeEnum {
  SECTION = 'section',
  REFERENCE = 'reference',
}

export const verseTitleSchema = z.object({
  text: z.string(),
  type: z.enum(VerseTitleTypeEnum),
})