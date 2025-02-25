import process from 'node:process'
import isWSL from 'is-wsl'
import { linux } from './platform/linux'
import { macos } from './platform/macos'
import { termux } from './platform/termux'
import { windows } from './platform/windows'

interface Clipboard {
  write: (text: string) => Promise<void>
  read: () => Promise<string | undefined>
  writeSync: (text: string) => void
  readSync: () => string | null | undefined
}

export const clipboard: Clipboard = (() => {
  const clipboard: Clipboard = {} as Clipboard
  const platform = platformLib()

  clipboard.write = async (text: string) => {
    if (typeof text !== 'string')
      throw new TypeError(`Expected a string, got ${typeof text}`)
    await platform.copy({ input: text })
  }

  clipboard.read = async () => platform.paste({ stripFinalNewline: false })

  clipboard.writeSync = (text: string) => {
    if (typeof text !== 'string')
      throw new TypeError(`Expected a string, got ${typeof text}`)

    platform.copySync({ input: text })
  }

  clipboard.readSync = () => platform.pasteSync({ stripFinalNewline: false })

  return clipboard
})()

function platformLib() {
  switch (process.platform) {
    case 'darwin': {
      return macos
    }

    case 'win32': {
      return windows
    }

    case 'android': {
      if (process.env.PREFIX !== '/data/data/com.termux/files/usr')
        throw new Error('You need to install Termux for this module to work on Android: https://termux.com')

      return termux
    }

    default: {
      // `process.platform === 'linux'` for WSL.
      if (isWSL)
        return windows

      return linux
    }
  }
}
