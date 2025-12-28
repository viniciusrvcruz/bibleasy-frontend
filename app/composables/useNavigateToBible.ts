export const useNavigateToBible = () => {
  const router = useRouter()
  const versionStore = useVersionStore()

  const goToChapter = (book: string, chapter: number, verse?: number) => {
    const version = versionStore.currentVersion
      ? `.${versionStore.currentVersion.name}`
      : ''
    const hash = verse && verse > 1
      ? `#v${verse}`
      : ''

    router.push(`/bible/${book}.${chapter}${version}${hash}`)
  }

  return { goToChapter }
}

