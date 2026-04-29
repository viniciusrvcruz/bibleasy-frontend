export type SupportCreatePayload = {
  type: string
  description: string
  email?: string
  files: File[]
}

export function useSupportService() {
  const { post } = useApi()

  const create = (payload: SupportCreatePayload) => {
    const formData = new FormData()
    formData.append('type', payload.type)
    formData.append('description', payload.description.trim())

    if (payload.email?.trim()) {
      formData.append('email', payload.email.trim())
    }

    for (const file of payload.files) {
      formData.append('files[]', file)
    }

    return post('support', formData)
  }

  return {
    create,
  }
}
