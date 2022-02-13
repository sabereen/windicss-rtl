// @ts-check
const req = require

/** @type { import('windicss/plugin')['default'] } */
const plugin = req('windicss/plugin')

module.exports = plugin(({ addUtilities, addDynamic, theme }) => {
  addUtilities({
    '.dir-rtl': {
      direction: 'rtl',
    },
    '.dir-ltr': {
      direction: 'ltr',
    },
  })

  addUtilities({
    '.text-start': {
      textAlign: 'start',
    },
    '.text-end': {
      textAlign: 'end',
    },
  })

  createDynamicLogicalSpacing('ms', ['-webkit-margin-start', 'margin-inline-start'], theme('margin'))
  createDynamicLogicalSpacing('me', ['-webkit-margin-end', 'margin-inline-end'], theme('margin'))
  createDynamicLogicalSpacingWithoutNegative('ps', ['-webkit-padding-start', 'padding-inline-start'], theme('padding'))
  createDynamicLogicalSpacingWithoutNegative('pe', ['-webkit-padding-end', 'padding-inline-end'], theme('padding'))

  createDynamicLogicalSpacing('start', ['inset-inline-start'], theme('inset'))
  createDynamicLogicalSpacing('end', ['inset-inline-end'], theme('inset'))

  createDynamicRounded('rounded-s', ['border-start-start-radius', 'border-end-start-radius'])
  createDynamicRounded('rounded-e', ['border-start-end-radius', 'border-end-end-radius'])
  createDynamicRounded('rounded-te', 'border-start-end-radius')
  createDynamicRounded('rounded-be', 'border-end-end-radius')
  createDynamicRounded('rounded-ts', 'border-start-start-radius')
  createDynamicRounded('rounded-bs', 'border-end-start-radius')

  /**
   * @param {string} className 
   * @param {string | string[]} prop 
   * @param {any} themeValues 
   */
  function createDynamicLogicalSpacing(className, prop, themeValues) {
    addDynamic(className, ({ Utility }) => {
      return Utility.handler
        .handleStatic(themeValues)
        .handleSquareBrackets()
        .handleSpacing()
        .handleFraction()
        .handleSize()
        .handleNegative()
        .handleVariable()
        .createProperty(prop)
    }, {
      group: 'logical',
      completions: [
        ...Object.keys(themeValues),
        // eslint-disable-next-line no-template-curly-in-string
        '${var}',
        '{value}',
        '[value]',
      ].map(k => k[0] === '-' ? `-${className}-${k.substring(1)}` : `${className}-${k}`),
    })
  }

  /**
   * @param {string} className 
   * @param {string | string[]} prop 
   * @param {any} themeValues 
   */
  function createDynamicLogicalSpacingWithoutNegative(className, prop, themeValues) {
    addDynamic(className, ({ Utility }) => {
      return Utility.handler
        .handleStatic(themeValues)
        .handleSquareBrackets()
        .handleSpacing()
        .handleFraction()
        .handleSize()
        .handleVariable()
        .createProperty(prop)
    }, {
      group: 'logical',
      completions: [
        ...Object.keys(themeValues),
        // eslint-disable-next-line no-template-curly-in-string
        '${var}',
        '{value}',
        '[value]',
      ].map(k => k[0] === '-' ? `-${className}-${k.substring(1)}` : `${className}-${k}`),
    })
  }

  /**
   * @param {string} className 
   * @param {string | string[]} prop 
   */
  function createDynamicRounded(className, prop) {
    const themeValues = theme('borderRadius')
    const defaultRoundeds = ['rounded-s', 'rounded-e', 'rounded-ts', 'rounded-te', 'rounded-bs', 'rounded-be']

    addDynamic(className, ({ Utility }) => {
      const raw = defaultRoundeds.includes(Utility.raw) ? Utility.raw + '-DEFAULT' : Utility.raw

      return Utility.clone(raw).handler
        .handleStatic(themeValues)
        .handleSquareBrackets()
        .handleFraction()
        .handleNxl(n => (n * 0.5) + 'rem')
        .handleSize()
        .handleVariable()
        .createProperty(prop)
    }, {
      group: 'logical',
      completions: [
        ...Object.keys(themeValues),
        // eslint-disable-next-line no-template-curly-in-string
        '${var}',
        '{value}',
        '[value]',
        'Nxl',
      ].map(k =>
        k === 'DEFAULT' ? `${className}` :
        k[0] === '-' ? `-${className}-${k.substring(1)}` :
        `${className}-${k}`
      ),
    })
  }
})
