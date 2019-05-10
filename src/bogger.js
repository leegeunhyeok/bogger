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

(function () {
  const COLOR_SCHEME = {
    debug: {
      color: '#cccccc',
      darker: '#a3a3a3',
      text: '#111111'
    },
    info: {
      color: '#63ace5',
      darker: '#4F89B7',
      text: '#ffffff'
    },
    success: {
      color: '#0ad48b',
      darker: '#08A96F',
      text: '#ffffff'
    },
    warning: {
      color: '#e9d700',
      darker: '#baac00',
      text: '#ffffff'
    },
    error: {
      color: '#ff6347',
      darker: '#cc4f38',
      text: '#ffffff'
    },
    critical: {
      color: '#b266b2',
      darker: '#8E518E',
      text: '#ffffff'
    }
  }
   
  function Bogger () {
    var generateTemplate = function (level, args) {
      const argArray = Array.prototype.slice.call(args)
      const msg = argArray.join(' ')
      const text = COLOR_SCHEME[level].text
      const color = COLOR_SCHEME[level].color
      const darker = COLOR_SCHEME[level].darker
  
      return {
        msg: `%c ${level.toUpperCase()} %c ${msg} `,
        style: [
          `padding: 1px;color: ${text};` +
          `background-color: ${darker};` +
          `border-radius: 3px 0 0 3px;`,
          `padding: 1px;color: ${text};` +
          `background-color: ${color};` +
          `border-radius: 0 3px 3px 0;`
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
  
    this.success = function () {
      const log = generateTemplate('success', arguments)
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
  
  const BIND = 'log'
  if (this.hasOwnProperty(BIND)) {
    console.error(`global object already has '${BIND}' property`)
  }

  Object.defineProperty(this, BIND, {
    value: new Bogger()
  })
})()
