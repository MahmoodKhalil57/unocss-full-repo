import type { Variant } from '@unocss/core'

export const variantLayer: Variant = {
  match(matcher) {
    const match = matcher.match(/layer-([\d\w]+)[:-]/)
    if (match) {
      return {
        matcher: matcher.slice(match[0].length),
        layer: match[1],
      }
    }
  },
}

export const variantImportant: Variant = {
  match(matcher) {
    if (matcher.startsWith('!')) {
      return {
        matcher: matcher.slice(1),
        body: (body) => {
          body.forEach((v) => {
            if (v[1])
              v[1] += ' !important'
          })
          return body
        },
      }
    }
  },

}

export const variantNegative: Variant = {
  match(matcher) {
    if (matcher.startsWith('-')) {
      return {
        matcher: matcher.slice(1),
        body: (body) => {
          body.forEach((v) => {
            if (v[0].startsWith('--un-scale') || v[1]?.toString() === '0')
              return
            v[1] = v[1]?.toString().replace(/[0-9.]+(?:[a-z]+|%)?/, i => `-${i}`)
          })
          return body
        },
      }
    }
  },

}
