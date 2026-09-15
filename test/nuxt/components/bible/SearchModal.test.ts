import { afterEach, describe, expect, it, vi } from 'vitest'
import { mockComponent, mountSuspended } from '@nuxt/test-utils/runtime'
import type { BookWithChapters } from '~/types/book/Book.type'
import SearchModal from '~/components/bible/SearchModal.vue'

const goToChapter = vi.fn()

vi.mock('~/composables/useNavigateToBible', () => ({
  useNavigateToBible: () => ({
    goToChapter,
  }),
}))

mockComponent('Icon', {
  props: ['icon'],
  template: '<span />',
})

function createBook(
  abbreviation: BookWithChapters['abbreviation'],
  name: string,
  chaptersCount: number,
): BookWithChapters {
  return {
    id: 1,
    name,
    abbreviation,
    order: 1,
    chapters: Array.from({ length: chaptersCount }, (_, index) => ({
      id: index + 1,
      number: index + 1,
      verses_count: 10,
    })),
  }
}

const booksFixture: BookWithChapters[] = [
  createBook('job', 'Jó', 42),
  createBook('jon', 'Jonas', 4),
  createBook('jhn', 'João', 21),
]

function setupDialogSpies() {
  return {
    showModal: vi.spyOn(HTMLDialogElement.prototype, 'showModal').mockImplementation(function (this: HTMLDialogElement) {
      this.setAttribute('open', '')
    }),
    close: vi.spyOn(HTMLDialogElement.prototype, 'close').mockImplementation(function (this: HTMLDialogElement) {
      this.removeAttribute('open')
    }),
  }
}

afterEach(() => {
  vi.restoreAllMocks()
  goToChapter.mockReset()
})

async function mountSearchModal() {
  setupDialogSpies()

  const wrapper = await mountSuspended(SearchModal)
  const versionStore = useVersionStore()

  versionStore.setCurrentVersionBooks(booksFixture)
  wrapper.vm.open()
  await nextTick()

  return wrapper
}

async function selectUniqueBook(wrapper: Awaited<ReturnType<typeof mountSearchModal>>) {
  const bookInput = wrapper.get('input[role="combobox"]')

  // João has 21 chapters, so typing "1" can still be part of a larger chapter number
  await bookInput.setValue('João')
  await nextTick()
  await nextTick()

  return bookInput
}

describe('BibleSearchModal book suggestions keyboard', () => {
  it('highlights the first suggestion and selects it with Enter', async () => {
    const wrapper = await mountSearchModal()
    const bookInput = wrapper.get('input[role="combobox"]')

    await bookInput.setValue('Jo')
    await nextTick()

    const options = wrapper.findAll('[role="option"]')

    expect(options.length).toBeGreaterThan(1)
    expect(options[0]!.attributes('aria-selected')).toBe('true')
    expect(options[0]!.classes()).toContain('bg-base-200')

    await bookInput.trigger('keydown', { key: 'Enter' })
    await nextTick()

    expect(wrapper.find('[role="listbox"]').exists()).toBe(false)
    expect((bookInput.element as HTMLInputElement).value).toBe(options[0]!.text())
  })

  it('moves the highlight with arrow keys and selects the highlighted book', async () => {
    const wrapper = await mountSearchModal()
    const bookInput = wrapper.get('input[role="combobox"]')

    await bookInput.setValue('Jo')
    await nextTick()

    const optionsBefore = wrapper.findAll('[role="option"]')

    expect(optionsBefore.length).toBeGreaterThan(1)

    await bookInput.trigger('keydown', { key: 'ArrowDown' })
    await nextTick()

    const options = wrapper.findAll('[role="option"]')

    expect(options[1]!.attributes('aria-selected')).toBe('true')
    expect(options[1]!.classes()).toContain('bg-base-200')
    expect(options[0]!.attributes('aria-selected')).toBe('false')

    await bookInput.trigger('keydown', { key: 'Enter' })
    await nextTick()

    expect(wrapper.find('[role="listbox"]').exists()).toBe(false)
    expect((bookInput.element as HTMLInputElement).value).toBe(options[1]!.text())
  })

  it('clamps the highlight at the list edges', async () => {
    const wrapper = await mountSearchModal()
    const bookInput = wrapper.get('input[role="combobox"]')

    await bookInput.setValue('Jo')
    await nextTick()

    await bookInput.trigger('keydown', { key: 'ArrowUp' })
    await nextTick()

    expect(wrapper.findAll('[role="option"]')[0]!.attributes('aria-selected')).toBe('true')

    const optionCount = wrapper.findAll('[role="option"]').length

    for (let i = 0; i < optionCount + 2; i++) {
      await bookInput.trigger('keydown', { key: 'ArrowDown' })
    }

    await nextTick()

    const options = wrapper.findAll('[role="option"]')

    expect(options[options.length - 1]!.attributes('aria-selected')).toBe('true')
  })
})

describe('BibleSearchModal field navigation with arrows', () => {
  it('moves focus between book, chapter and verse with arrow keys', async () => {
    const selectSpy = vi.spyOn(HTMLInputElement.prototype, 'select')
    const wrapper = await mountSearchModal()
    const bookInput = await selectUniqueBook(wrapper)
    const chapterInput = wrapper.get('input[type="number"]')
    const verseInput = wrapper.findAll('input[type="number"]')[1]!

    selectSpy.mockClear()

    ;(chapterInput.element as HTMLInputElement).focus()
    await chapterInput.setValue('1')
    await nextTick()

    await chapterInput.trigger('keydown', { key: 'ArrowUp' })
    await nextTick()

    expect(selectSpy.mock.contexts.at(-1)).toBe(bookInput.element)

    await bookInput.trigger('keydown', { key: 'ArrowDown' })
    await nextTick()

    expect(selectSpy.mock.contexts.at(-1)).toBe(chapterInput.element)

    await chapterInput.trigger('keydown', { key: 'ArrowDown' })
    await nextTick()

    expect(selectSpy.mock.contexts.at(-1)).toBe(verseInput.element)
    expect((chapterInput.element as HTMLInputElement).value).toBe('1')

    await verseInput.setValue('3')
    await nextTick()
    selectSpy.mockClear()

    await verseInput.trigger('keydown', { key: 'ArrowUp' })
    await nextTick()

    expect(selectSpy.mock.contexts.at(-1)).toBe(chapterInput.element)
    expect((verseInput.element as HTMLInputElement).value).toBe('3')
  })

  it('does not change chapter or verse values when pressing arrow keys', async () => {
    const wrapper = await mountSearchModal()
    await selectUniqueBook(wrapper)

    const chapterInput = wrapper.get('input[type="number"]')
    const verseInput = wrapper.findAll('input[type="number"]')[1]!

    ;(chapterInput.element as HTMLInputElement).focus()
    await chapterInput.setValue('1')
    await nextTick()

    await chapterInput.trigger('keydown', { key: 'ArrowDown' })
    await verseInput.trigger('keydown', { key: 'ArrowDown' })
    await nextTick()

    expect((chapterInput.element as HTMLInputElement).value).toBe('1')
    expect((verseInput.element as HTMLInputElement).value).toBe('')
  })
})
