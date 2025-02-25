import { beforeEach, describe, expect, it, vi } from 'vitest'
import { clipboard } from '.'

describe('clipboard', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks()
  })

  describe('write', () => {
    it('should call platform.copy with the input string', async () => {
      await clipboard.writeSync('hello ajiu9')
      expect(clipboard.readSync()).toBe('hello ajiu9')
      await clipboard.write('hello world')
      expect(await clipboard.read()).toBe('hello world')
    })
  })
})
