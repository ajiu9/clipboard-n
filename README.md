# clipboard-n

copy from [clipboardy](https://github.com/sindresorhus/clipboardy) but support `ESM` and `CJS`

## install
```
npm install clipboard-n
```

## Usage
```ts
import { clipboard } from 'clipboard-n'

clipboard.writeSync('hello ajiu9')
clipboard.write('hello world')
clipboard.readSync()
clipboard.read()
```

## API
**clipboard**

**.write(text)**

Write (copy) to the clipboard asynchronously.

Returns a Promise.

text
Type: string

The text to write to the clipboard.

**.read()**

Read (paste) from the clipboard asynchronously.

Returns a Promise.

**.writeSync(text)**

Write (copy) to the clipboard synchronously.

text
Type: string

The text to write to the clipboard.

**.readSync()**

Read (paste) from the clipboard synchronously.

## License

[MIT](./LICENSE) License © 2025-PRESENT [Ajiu9](https://github.com/ajiu9)
