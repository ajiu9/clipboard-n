import { execa, execaSync } from 'execa'

const env = {
  LC_CTYPE: 'UTF-8',
}

export const macos = {
  copy: async (options: { input: string }) => execa('pbcopy', { ...options, env }),
  async paste(options: { stripFinalNewline?: boolean }) {
    const { stdout } = await execa('pbpaste', { ...options, env })
    return stdout
  },
  copySync: (options: { input: string }) => execaSync('pbcopy', { ...options, env }),
  pasteSync: (options: { stripFinalNewline?: boolean }) => execaSync('pbpaste', { ...options, env }).stdout,
}
