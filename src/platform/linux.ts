import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execa, execaSync } from 'execa'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const xsel = 'xsel'
const xselFallback = path.join(__dirname, '../fallbacks/linux/xsel')

const copyArguments = ['--clipboard', '--input']
const pasteArguments = ['--clipboard', '--output']

interface XselError {
  code: string
}

interface XselErrorDetails {
  xselError?: XselError
  fallbackError?: unknown
}

type CustomError = Error & XselErrorDetails

const makeError = (xselError: XselError, fallbackError: unknown): CustomError => {
  let error: CustomError
  if (xselError.code === 'ENOENT')
    error = new Error('Couldn\'t find the `xsel` binary and fallback didn\'t work. On Debian/Ubuntu you can install xsel with: sudo apt install xsel') as CustomError
  else {
    error = new Error('Both xsel and fallback failed') as CustomError
    error.xselError = xselError
  }

  error.fallbackError = fallbackError
  return error
}

const xselWithFallback = async (argumentList: readonly string[] | undefined, options: any) => {
  try {
    const { stdout } = await execa(xsel, argumentList, options)
    return stdout
  }
  catch (xselError: any) {
    try {
      const { stdout } = await execa(xselFallback, argumentList, options)
      return stdout
    }
    catch (fallbackError: any) {
      throw makeError(xselError, fallbackError)
    }
  }
}

const xselWithFallbackSync = (argumentList: readonly string[] | undefined, options: any) => {
  try {
    return execaSync(xsel, argumentList, options).stdout
  }
  catch (xselError: any) {
    try {
      return execaSync(xselFallback, argumentList, options).stdout
    }
    catch (fallbackError: any) {
      throw makeError(xselError, fallbackError)
    }
  }
}

export const linux = {
  async copy(options: any) {
    await xselWithFallback(copyArguments, options)
  },
  copySync(options: any) {
    xselWithFallbackSync(copyArguments, options)
  },
  paste: (options: any) => xselWithFallback(pasteArguments, options),
  pasteSync: (options: any) => xselWithFallbackSync(pasteArguments, options),
}
