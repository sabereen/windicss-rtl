// @ts-check
const plugin = require('windicss/plugin').default

module.exports = plugin(({ addDynamic, theme }) => {
  createDynamicLogical('ms', ['-webkit-margin-start', 'margin-inline-start'], theme('margin'))
  createDynamicLogical('me', ['-webkit-margin-end', 'margin-inline-end'], theme('margin'))
  createDynamicLogical('ps', ['-webkit-padding-start', 'padding-inline-start'], theme('padding'))
  createDynamicLogical('pe', ['-webkit-padding-end', 'padding-inline-end'], theme('padding'))

  /**
   * @param {string} className 
   * @param {string | string[]} prop 
   * @param {any} themeValues 
   */
  function createDynamicLogical(className, prop, themeValues) {
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
})
