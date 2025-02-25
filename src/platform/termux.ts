import { execa, execaSync } from 'execa'

// Define a type for the error parameter
const handler = (error: NodeJS.ErrnoException) => {
  if (error.code === 'ENOENT')
    throw new Error('Couldn\'t find the termux-api scripts. You can install them with: apt install termux-api')

  throw error
}

// Define a type for the options parameter
type TermuxOptions = string[]

export const termux = {
  async copy(options: TermuxOptions) {
    try {
      await execa('termux-clipboard-set', options)
    }
    catch (error) {
      handler(error as Error)
    }
  },
  async paste(options: TermuxOptions) {
    try {
      const { stdout } = await execa('termux-clipboard-get', options)
      return stdout
    }
    catch (error) {
      handler(error as Error)
    }
  },
  copySync(options: TermuxOptions) {
    try {
      execaSync('termux-clipboard-set', options)
    }
    catch (error) {
      handler(error as Error)
    }
  },
  pasteSync(options: TermuxOptions) {
    try {
      return execaSync('termux-clipboard-get', options).stdout
    }
    catch (error) {
      handler(error as Error)
    }
  },
}
