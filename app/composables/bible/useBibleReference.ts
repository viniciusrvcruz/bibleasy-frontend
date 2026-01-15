import { getBookAbbreviation, BookAbbreviation, type BookAbbreviationType } from '~/utils/book'
import type { Version } from '~/types/version/Version.type'

export interface ParsedReference {
  book: BookAbbreviationType
  chapter: number
  version: Version
}

export const useBibleReference = (reference: string): ParsedReference => {
  const versionStore = useVersionStore()

  const [bookParam, chapterParam, versionNameParam] = reference.split('.')

  const book = getBookAbbreviation(bookParam ?? '') ?? BookAbbreviation.jhn
  const chapter = Number(chapterParam) || 1

  const version = versionNameParam
    ? versionStore.getVersionByAbbreviation(versionNameParam)
    : versionStore.currentVersion

  if (!version) {
    throw createAppError('A versão não foi encontrada')
  }

  return { book, chapter, version }
}
