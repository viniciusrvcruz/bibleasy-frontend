type SupportModalController = {
  open: () => void
}

type MaybeRef<T> = { value: T } | null | undefined

type SupportModalExposed = {
  open: () => void
}

export const useSupportModal = () => {
  const controller = useState<SupportModalController | null>(
    'supportModalController',
    () => null,
  )

  const registerRef = (supportModalRef: MaybeRef<SupportModalExposed | null>) => {
    controller.value = {
      open: () => supportModalRef?.value?.open(),
    }
  }

  const open = () => {
    controller.value?.open()
  }

  return { registerRef, open }
}

