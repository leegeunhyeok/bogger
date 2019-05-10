/*
 * @license
 * Bogger, logger for browser (https://github.com/leegeunhyeok/bogger)
 * 
 * MIT License
 * 
 * Copyright (c) 2019 GeunHyeok LEE
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */


const COLOR_SCHEME = {
  error: {
    color: '#ff6347',
    darker: '#cc4f38',
    text: '#fefefe'
  }
}
 
function Bogger () {
  var _historyManager = new function () {
    var _logHistory = []
    
    return {
      add (level, message) {
        _logHistory.push({ level, message })
      },
      get () {
        return _logHistory
      },
      clear () {
        _logHistory = []
      }
    }
  }

  var generateTemplate = function (level, args) {
    const argArray = Array.prototype.slice.call(args)
    const msg = argArray.join(' ')
    const text = COLOR_SCHEME[level].text
    const color = COLOR_SCHEME[level].color
    const darker = COLOR_SCHEME[level].darker

    return {
      msg: `%c ${level.toUpperCase()} %c ${msg} `,
      style: [
        `padding: 1px;color: ${text};
        background-color: ${darker};
        border-radius: 3px 0 0 3px;`,
        `padding: 1px;color: ${text};
        background-color: ${color};
        border-radius: 0 3px 3px 0;`
      ]
    }
  }

  this.info = function () {
    const log = generateTemplate('info', arguments)
    console.log(log.msg, log.style[0], log.style[1])
  }

  this.debug = function () {
    const log = generateTemplate('debug', arguments)
    console.log(log.msg, log.style[0], log.style[1])
  }

  this.warning = function () {
    const log = generateTemplate('warning', arguments)
    console.log(log.msg, log.style[0], log.style[1])
  }

  this.error = function () {
    const log = generateTemplate('error', arguments)
    console.log(log.msg, log.style[0], log.style[1])
  }

  this.critical = function () {
    const log = generateTemplate('critical', arguments)
    console.log(log.msg, log.style[0], log.style[1])
  }
}

const boggerInit = (bindSymbol = 'log') => {
  if (this.hasOwnProperty(bindSymbol)) {
    console.error(`global object already has '${bindSymbol}' property`)
  }

  Object.defineProperty(this, bindSymbol, {
    value: new Bogger()
  })
}
