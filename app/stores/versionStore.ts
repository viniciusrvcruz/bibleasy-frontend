import type { Version } from '~/types/version/Version.type'
import type { BookWithChapters } from '~/types/book/Book.type'

export const useVersionStore = defineStore('version', () => {
  const config = useRuntimeConfig()
  const currentVersionName = useCookie<string | null>('current-version-name')

  const versions = ref<Version[]>([])
  const currentVersion = ref<Version | null>(null)
  const currentVersionBooks = ref<BookWithChapters[]>([])

  // Flatten all chapters from all books into a single array
  const allChapters = computed(() => {
    return currentVersionBooks.value.flatMap(book => 
      book.chapters.map(chapter => ({
        ...chapter,
        book: {
          abbreviation: book.abbreviation,
          name: book.name
        }
      }))
    )
  })

  const setVersions = (data: Version[]) => {
    versions.value = data

    if (currentVersionName.value) {
      currentVersion.value = versions.value.find(version => version.abbreviation === currentVersionName.value) ?? null
    }

    if (!currentVersion.value) {
      const defaultVersionAbbreviation = config.public.defaultVersionAbbreviation

      if (defaultVersionAbbreviation) {
        currentVersion.value = getVersionByAbbreviation(defaultVersionAbbreviation) ?? null
      }

      currentVersion.value
        ? setCurrentVersion(currentVersion.value)
        : setCurrentVersion(versions.value[0] ?? null)
    }
  }

  const setCurrentVersion = (version: Version | null) => {
    currentVersion.value = version
    currentVersionName.value = version?.abbreviation ?? null
  }

  const setCurrentVersionBooks = (books: BookWithChapters[]) => {
    currentVersionBooks.value = books
  }

  const setCurrentVersionWithBooks = (version: Version, books: BookWithChapters[]) => {
    setCurrentVersion(version)
    setCurrentVersionBooks(books)
  }

  const getVersionByAbbreviation = (abbreviation: string) => {
    return versions.value.find(version => version.abbreviation.toLowerCase() === abbreviation.toLowerCase()) ?? null
  }

  const getBookByAbbreviation = (abbreviation: string) => {
    return currentVersionBooks.value.find(book => book.abbreviation.toLowerCase() === abbreviation.toLowerCase()) ?? null
  }

  const getBookByName = (name: string) => {
    return currentVersionBooks.value.find(book => book.name === name)
  }

  return {
    versions,
    currentVersion,
    currentVersionBooks,
    allChapters,
    setVersions,
    setCurrentVersion,
    setCurrentVersionBooks,
    setCurrentVersionWithBooks,
    getVersionByAbbreviation,
    getBookByAbbreviation,
    getBookByName,
  }
})