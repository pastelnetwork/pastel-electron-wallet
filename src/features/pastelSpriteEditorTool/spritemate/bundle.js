;(() => {
  'use strict'
  var t = {
    n: i => {
      var e = i && i.__esModule ? () => i.default : () => i
      return t.d(e, { a: e }), e
    },
    d: (i, e) => {
      for (var s in e)
        t.o(e, s) &&
          !t.o(i, s) &&
          Object.defineProperty(i, s, { enumerable: !0, get: e[s] })
    },
    o: (t, i) => Object.prototype.hasOwnProperty.call(t, i),
  }
  const i = jQuery
  var e = t.n(i)
  const s = {
    add_class: function (t, i) {
      var e
      this.is_canvas(t)
        ? t.classList.add(i)
        : null === (e = document.querySelector(t)) ||
          void 0 === e ||
          e.classList.add(i)
    },
    append: function (t, i) {
      document.querySelector(t).innerHTML = i
    },
    append_element: function (t, i) {
      var e
      null === (e = document.querySelector(t)) ||
        void 0 === e ||
        e.appendChild(i)
    },
    attr: function (t, i, e) {
      var s
      null === (s = document.querySelector(t)) ||
        void 0 === s ||
        s.setAttribute(i, e)
    },
    css: function (t, i, e) {
      document.querySelector(t).style[i] = e
    },
    disabled(t, i) {
      document.querySelectorAll(t).forEach(t => {
        t.disabled = i
      })
    },
    empty(t) {
      document.querySelector(t).innerHTML = ''
    },
    fade_in(t, i = 0, e = 1e3) {
      const s = document.querySelector(t)
      setTimeout(function () {
        ;(s.style.opacity = 0),
          (s.style.transition = 'opacity ' + e / 1e3 + 's'),
          (s.style.opacity = 1)
      }, i)
    },
    fade_out(t, i = 0, e = 1e3) {
      const s = document.querySelector(t)
      setTimeout(function () {
        ;(s.style.opacity = 1),
          (s.style.transition = 'opacity ' + e / 1e3 + 's'),
          (s.style.opacity = 0)
      }, i)
    },
    fade(t, i, e, s = 200) {
      document.querySelectorAll(t).forEach(t => {
        t.style.opacity != e &&
          setTimeout(function () {
            ;(t.style.opacity = i),
              (t.style.transition = 'opacity ' + s / 1e3 + 's'),
              (t.style.opacity = e)
          })
      })
    },
    get_css: function (t, i) {
      return document.querySelector(t).style[i]
    },
    hide(t) {
      document.querySelector(t).style.display = 'none'
    },
    html(t, i) {
      document.querySelector(t).innerHTML = i
    },
    is_canvas: t => t instanceof HTMLCanvasElement,
    remove_all_class: function (t, i) {
      document.querySelectorAll(t).forEach(t => {
        t.classList.remove(i)
      })
    },
    remove_all_elements: function (t) {
      document.querySelectorAll(t).forEach(t => {
        t.remove()
      })
    },
    remove_class: function (t, i) {
      var e
      null === (e = document.querySelector(t)) ||
        void 0 === e ||
        e.classList.remove(i)
    },
    show(t) {
      document.querySelector(t).style.display = 'block'
    },
    sel: t => document.querySelector(t),
    val: (t, i) => (
      i && (document.querySelector(t).value = i),
      document.querySelector(t).value
    ),
  }
  function o(t, i = 'normal') {
    let e = 2e3
    'tip' == i && (e = 1e4),
      s.html('#statustext', t),
      s.fade_out('#statustext', e, 2e3)
  }
  function l() {
    document.fullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement
      ? document.exitFullscreen
        ? document.exitFullscreen()
        : document.msExitFullscreen
        ? document.msExitFullscreen()
        : document.mozCancelFullScreen
        ? document.mozCancelFullScreen()
        : document.webkitExitFullscreen && document.webkitExitFullscreen()
      : document.documentElement.requestFullscreen
      ? document.documentElement.requestFullscreen()
      : document.documentElement.msRequestFullscreen
      ? document.documentElement.msRequestFullscreen()
      : document.documentElement.mozRequestFullScreen
      ? document.documentElement.mozRequestFullScreen()
      : document.documentElement.webkitRequestFullscreen &&
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT,
        )
  }
  class n {
    get_width() {
      return this.width
    }
    get_height() {
      return this.height
    }
    is_min_zoom() {
      return this.zoom < this.zoom_min
    }
    is_max_zoom() {
      return this.zoom > this.zoom_max
    }
    get_zoom() {
      return this.zoom
    }
    zoom_in() {
      this.zoom <= this.zoom_max && ((this.zoom += 2), this.update_zoom())
    }
    zoom_out() {
      this.zoom >= this.zoom_min && ((this.zoom -= 2), this.update_zoom())
    }
    update_zoom() {
      ;(this.width = this.pixels_x * this.zoom),
        (this.height = this.pixels_y * this.zoom)
    }
  }
  class r extends n {
    constructor(t, i) {
      super(),
        (this.window = t),
        (this.config = i),
        (this.sorted_array = []),
        (this.config = i),
        (this.window = t),
        (this.zoom = this.config.window_list.zoom),
        (this.zoom_min = 4),
        (this.zoom_max = 16),
        (this.pixels_x = this.config.sprite_x),
        (this.pixels_y = this.config.sprite_y),
        (this.width = this.pixels_x * this.zoom),
        (this.height = this.pixels_y * this.zoom),
        (this.clicked_sprite = 0),
        (this.sorted_array = []),
        (this.grid = !0),
        s.append(
          '#window-' + this.window,
          '\n      <div class="window_menu">\n      <div class="icons-zoom-area">\n          <img src="img/ui/icon-zoom-plus.png" class="icon-hover" id="icon-list-zoom-in" title="zoom in">\n          <img src="img/ui/icon-zoom-minus.png" class="icon-hover" id="icon-list-zoom-out" title="zoom out">\n          <img src="img/ui/icon-grid.png" class="icon-hover" id="icon-list-grid" title="toggle sprite borders">\n      </div>\n        <img src="img/ui/icon-list-new.png" class="icon-hover" id="icon-list-new" title="new sprite (shift + n)">\n        <img src="img/ui/icon-list-copy.png" class="icon-hover" id="icon-list-copy" title="copy sprite (shift + c)">\n        <img src="img/ui/icon-list-paste.png" class="icon-hover" id="icon-list-paste" title="paste sprite (shift + v)">\n        <img src="img/ui/icon-list-duplicate.png" class="icon-hover" id="icon-list-duplicate" title="duplicate sprite (shift + d)">\n        <img src="img/ui/icon-list-trash.png" class="icon-right icon-hover" id="icon-list-delete" title="delete sprite (shift + x)">\n      </div>\n      <div id="spritelist"></div>\n    ',
        ),
        e()('#spritelist').sortable({
          cursor: 'move',
          tolerance: 'pointer',
          revert: '100',
        }),
        document.head.insertAdjacentHTML(
          'beforeend',
          `<style id="zoom-sort-fix" type='text/css'>.list-sprite-size{ width: ${this.width}px; height:${this.height}px;} </style>`,
        )
    }
    get_clicked_sprite() {
      return this.clicked_sprite
    }
    toggle_grid() {
      this.grid = !this.grid
    }
    update_zoom() {
      ;(this.width = this.pixels_x * this.zoom),
        (this.height = this.pixels_y * this.zoom)
      const t = document.getElementById('zoom-sort-fix')
      t.parentNode.removeChild(t),
        document.head.insertAdjacentHTML(
          'beforeend',
          `<style id="zoom-sort-fix" type='text/css'>.list-sprite-size{ width: ${this.width}px; height:${this.height}px;} </style>`,
        )
    }
    update(t) {
      e()('#window-' + this.window).dialog(
        'option',
        'title',
        `sprite ${t.current_sprite + 1} of ${t.sprites.length}`,
      )
      const i = document
          .getElementById(t.current_sprite)
          .getContext('2d', { alpha: !1 }),
        s = t.sprites[t.current_sprite]
      this.draw_sprite(i, s, t)
    }
    update_all(t) {
      s.remove_all_elements('.sprite_in_list')
      const i = t.sprites.length
      for (let e = 0; e < i; e++) {
        const i = document.createElement('canvas')
        ;(i.id = e),
          (i.width = this.width),
          (i.height = this.height),
          s.append_element('#spritelist', i),
          s.add_class(i, 'sprite_in_list'),
          i.setAttribute('title', t.sprites[e].name),
          s.add_class(i, 'list-sprite-size'),
          this.grid && s.add_class(i, 'sprite_in_list_border'),
          i.addEventListener('click', () => (this.clicked_sprite = e))
        const o = i.getContext('2d', { alpha: !1 }),
          l = t.sprites[e]
        this.draw_sprite(o, l, t)
      }
    }
    draw_sprite(t, i, e) {
      let s = 1
      i.multicolor && (s = 2),
        (t.fillStyle = this.config.colors[e.colors[0]]),
        t.fillRect(0, 0, this.width, this.height)
      for (let o = 0; o < this.pixels_x; o += s)
        for (let l = 0; l < this.pixels_y; l++) {
          const n = i.pixels[l][o]
          if (0 != n) {
            let r = i.color
            1 != n && i.multicolor && (r = e.colors[n]),
              (t.fillStyle = this.config.colors[r]),
              t.fillRect(o * this.zoom, l * this.zoom, s * this.zoom, this.zoom)
          }
        }
    }
  }
  class a {
    constructor(t, i, o) {
      ;(this.window = t),
        (this.config = i),
        (this.eventhandler = o),
        (this.config = i),
        (this.window = t),
        (this.eventhandler = o)
      const l = `\n    <div id="info">\n        <img autofocus src="img/logo-menu.svg" width="300px" id="logo" alt="spritemate">\n        <p>The Commodore 64 sprite editor, v${this.config.version.toFixed(
        2,
      )}</p>\n\n        <fieldset>\n            <h1>Release notes</h1>\n\n            <h1>V1.3</h1>\n            <h2>This is mostly a housekeeping update without new functionality. While you might be sad to not get new stuff, it is a sign of life and that I'm dedicating time to this project again. Hopefully I can add new features soon.</h2>\n            <br/>\n            <p>\n            - Converted all JavaScript to TypeScript<br/>\n            - Rewrite of menubar, should fix annoying bug and is more responsive<br/>\n            - Fixed a UI issue in the save dialog<br/>\n            - Fixed a bug in the sprite invert code<br/>\n            - Added Spritemate version number to SPM save data<br/>\n            - Updated to latest jQuery<br/>\n            - Updated webpack<br/>\n            - Lots of cleanup & modernization<br/>\n            - Added <a href="https://beta.spritemate.com">beta.spritemate.com</a> for latest version<br/>\n            - Changed deploy setup to work with Netlify<br/>\n            - jQuery excluded from bundle.js<br/>\n            - Release notes will only show the latest release, not all releases<br/>\n            - Removed Help window, documentation will again be handled on the github repo page\n            </p>\n            <p>\n            Initially I wanted to remove jQuery and jQuery UI from this project and replace it with Vanilla JS. Build time had grown to 10 seconds, which I found quite annoying. Replicating jQuery's modal functionality was more challenging than anticipated, therefore I decided to exclude jQuery from the JS bundle again and load it from the CDN. This greatly reduced compile time to under 4 seconds. Overall the app remains extremely small, with the main App code around 20kb and jQuery around 98kb.\n            </p>\n        </fieldset>\n\n        <button id="button-info">Let's go!</button>\n    </div>\n    `
      s.append('#window-' + this.window, l),
        e()('#window-' + this.window).dialog({ show: 'fade', hide: 'fade' }),
        (s.sel('#button-info').onclick = () => {
          e()('#window-' + this.window).dialog('close'),
            this.eventhandler.onLoad()
        })
    }
  }
  class c {
    constructor(t, i) {
      ;(this.window = t),
        (this.config = i),
        (this.config = i),
        (this.window = t),
        s.append(
          '#window-' + this.window,
          '\n    <div id="menu">\n      <div class ="iconset icon-hover" id="icon-load">\n            <img src="img/ui/icon-load.png" class="icon" title="load">\n            <div class="icontext">load</div>\n        </div>\n        <div class ="iconset icon-hover" id="icon-save">\n            <img src="img/ui/icon-save.png" class="icon" title="save">\n            <div class="icontext">save</div>\n        </div>\n        <div class ="iconset icon-hover" id="icon-undo">\n            <img src="img/ui/icon-undo.png" class="icon" title="undo">\n            <div class="icontext">undo</div>\n        </div>\n        <div class ="iconset icon-hover" id="icon-redo">\n            <img src="img/ui/icon-redo.png" class="icon" title="redo">\n            <div class="icontext">redo</div>\n        </div>\n        <div class ="iconset icon-hover" id="icon-move">\n            <img src="img/ui/icon-move.png" class="icon" id="image-icon-move" title="move tool (m)">\n            <div class="icontext">move</div>\n        </div>\n        <div class ="iconset icon-hover" id="icon-draw">\n            <img src="img/ui/icon-draw-hi.png" class="icon" id="image-icon-draw" title="draw tool (d)">\n            <div class="icontext">draw</div>\n        </div>\n        <div class ="iconset icon-hover" id="icon-erase">\n            <img src="img/ui/icon-erase.png" class="icon" id="image-icon-erase" title="erase tool (e)">\n            <div class="icontext">erase</div>\n        </div>\n        <div class ="iconset icon-hover" id="icon-fill">\n            <img src="img/ui/icon-fill.png" class="icon"  id="image-icon-fill" title="fill tool (f)">  \n            <div class="icontext">fill</div>\n        </div>\n      </div>\n    ',
        )
    }
  }
  class h {
    constructor(t, i) {
      ;(this.config = t),
        (this.eventhandler = i),
        (this.config = t),
        (this.eventhandler = i),
        this.setup_load_input()
    }
    setup_load_input() {
      const t = document.createElement('div')
      t.innerHTML = '<input type="file" id="input-load" style="display: none">'
      const i = t.firstChild
      document.body.appendChild(i)
      const e = this
      i.addEventListener('change', function () {
        e.read_file_data(i)
      })
    }
    read_file_data(t) {
      const i = t.files[0]
      if (i.name.match(/\.(spm|spd|spr)$/)) {
        const t = new FileReader()
        ;(t.onload = () => {
          var e
          i.name.match(/\.(spm)$/) && this.parse_file_spm(t.result),
            i.name.match(/\.(spd|spr)$/) && this.parse_file_spd(t.result),
            this.eventhandler.onLoad(),
            null === (e = document.querySelector('#input-load')) ||
              void 0 === e ||
              e.remove(),
            this.setup_load_input()
        }),
          i.name.match(/\.(spm)$/) && t.readAsText(i),
          i.name.match(/\.(spd|spr)$/) && t.readAsBinaryString(i),
          s.html('#menubar-filename-name', i.name)
      } else alert('File not supported, .spm or .spd files only')
    }
    get_imported_file() {
      return this.imported_file
    }
    parse_file_spm(t) {
      ;(t = (t = (t = (t = (t = (t = (t = (t = t.replace(
        /"t":/g,
        '"0":',
      )).replace(/"i":/g, '"1":')).replace(/"m1":/g, '"2":')).replace(
        /"m2":/g,
        '"3":',
      )).replace(/"t"/g, '0')).replace(/"i"/g, '1')).replace(
        /"m1"/g,
        '2',
      )).replace(/"m2"/g, '3')),
        (this.imported_file = JSON.parse(t)),
        (this.imported_file = this.convert_legacy_formats(this.imported_file))
    }
    parse_file_spd(t) {
      ;(this.file = t),
        (this.start_of_sprite_data = 0),
        (this.old_format = !0),
        'S' == this.file[0] &&
          'P' == this.file[1] &&
          'D' == this.file[2] &&
          ((this.start_of_sprite_data = 6), (this.old_format = !1)),
        (this.sprite_size = 64),
        this.create_sprite_data_object()
      for (let t = 0; t < this.number_of_sprites; t++)
        this.convert_sprite_data_to_internal_format(t)
    }
    create_sprite_data_object() {
      ;(this.color_trans = this.file.charCodeAt(this.start_of_sprite_data + 0)),
        (this.color_multi1 = this.file.charCodeAt(
          this.start_of_sprite_data + 1,
        )),
        (this.color_multi2 = this.file.charCodeAt(
          this.start_of_sprite_data + 2,
        )),
        this.old_format
          ? (this.number_of_sprites = (this.file.length - 3) / 64)
          : (this.number_of_sprites =
              parseInt(this.file.charCodeAt(4), 10) + 1),
        1 == this.number_of_sprites
          ? o(this.number_of_sprites + ' sprite imported successfully.')
          : o(this.number_of_sprites + ' sprites imported successfully.'),
        (this.imported_file = {}),
        (this.imported_file.colors = {
          0: this.color_trans,
          2: this.color_multi1,
          3: this.color_multi2,
        }),
        (this.imported_file.sprites = []),
        (this.imported_file.current_sprite = 0),
        (this.imported_file.pen = 1)
    }
    convert_sprite_data_to_internal_format(t) {
      const i = this.start_of_sprite_data + 2 + (t + 1) * this.sprite_size,
        e = ('00000000' + this.file.charCodeAt(i).toString(2)).slice(-8)
      ;(this.multicolor = !1),
        1 == parseInt(e[0]) && (this.multicolor = !0),
        (this.overlay = !1),
        1 == parseInt(e[3]) && (this.overlay = !0),
        (this.pencolor = parseInt(
          this.file.charCodeAt(i).toString(2).slice(-4),
          2,
        ))
      const s = {
          name: 'sprite_' + t,
          color: this.pencolor,
          multicolor: this.multicolor,
          double_x: !1,
          double_y: !1,
          overlay: this.overlay,
          pixels: [],
        },
        o = [],
        l = this.start_of_sprite_data + 3 + t * this.sprite_size,
        n = (t + 1) * this.sprite_size + this.start_of_sprite_data + 3
      for (let t = l; t < n; t++) {
        const i = ('0000000' + this.file.charCodeAt(t).toString(2))
          .slice(-8)
          .match(/.{1,2}/g)
        for (let t = 0; t < i.length; t++) {
          let e = 0
          this.multicolor &&
            ('00' == i[t] && (e = 0),
            '10' == i[t] && (e = 1),
            '01' == i[t] && (e = 2),
            '11' == i[t] && (e = 3),
            o.push(e),
            o.push(e)),
            this.multicolor ||
              ((e = 1),
              '0' == i[t][0] && (e = 0),
              o.push(e),
              (e = 1),
              '0' == i[t][1] && (e = 0),
              o.push(e))
        }
      }
      let r = [],
        a = 0
      for (let t = 0; t < o.length; t++)
        r.push(o[t]), a++, 24 == a && (s.pixels.push(r), (a = 0), (r = []))
      this.imported_file.sprites.push(s)
    }
    convert_legacy_formats(t) {
      if (!t.sprites[0].name) {
        const i = t.sprites.length
        for (let e = 0; e < i; e++) t.sprites[e].name = 'sprite_' + e
      }
      return (
        t.version || (t.version = this.config.version),
        (t.version = this.config.version),
        t
      )
    }
  }
  class d {
    constructor(t, i, o) {
      ;(this.window = t),
        (this.config = i),
        (this.eventhandler = o),
        (this.config = i),
        (this.window = t),
        (this.default_filename = 'mysprites'),
        (this.eventhandler = o)
      const l = `\n    <div id="window-save">\n\n      <div class="center">\n        Filename: <input autofocus type="text" id="filename" name="filename" value="${this.default_filename}">\n        <p>The file will be saved to your browser's default download location.</p>\n      </div>\n      <br/>\n      <fieldset>\n        <legend>Spritemate // *.spm</legend>\n        <button id="button-save-spm">Save as Spritemate</button>\n        <p>JSON file format for spritemate. Recommended as long as you are not done working on the sprites.</p>\n      </fieldset>\n    \n      <fieldset>\n        <legend>Spritepad // *.spd</legend>\n        <div class="fieldset right">\n          <button id="button-save-spd">Save as 2.0</button>\n          <button id="button-save-spd-old">Save as 1.8.1</button>\n        </div>\n        <p>Choose between the 2.0 beta or the older 1.8.1 file format, which is recommended if you want to import the data in your C64 project.</p>\n      </fieldset>\n\n      <fieldset>\n        <legend>Assembly code // *.txt</legend>\n        <div class="fieldset right">\n          <button id="button-save-source-kick">KICK ASS (hex)</button>\n          <button id="button-save-source-kick-binary">KICK ASS (binary)</button>\n          <button id="button-save-source-acme">ACME (hex)</button>\n          <button id="button-save-source-acme-binary">ACME (binary)</button>\n        </div>\n        <p>A text file containing the sprite data in assembly language. KICK ASS and ACME are compilers with slightly different syntax. Choose "hex" to save a byte like $01 or "binary" for %00000001.</p>\n      </fieldset>\n\n      <fieldset>\n        <legend>BASIC // *.bas</legend>\n        <button id="button-save-basic">Save as BASIC 2.0</button>\n        <p>A BASIC 2.0 text file that you can copy & paste into VICE.</p>\n      </fieldset>\n\n      <fieldset>\n        <legend>PNG image</legend>\n        <p>To save a sprite as a PNG image, "right click" on the sprite in the PREVIEW window. Your browser will display a "save image as..." option in the context menu. The size of the PNG can be set with the zoom levels of the PREVIEW window.</p>\n      </fieldset>\n\n      <div id="button-row">\n        <button id="button-save-cancel" class="button-cancel">Cancel</button>\n      </div>\n    </div> \n    `
      s.append('#window-' + this.window, l),
        e()('#window-' + this.window).dialog({ show: 'fade', hide: 'fade' }),
        (s.sel('#button-save-cancel').onclick = () => this.close_window()),
        (s.sel('#button-save-spm').onclick = () => this.save_spm()),
        (s.sel('#button-save-spd').onclick = () => this.save_spd('new')),
        (s.sel('#button-save-spd-old').onclick = () => this.save_spd('old')),
        (s.sel('#button-save-source-kick').onclick = () =>
          this.save_assembly('kick', !1)),
        (s.sel('#button-save-source-kick-binary').onclick = () =>
          this.save_assembly('kick', !0)),
        (s.sel('#button-save-source-acme').onclick = () =>
          this.save_assembly('acme', !1)),
        (s.sel('#button-save-source-acme-binary').onclick = () =>
          this.save_assembly('acme', !0)),
        (s.sel('#button-save-basic').onclick = () => this.save_basic()),
        (s.sel('#filename').onkeyup = () => {
          ;(this.default_filename = s.val('#filename')),
            this.default_filename.length < 1
              ? (s.add_class('#filename', 'error'),
                s.disabled('#button-save-spm', !0),
                s.add_class('#button-save-spm', 'error'),
                s.disabled('#button-save-spd', !0),
                s.add_class('#button-save-spd', 'error'),
                s.disabled('#button-save-spd-old', !0),
                s.add_class('#button-save-spd-old', 'error'),
                s.disabled('#button-save-source-kick', !0),
                s.add_class('#button-save-source-kick', 'error'),
                s.disabled('#button-save-source-kick-binary', !0),
                s.add_class('#button-save-source-kick-binary', 'error'),
                s.disabled('#button-save-source-acme', !0),
                s.add_class('#button-save-source-acme', 'error'),
                s.disabled('#button-save-source-acme-binary', !0),
                s.add_class('#button-save-source-acme-binary', 'error'),
                s.disabled('#button-save-basic', !0),
                s.add_class('#button-save-basic', 'error'))
              : (s.remove_class('#filename', 'error'),
                s.disabled('#button-save-spm', !1),
                s.remove_class('#button-save-spm', 'error'),
                s.disabled('#button-save-spd', !1),
                s.remove_class('#button-save-spd', 'error'),
                s.disabled('#button-save-spd-old', !1),
                s.remove_class('#button-save-spd-old', 'error'),
                s.disabled('#button-save-source-kick', !1),
                s.remove_class('#button-save-source-kick', 'error'),
                s.disabled('#button-save-source-kick-binary', !1),
                s.remove_class('#button-save-source-kick-binary', 'error'),
                s.disabled('#button-save-source-acme', !1),
                s.remove_class('#button-save-source-acme', 'error'),
                s.disabled('#button-save-source-acme-binary', !1),
                s.remove_class('#button-save-source-acme-binary', 'error'),
                s.disabled('#button-save-basic', !1),
                s.remove_class('#button-save-basic', 'error'))
        })
    }
    save_file_to_disk(t, i) {
      if (window.navigator.msSaveOrOpenBlob)
        window.navigator.msSaveOrOpenBlob(t, i)
      else {
        const e = document.createElement('a'),
          s = URL.createObjectURL(t)
        ;(e.href = s),
          (e.download = i),
          document.body.appendChild(e),
          e.click(),
          setTimeout(function () {
            document.body.removeChild(e), window.URL.revokeObjectURL(s)
          }, 0)
      }
      o('File has been saved.'), s.html('#menubar-filename-name', i)
    }
    save_spm() {
      const t = this.default_filename + '.spm'
      let i = JSON.stringify(this.savedata)
      i = i
        .replace(/],/g, '],\n')
        .replace(/\[\[/g, '[\n[')
        .replace(/]]/g, ']\n]')
      const e = new Blob([i], { type: 'text/plain' })
      this.save_file_to_disk(e, t), this.close_window()
    }
    save_assembly(t, i) {
      const e = this.default_filename + '.txt',
        s = this.create_assembly(t, i),
        o = new Blob([s], { type: 'text/plain' })
      this.save_file_to_disk(o, e), this.close_window()
    }
    save_spd(t) {
      const i = this.default_filename + '.spd',
        e = this.create_spd_array(t),
        s = new Uint8Array(e),
        o = new Blob([s], { type: 'application/octet-stream' })
      this.save_file_to_disk(o, i), this.close_window()
    }
    save_basic() {
      const t = this.default_filename + '.bas',
        i = this.create_basic(),
        e = new Blob([i], { type: 'text/plain' })
      this.save_file_to_disk(e, t), this.close_window()
    }
    create_spd_array(t) {
      const i = []
      'new' == t &&
        (i.push(83, 80, 68), i.push(1, this.savedata.sprites.length - 1, 0)),
        i.push(
          this.savedata.colors[0],
          this.savedata.colors[2],
          this.savedata.colors[3],
        )
      let e = '',
        s = ''
      for (let t = 0; t < this.savedata.sprites.length; t++) {
        const o = [].concat.apply([], this.savedata.sprites[t].pixels),
          l = this.savedata.sprites[t].multicolor,
          n = this.savedata.sprites[t].overlay
        let r = 1
        l && (r = 2)
        for (let t = 0; t < o.length; t += 8) {
          for (let i = 0; i < 8; i += r) {
            const n = o[t + i]
            l &&
              (0 == n && (s = '00'),
              1 == n && (s = '10'),
              2 == n && (s = '01'),
              3 == n && (s = '11')),
              l || ((s = '1'), 0 == n && (s = '0')),
              (e += s)
          }
          const n = parseInt(e, 2)
          i.push(n), (e = '')
        }
        let a = '00'
        l && (a = '10')
        let c = '00'
        n && (c = '01')
        const h = a + c,
          d = (
            '000' + (this.savedata.sprites[t].color >>> 0).toString(2)
          ).slice(-4),
          p = parseInt(h + d, 2)
        i.push(p)
      }
      return 'new' == t && i.push(0, 0, 1, 0), i
    }
    create_assembly(t, i) {
      let e = '; ',
        s = '!',
        o = ''
      'kick' == t && ((e = '// '), (s = '.'), (o = ':'))
      let l = ''
      ;(l +=
        '\n' +
        e +
        this.savedata.sprites.length +
        ' sprites generated with spritemate on ' +
        new Date().toLocaleString()),
        i ||
          (l +=
            '\n' +
            e +
            'Byte 64 of each sprite contains multicolor (high nibble) & color (low nibble) information'),
        (l +=
          '\n\nLDA #$' +
          ('0' + this.savedata.colors[2].toString(16)).slice(-2) +
          ' ' +
          e +
          'sprite multicolor 1'),
        (l += '\nSTA $D025'),
        (l +=
          '\nLDA #$' +
          ('0' + this.savedata.colors[3].toString(16)).slice(-2) +
          ' ' +
          e +
          'sprite multicolor 2'),
        (l += '\nSTA $D026'),
        (l += '\n')
      let n = '',
        r = ''
      for (let t = 0; t < this.savedata.sprites.length; t++) {
        const a = [].concat.apply([], this.savedata.sprites[t].pixels),
          c = this.savedata.sprites[t].multicolor
        let h = 1
        c && (h = 2)
        const d = i ? 24 : 64
        ;(l += '\n\n' + e + 'sprite ' + t),
          (l += c ? ' / multicolor' : ' / singlecolor'),
          (l +=
            ' / color: $' +
            ('0' + this.savedata.sprites[t].color.toString(16)).slice(-2)),
          (l += '\n' + this.savedata.sprites[t].name + o + '\n')
        for (let t = 0; t < a.length; t += 8) {
          t % d == 0 &&
            ((l = l.substring(0, l.length - 1)), (l += '\n' + s + 'byte '))
          for (let i = 0; i < 8; i += h) {
            const e = a[t + i]
            c &&
              (0 == e && (r = '00'),
              1 == e && (r = '10'),
              2 == e && (r = '01'),
              3 == e && (r = '11')),
              c || ((r = '1'), 0 == e && (r = '0')),
              (n += r)
          }
          ;(l += i
            ? '%' + n + ','
            : '$' + ('0' + parseInt(n, 2).toString(16)).slice(-2) + ','),
            (n = '')
        }
        if (i) l = l.substring(0, l.length - 1)
        else {
          let i = '0000'
          c && (i = '1000')
          const e = (
            '000' + (this.savedata.sprites[t].color >>> 0).toString(2)
          ).slice(-4)
          l += '$' + ('0' + parseInt(i + e, 2).toString(16)).slice(-2)
        }
      }
      return l
    }
    create_basic() {
      let t = 10
      const i = 10
      let e = ''
      const s = Math.min(8, this.savedata.sprites.length)
      ;(e += t + ' print chr$(147)'),
        (t += i),
        (e += '\n' + t + ' print "generated with spritemate"'),
        (t += i),
        (e +=
          '\n' +
          t +
          ' print "' +
          s +
          ' of ' +
          this.savedata.sprites.length +
          ' sprites displayed."'),
        (t += i),
        (e +=
          '\n' +
          t +
          ' poke 53285,' +
          this.savedata.colors[2] +
          ': rem multicolor 1'),
        (t += i),
        (e +=
          '\n' +
          t +
          ' poke 53286,' +
          this.savedata.colors[3] +
          ': rem multicolor 2'),
        (t += i),
        (e += '\n' + t + ' poke 53269,255 : rem set all 8 sprites visible'),
        (t += i),
        (e +=
          '\n' +
          t +
          ' for x=12800 to 12800+' +
          (64 * this.savedata.sprites.length - 1) +
          ': read y: poke x,y: next x: rem sprite generation'),
        (t += i)
      let o = 0,
        l = 0,
        n = 0
      for (let r = 0; r < s; r++) {
        ;(e += '\n' + t + ' :: rem ' + this.savedata.sprites[r].name),
          (t += i),
          (e +=
            '\n' +
            t +
            ' poke ' +
            (53287 + r) +
            ',' +
            this.savedata.sprites[r].color +
            ': rem color = ' +
            this.savedata.sprites[r].color),
          (t += i),
          (e +=
            '\n' +
            t +
            ' poke ' +
            (2040 + r) +
            ',' +
            (200 + r) +
            ': rem pointer'),
          (t += i)
        let s = 48 * r + 24 + 20,
          a = 120
        r >= 4 && ((s -= 192), (a += 52)),
          (e +=
            '\n' + t + ' poke ' + (53248 + 2 * r) + ', ' + s + ': rem x pos'),
          (t += i),
          (e +=
            '\n' + t + ' poke ' + (53249 + 2 * r) + ', ' + a + ': rem y pos'),
          (t += i),
          this.savedata.sprites[r].multicolor && (o |= 1 << r),
          this.savedata.sprites[r].double_x && (l |= 1 << r),
          this.savedata.sprites[r].double_y && (n |= 1 << r)
      }
      ;(e += '\n' + t + ' poke 53276, ' + o + ': rem multicolor'),
        (t += i),
        (e += '\n' + t + ' poke 53277, ' + l + ': rem width'),
        (t += i),
        (e += '\n' + t + ' poke 53271, ' + n + ': rem height'),
        (t += i)
      let r = '',
        a = ''
      t = 1e3
      for (let s = 0; s < this.savedata.sprites.length; s++) {
        const o = [].concat.apply([], this.savedata.sprites[s].pixels),
          l = this.savedata.sprites[s].multicolor
        let n = 1
        l && (n = 2),
          (e += '\n' + t + ' :: rem ' + this.savedata.sprites[s].name),
          (t += i),
          (e += l ? ' / multicolor' : ' / singlecolor'),
          (e += ' / color: ' + this.savedata.sprites[s].color)
        for (let s = 0; s < o.length; s += 8) {
          s % 128 == 0 && ((e += '\n' + t + ' data '), (t += i))
          for (let t = 0; t < 8; t += n) {
            const i = o[s + t]
            l &&
              (0 == i && (a = '00'),
              1 == i && (a = '10'),
              2 == i && (a = '01'),
              3 == i && (a = '11')),
              l || ((a = '1'), 0 == i && (a = '0')),
              (r += a)
          }
          ;(e += parseInt(r, 2).toString(10) + ','), (r = '')
        }
        let c = '0000'
        l && (c = '1000')
        const h = (
          '000' + (this.savedata.sprites[s].color >>> 0).toString(2)
        ).slice(-4)
        e += parseInt(c + h, 2).toString(10)
      }
      return (e += '\n'), (e = e.replace(/,\n/g, '\n')), e
    }
    set_save_data(t) {
      this.savedata = t
    }
    close_window() {
      e()('#window-' + this.window).dialog('close'), this.eventhandler.onLoad()
    }
  }
  class p {
    constructor(t, i, o) {
      ;(this.window = t),
        (this.config = i),
        (this.eventhandler = o),
        (this.config = i),
        (this.window = t),
        (this.eventhandler = o),
        s.append(
          '#window-' + this.window,
          '\n    <div id="modal">\n        <h2 autofocus>Your settings will be saved locally to your browser storage</h2>\n        <fieldset>\n            <legend>Color palette</legend>\n            \n            <select id="colorpalette">\n              <option>colodore</option>\n              <option>pepto</option>\n              <option>custom</option>\n            </select>\n\n            <br/>\n            <br/>\n\n            <div class="settings_colorfield">\n                <div class="settings_color" id="col-0"></div>\n                <input type="text" class="settings_colorvalue" id="colval-0" name="" value="">\n            </div>\n            <div class="settings_colorfield">\n                <div class="settings_color" id="col-1"></div>\n                <input type="text" class="settings_colorvalue" id="colval-1" name="" value="">\n            </div>\n            <div class="settings_colorfield">\n                <div class="settings_color" id="col-2"></div>\n                <input type="text" class="settings_colorvalue" id="colval-2" name="" value="">\n            </div>\n            <div class="settings_colorfield">\n                <div class="settings_color" id="col-3"></div>\n                <input type="text" class="settings_colorvalue" id="colval-3" name="" value="">\n            </div>\n            <div class="settings_colorfield">\n                <div class="settings_color" id="col-4"></div>\n                <input type="text" class="settings_colorvalue" id="colval-4" name="" value="">\n            </div>\n            <div class="settings_colorfield">\n                <div class="settings_color" id="col-5"></div>\n                <input type="text" class="settings_colorvalue" id="colval-5" name="" value="">\n            </div>\n            <div class="settings_colorfield">\n                <div class="settings_color" id="col-6"></div>\n                <input type="text" class="settings_colorvalue" id="colval-6" name="" value="">\n            </div>\n            <div class="settings_colorfield">\n                <div class="settings_color" id="col-7"></div>\n                <input type="text" class="settings_colorvalue" id="colval-7" name="" value="">\n            </div>\n\n            <div class="settings_colorfield">\n                <div class="settings_color" id="col-8"></div>\n                <input type="text" class="settings_colorvalue" id="colval-8" name="" value="">\n            </div>\n            <div class="settings_colorfield">\n                <div class="settings_color" id="col-9"></div>\n                <input type="text" class="settings_colorvalue" id="colval-9" name="" value="">\n            </div>\n            <div class="settings_colorfield">\n                <div class="settings_color" id="col-10"></div>\n                <input type="text" class="settings_colorvalue" id="colval-10" name="" value="">\n            </div>\n            <div class="settings_colorfield">\n                <div class="settings_color" id="col-11"></div>\n                <input type="text" class="settings_colorvalue" id="colval-11" name="" value="">\n            </div>\n            <div class="settings_colorfield">\n                <div class="settings_color" id="col-12"></div>\n                <input type="text" class="settings_colorvalue" id="colval-12" name="" value="">\n            </div>\n            <div class="settings_colorfield">\n                <div class="settings_color" id="col-13"></div>\n                <input type="text" class="settings_colorvalue" id="colval-13" name="" value="">\n            </div>\n            <div class="settings_colorfield">\n                <div class="settings_color" id="col-14"></div>\n                <input type="text" class="settings_colorvalue" id="colval-14" name="" value="">\n            </div>\n            <div class="settings_colorfield">\n                <div class="settings_color" id="col-15"></div>\n                <input type="text" class="settings_colorvalue" id="colval-15" name="" value="">\n            </div>\n\n        </fieldset>\n\n        \x3c!--\n        <fieldset>\n            <legend>Window settings</legend>\n            <div class="fieldset right">\n                <button id="button-save">Save now</button>\n                <button id="button-reset">Reset to defaults</button>\n            </div>\n            <p>Saves the window layout and zoom levels</p>\n        </fieldset>\n        --\x3e\n        <div id="button-row">\n          <button id="button-apply">Apply</button>\n        </div>\n\n    </div>\n    ',
        ),
        (this.config.colors = this.config.palettes[
          this.config.selected_palette
        ]),
        s.val('#colorpalette', this.config.selected_palette),
        this.init_inputfields(this.config.colors),
        this.selection_change(),
        this.update_colors(),
        e()('#window-' + this.window).dialog({ show: 'fade', hide: 'fade' }),
        (s.sel('#button-apply').onclick = t => this.close_window())
    }
    update_colors() {
      for (let t = 0; t < this.config.colors.length; t++)
        s.val('#colval-' + t, this.config.colors[t]),
          s.css('#col-' + t, 'backgroundColor', this.config.colors[t])
    }
    init_inputfields(t) {
      const i = this
      for (let e = 0; e < t.length; e++)
        s.sel('#colval-' + e).onchange = function () {
          i.update_custom_colors(e)
        }
      'custom' != this.config.selected_palette
        ? (s.disabled('.settings_colorvalue', !0),
          s.fade('.settings_colorvalue', 1, 0.33))
        : (s.disabled('.settings_colorvalue', !1),
          s.fade('.settings_colorvalue', 0.33, 1))
    }
    selection_change() {
      const t = this
      s.sel('#colorpalette').onchange = function () {
        const i = s.val('#colorpalette')
        ;(t.config.colors = t.config.palettes[i]),
          (t.config.selected_palette = i),
          'custom' != i
            ? (s.disabled('.settings_colorvalue', !0),
              s.fade('.settings_colorvalue', 1, 0.33))
            : (s.disabled('.settings_colorvalue', !1),
              s.fade('.settings_colorvalue', 0.33, 1)),
          t.update_colors()
      }
    }
    update_custom_colors(t) {
      let i = s.val('#colval-' + t)
      ;(i = '#' + ('000000' + i.replace(/#/g, '')).slice(-6)),
        (this.config.palettes.custom[t] = i),
        (this.config.colors = this.config.palettes.custom),
        this.update_colors()
    }
    close_window() {
      e()('#window-' + this.window).dialog('close'), this.eventhandler.onLoad()
    }
    get_config() {
      return this.config
    }
  }
  class u extends n {
    constructor(t, i) {
      super(),
        (this.window = t),
        (this.config = i),
        (this.config = i),
        (this.grid = this.config.window_editor.grid),
        (this.window = t),
        (this.canvas_element = document.createElement('canvas')),
        (this.zoom = this.config.window_editor.zoom),
        (this.zoom_min = 10),
        (this.zoom_max = 26),
        (this.pixels_x = this.config.sprite_x),
        (this.pixels_y = this.config.sprite_y),
        (this.width = this.pixels_x * this.zoom),
        (this.height = this.pixels_y * this.zoom),
        (this.canvas_element.id = 'editor'),
        (this.canvas_element.width = this.width),
        (this.canvas_element.height = this.height),
        s.append(
          '#window-' + this.window,
          '\n      <div class="window_menu">\n        <div class="icons-zoom-area">\n          <img src="img/ui/icon-zoom-plus.png" class="icon-hover" id="icon-editor-zoom-in" title="zoom in">\n          <img src="img/ui/icon-zoom-minus.png" class="icon-hover" id="icon-editor-zoom-out" title="zoom out">\n          <img src="img/ui/icon-grid.png" class="icon-hover" id="icon-editor-grid" title="toggle grid">\n        </div>\n\n        <img src="img/ui/icon-multicolor.png" title="toggle single- & multicolor (c)" class=" icon-hover" id="icon-multicolor">\n        \x3c!--\n        <img src="img/ui/icon-shift-left.png" title="shift left" class="icon-hover" id="icon-shift-left">\n        <img src="img/ui/icon-shift-right.png" title="shift right" class="icon-hover" id="icon-shift-right">\n        <img src="img/ui/icon-shift-up.png" title="shift up" class="icon-hover" id="icon-shift-up">\n        <img src="img/ui/icon-shift-down.png" title="shift down" class="icon-hover" id="icon-shift-down">\n        --\x3e\n        <img src="img/ui/icon-flip-horizontal.png" title="flip horizontal" class="icon-hover" id="icon-flip-horizontal">\n        <img src="img/ui/icon-flip-vertical.png" title="flip vertical" class="icon-hover" id="icon-flip-vertical">\n        <input type="text" class="editor_sprite_name" class="icon-hover" id="input-sprite-name" name="" value="" title="rename sprite">\n      </div>\n      <div id="editor-canvas"></div>\n      \n    ',
        ),
        s.append_element('#editor-canvas', this.canvas_element),
        (this.canvas = this.canvas_element.getContext('2d', { alpha: !1 }))
    }
    update(t) {
      ;(this.canvas_element.width = this.width),
        (this.canvas_element.height = this.height)
      const i = t.sprites[t.current_sprite]
      let e = 1
      i.multicolor && (e = 2),
        s.val('#input-sprite-name', i.name),
        (this.canvas.fillStyle = this.config.colors[t.colors[0]]),
        this.canvas.fillRect(0, 0, this.width, this.height),
        t.current_sprite > 0 &&
          t.sprites[t.current_sprite - 1].overlay &&
          this.display_overlay(t, 'previous'),
        this.fill_canvas(t, i, e, 1),
        i.overlay &&
          t.current_sprite < t.sprites.length - 1 &&
          this.display_overlay(t),
        this.grid && this.display_grid(i)
    }
    display_overlay(t, i = '', e = 0.4) {
      let s = 1
      'previous' == i && (s = -1)
      const o = t.sprites[t.current_sprite + s]
      let l = 1
      o.multicolor && (l = 2), this.fill_canvas(t, o, l, e)
    }
    fill_canvas(t, i, e, s = 1) {
      for (let o = 0; o < this.pixels_x; o += e)
        for (let l = 0; l < this.pixels_y; l++) {
          const n = i.pixels[l][o]
          if (0 != n) {
            let r = i.color
            1 != n && i.multicolor && (r = t.colors[n]),
              (this.canvas.fillStyle = this.overlay_color(
                this.config.colors[r],
                s,
              )),
              this.canvas.fillRect(
                o * this.zoom,
                l * this.zoom,
                e * this.zoom,
                this.zoom,
              )
          }
        }
    }
    overlay_color(t, i) {
      const e = parseInt(t.slice(-6), 16)
      return (
        'rgba(' +
        ((e >> 16) & 255) +
        ',' +
        ((e >> 8) & 255) +
        ',' +
        (255 & e) +
        ',' +
        i +
        ')'
      )
    }
    display_grid(t) {
      this.canvas.setLineDash([1, 1])
      let i = 1
      t.multicolor && (i = 2)
      for (let t = 0; t <= this.pixels_x; t += i)
        (this.canvas.strokeStyle = '#666666'),
          t == this.pixels_x / 2 && (this.canvas.strokeStyle = '#888888'),
          this.canvas.beginPath(),
          this.canvas.moveTo(t * this.zoom, 0),
          this.canvas.lineTo(t * this.zoom, this.height),
          this.canvas.stroke()
      for (let t = 0; t <= this.pixels_y; t++)
        (this.canvas.strokeStyle = '#666666'),
          t % (this.pixels_y / 3) == 0 && (this.canvas.strokeStyle = '#888888'),
          this.canvas.beginPath(),
          this.canvas.moveTo(0, t * this.zoom),
          this.canvas.lineTo(this.width, t * this.zoom),
          this.canvas.stroke()
    }
    get_pixel(t) {
      const i = this.canvas_element.getBoundingClientRect(),
        e = t.clientX - i.left,
        s = t.clientY - i.top
      return {
        x: Math.floor(e / (this.width / this.config.sprite_x)),
        y: Math.floor(s / (this.height / this.config.sprite_y)),
      }
    }
    toggle_grid() {
      this.grid = !this.grid
    }
    get_grid() {
      return this.grid
    }
  }
  class _ {
    constructor(t, i) {
      ;(this.window = t),
        (this.config = i),
        (this.colors = {}),
        (this.colors = i.colors),
        (this.active_color = 3),
        (this.window = t),
        s.append(
          '#window-' + this.window,
          '\n      <div id="palette_all_colors"></div>\n      <div id="palette_spritecolors">\n          <div id="palette_0">\n              <p>Transparent</p>\n              <div class="palette_color_item_active_colors" id="color_0" title="transparent&nbsp;(1)"></div>\n          </div>\n          <div id="palette_1">\n              <p>Individual</p>\n              <div class="palette_color_item_active_colors" id="color_1" title="individual&nbsp;color&nbsp;(2)"></div>\n          </div>\n          <div id="palette_2">\n              <p>Multicolor 1</p>\n              <div class="palette_color_item_active_colors" id="color_2" title="multicolor&nbsp;1&nbsp;(3)"></div>\n          </div>\n          <div id="palette_3">\n              <p>Multicolor 2</p>\n              <div class="palette_color_item_active_colors" id="color_3" title="multicolor&nbsp;2&nbsp;(4)"></div>\n          </div>\n      </div>',
        ),
        this.draw_palette()
    }
    update(t) {
      const i = t.sprites[t.current_sprite].multicolor
      s.css('#color_0', 'background-color', this.colors[t.colors[0]]),
        s.css(
          '#color_1',
          'background-color',
          this.colors[t.sprites[t.current_sprite].color],
        ),
        s.css('#color_2', 'background-color', this.colors[t.colors[2]]),
        s.css('#color_3', 'background-color', this.colors[t.colors[3]]),
        s.remove_all_class(
          '#palette_spritecolors div',
          'palette_color_item_selected',
        ),
        s.remove_all_class('#palette_spritecolors p', 'palette_highlight_text'),
        s.add_class('#color_' + t.pen, 'palette_color_item_selected'),
        s.add_class('#palette_' + t.pen + ' p', 'palette_highlight_text'),
        this.set_multicolor(i)
    }
    draw_palette() {
      s.empty('#palette_all_colors')
      let t = 0,
        i = ''
      for (let e = 0; e < this.colors.length; e++) {
        let s =
          '<div class="palette_color_item" id="palette_color_' +
          this.colors[e] +
          '" title="$' +
          e.toString(16) +
          '&nbsp;/&nbsp;' +
          this.colors[e] +
          '" style="background-color:' +
          this.colors[e] +
          ';"></div>'
        t++,
          2 == t && ((t = 0), (s += '<div style="clear:both;"></div>')),
          (i += s)
      }
      s.html('#palette_all_colors', i)
    }
    set_multicolor(t) {
      t
        ? (s.show('#palette_2'), s.show('#palette_3'))
        : (s.hide('#palette_2'), s.hide('#palette_3'))
    }
    set_active_color(t) {
      const i = t.target.id.replace('palette_color_', '')
      this.active_color = this.colors.indexOf(i)
    }
    get_color() {
      return this.active_color
    }
    set_colors(t) {
      ;(this.colors = t), this.draw_palette()
    }
  }
  class m extends n {
    constructor(t, i) {
      super(),
        (this.window = t),
        (this.config = i),
        (this.canvas_element = {}),
        (this.canvas = {}),
        (this.config = i),
        (this.window = t),
        (this.canvas_element = document.createElement('canvas')),
        (this.zoom = this.config.window_preview.zoom),
        (this.zoom_min = 4),
        (this.zoom_max = 16),
        (this.pixels_x = this.config.sprite_x),
        (this.pixels_y = this.config.sprite_y),
        (this.width = this.pixels_x * this.zoom),
        (this.height = this.pixels_y * this.zoom),
        (this.canvas_element.id = 'preview'),
        (this.canvas_element.width = this.width),
        (this.canvas_element.height = this.height),
        (this.canvas = this.canvas_element.getContext('2d')),
        s.append(
          '#window-' + this.window,
          '\n      <div class="window_menu">\n        <div class="icons-zoom-area">\n          <img src="img/ui/icon-zoom-plus.png" class="icon-hover" id="icon-preview-zoom-in" title="zoom in">\n          <img src="img/ui/icon-zoom-minus.png" class="icon-hover" id="icon-preview-zoom-out" title="zoom out">\n        </div>\n        <img src="img/ui/icon-preview-x2.png" class="icon-hover" id="icon-preview-x" title="double width">\n        <img src="img/ui/icon-preview-y2.png" class="icon-hover" id="icon-preview-y" title="double height">\n        <img src="img/ui/icon-preview-overlay.png" class="icon-hover" id="icon-preview-overlay" title="overlay next sprite">\n      </div>\n      <div id="preview-canvas"></div>\n    ',
        ),
        s.append_element('#preview-canvas', this.canvas_element)
    }
    update(t) {
      ;(this.canvas_element.width = this.width),
        (this.canvas_element.height = this.height)
      const i = t.sprites[t.current_sprite]
      let e,
        o,
        l = 1
      i.multicolor && (l = 2),
        (this.canvas.fillStyle = this.config.colors[t.colors[0]]),
        this.canvas.fillRect(0, 0, this.width, this.height)
      for (let e = 0; e < this.pixels_x; e += l)
        for (let s = 0; s < this.pixels_y; s++) {
          const o = i.pixels[s][e]
          if (0 != o) {
            let n = i.color
            1 != o && i.multicolor && (n = t.colors[o]),
              (this.canvas.fillStyle = this.config.colors[n]),
              this.canvas.fillRect(
                e * this.zoom,
                s * this.zoom,
                l * this.zoom,
                this.zoom,
              )
          }
        }
      i.overlay &&
        t.current_sprite < t.sprites.length - 1 &&
        this.display_overlay(t),
        i.double_x
          ? ((e = 2), s.add_class('#icon-preview-x', 'icon-preview-x2-hi'))
          : ((e = 1), s.remove_class('#icon-preview-x', 'icon-preview-x2-hi')),
        i.double_y
          ? ((o = 2), s.add_class('#icon-preview-y', 'icon-preview-y2-hi'))
          : ((o = 1), s.remove_class('#icon-preview-y', 'icon-preview-y2-hi')),
        s.css('#preview', 'width', this.width * e + 'px'),
        s.css('#preview', 'height', this.height * o + 'px')
    }
    display_overlay(t) {
      const i = t.sprites[t.current_sprite + 1]
      let e = 1
      i.multicolor && (e = 2)
      for (let s = 0; s < this.pixels_x; s += e)
        for (let o = 0; o < this.pixels_y; o++) {
          let l = i.pixels[o][s]
          i.multicolor || (2 != l && 3 != l) || (l = 1)
          let n = i.color
          1 != l && (n = t.colors[l]),
            0 != l &&
              ((this.canvas.fillStyle = this.config.colors[n]),
              this.canvas.fillRect(
                s * this.zoom,
                o * this.zoom,
                this.zoom * e,
                this.zoom,
              ))
        }
    }
  }
  class g {
    constructor(t) {
      ;(this.config = t),
        (this.all = {}),
        (this.backup = []),
        (this.copy_sprite = {}),
        (this.config = t),
        (this.width = t.sprite_x),
        (this.height = t.sprite_y),
        (this.all = {}),
        (this.all.version = this.config.version),
        (this.all.colors = { 0: 11, 2: 8, 3: 6 }),
        (this.all.sprites = []),
        (this.all.current_sprite = 0),
        (this.all.pen = 1),
        (this.backup = []),
        (this.backup_position = -1),
        (this.copy_sprite = {}),
        (this.sprite_name_counter = 0)
    }
    new_sprite(t = 1, i = !1) {
      const e = {
        name: 'sprite_' + this.sprite_name_counter,
        color: t,
        multicolor: i,
        double_x: !1,
        double_y: !1,
        overlay: !1,
        pixels: [],
      }
      for (let t = 0; t < this.height; t++) {
        const t = []
        for (let i = 0; i < this.width; i++) t.push(0)
        e.pixels.push(t)
      }
      this.all.sprites.push(e),
        (this.all.current_sprite = this.all.sprites.length - 1),
        this.sprite_name_counter++,
        !i && this.is_pen_multicolor() && this.set_pen(1),
        this.save_backup()
    }
    clear() {
      const t = []
      for (let i = 0; i < this.height; i++) {
        const i = []
        for (let t = 0; t < this.width; t++) i.push(0)
        t.push(i)
      }
      ;(this.all.sprites[this.all.current_sprite].pixels = t),
        this.save_backup()
    }
    fill() {
      const t = []
      for (let i = 0; i < this.height; i++) {
        const i = []
        for (let t = 0; t < this.width; t++) i.push(this.all.pen)
        t.push(i)
      }
      ;(this.all.sprites[this.all.current_sprite].pixels = t),
        this.save_backup()
    }
    flip_vertical() {
      this.all.sprites[this.all.current_sprite].pixels.reverse(),
        this.save_backup()
    }
    flip_horizontal() {
      const t = this.all.sprites[this.all.current_sprite]
      for (let i = 0; i < this.height; i++) t.pixels[i].reverse()
      if (t.multicolor)
        for (let i = 0; i < this.height; i++)
          t.pixels[i].push(t.pixels[i].shift())
      ;(this.all.sprites[this.all.current_sprite] = t), this.save_backup()
    }
    shift_vertical(t) {
      const i = this.all.sprites[this.all.current_sprite]
      'down' == t
        ? i.pixels.unshift(i.pixels.pop())
        : i.pixels.push(i.pixels.shift()),
        (this.all.sprites[this.all.current_sprite] = i),
        this.save_backup()
    }
    shift_horizontal(t) {
      const i = this.all.sprites[this.all.current_sprite]
      for (let e = 0; e < this.height; e++)
        'right' == t
          ? i.multicolor
            ? (i.pixels[e].unshift(i.pixels[e].pop()),
              i.pixels[e].unshift(i.pixels[e].pop()))
            : i.pixels[e].unshift(i.pixels[e].pop())
          : i.multicolor
          ? (i.pixels[e].push(i.pixels[e].shift()),
            i.pixels[e].push(i.pixels[e].shift()))
          : i.pixels[e].push(i.pixels[e].shift())
      ;(this.all.sprites[this.all.current_sprite] = i), this.save_backup()
    }
    get_colors() {
      return {
        0: this.all.colors[0],
        1: this.all.sprites[this.all.current_sprite].color,
        2: this.all.colors[2],
        3: this.all.colors[3],
      }
    }
    get_name() {
      return this.all.sprites[this.all.current_sprite].name
    }
    is_multicolor() {
      return this.all.sprites[this.all.current_sprite].multicolor
    }
    toggle_double_x() {
      ;(this.all.sprites[this.all.current_sprite].double_x = !this.all.sprites[
        this.all.current_sprite
      ].double_x),
        this.save_backup()
    }
    toggle_double_y() {
      ;(this.all.sprites[this.all.current_sprite].double_y = !this.all.sprites[
        this.all.current_sprite
      ].double_y),
        this.save_backup()
    }
    toggle_multicolor() {
      this.all.sprites[this.all.current_sprite].multicolor
        ? ((this.all.sprites[this.all.current_sprite].multicolor = !1),
          this.is_pen_multicolor() && this.set_pen(1))
        : (this.all.sprites[this.all.current_sprite].multicolor = !0),
        this.save_backup()
    }
    set_pixel(t, i) {
      this.all.sprites[this.all.current_sprite].multicolor &&
        t.x % 2 != 0 &&
        (t.x = t.x - 1),
        (this.all.sprites[this.all.current_sprite].pixels[t.y][t.x] = i
          ? 0
          : this.all.pen)
    }
    get_current_sprite() {
      return this.all.sprites[this.all.current_sprite]
    }
    get_current_sprite_number() {
      return this.all.current_sprite
    }
    get_number_of_sprites() {
      return this.all.sprites.length
    }
    only_one_sprite() {
      return 1 == this.all.sprites.length
    }
    get_pen() {
      return this.all.pen
    }
    is_pen_multicolor() {
      return 2 === this.all.pen || 3 === this.all.pen
    }
    set_pen(t) {
      this.all.pen = t
    }
    set_pen_color(t) {
      1 == this.all.pen
        ? (this.all.sprites[this.all.current_sprite].color = t)
        : (this.all.colors[this.all.pen] = t),
        this.save_backup()
    }
    get_all() {
      return this.all
    }
    set_all(t) {
      ;(this.all = t), this.save_backup()
    }
    sort_spritelist(t) {
      const i = t.map(function (t) {
          return parseInt(t)
        }),
        e = []
      let s = 0
      for (let t = 0; t < i.length; t++)
        e.push(this.all.sprites[i[t]]),
          i[t] == this.all.current_sprite && (s = t)
      ;(this.all.sprites = e), (this.all.current_sprite = s), this.save_backup()
    }
    set_current_sprite(t) {
      'right' == t && (t = this.all.current_sprite + 1),
        'left' == t && (t = this.all.current_sprite - 1),
        t < 0 && (t = this.all.sprites.length - 1),
        t > this.all.sprites.length - 1 && (t = 0),
        'number' == typeof t && (this.all.current_sprite = t),
        this.save_backup()
    }
    delete() {
      this.all.sprites.length > 1 &&
        (this.all.sprites.splice(this.all.current_sprite, 1),
        this.all.current_sprite == this.all.sprites.length &&
          this.all.current_sprite--,
        this.save_backup())
    }
    save_backup() {
      this.backup_position++,
        (this.backup[this.backup_position] = JSON.parse(
          JSON.stringify(this.all),
        ))
    }
    undo() {
      this.backup_position > 0 &&
        (this.backup_position--,
        (this.all = JSON.parse(
          JSON.stringify(this.backup[this.backup_position]),
        )))
    }
    redo() {
      this.backup_position < this.backup.length - 1 &&
        (this.backup_position++,
        (this.all = JSON.parse(
          JSON.stringify(this.backup[this.backup_position]),
        )))
    }
    floodfill(t) {
      let i = t.x
      const e = t.y,
        s = this.all.sprites[this.all.current_sprite].pixels
      let o = 1
      const l = this.all.sprites[this.all.current_sprite].multicolor
      l && (o = 2), l && i % 2 != 0 && (i -= 1)
      const n = s[e][i]
      !(function t(i, e, r) {
        e >= 0 &&
          e < s.length &&
          i >= 0 &&
          i < s[e].length &&
          (l && i % 2 != 0 && (i -= 1),
          s[e][i] === n &&
            s[e][i] != r &&
            ((s[e][i] = r),
            t(i - o, e, r),
            t(i + o, e, r),
            t(i, e - 1, r),
            t(i, e + 1, r)))
      })(i, e, this.all.pen),
        (this.all.sprites[this.all.current_sprite].pixels = s)
    }
    is_copy_empty() {
      return 0 === Object.keys(this.copy_sprite).length
    }
    copy() {
      this.copy_sprite = JSON.parse(
        JSON.stringify(this.all.sprites[this.all.current_sprite]),
      )
    }
    paste() {
      ;(this.all.sprites[this.all.current_sprite] = JSON.parse(
        JSON.stringify(this.copy_sprite),
      )),
        this.save_backup()
    }
    duplicate() {
      this.copy(), this.new_sprite(), this.paste()
    }
    can_undo() {
      return this.backup_position > 0
    }
    can_redo() {
      return this.backup_position < this.backup.length - 1
    }
    toggle_overlay() {
      this.all.sprites[this.all.current_sprite].overlay = !this.all.sprites[
        this.all.current_sprite
      ].overlay
    }
    is_overlay() {
      return this.all.sprites[this.all.current_sprite].overlay
    }
    is_double_x() {
      return this.all.sprites[this.all.current_sprite].double_x
    }
    is_double_y() {
      return this.all.sprites[this.all.current_sprite].double_y
    }
    set_sprite_name(t) {
      this.all.sprites[this.all.current_sprite].name = t
    }
    invert() {
      let t
      this.is_multicolor(), (t = 1)
      for (let i = 0; i < this.height; i++)
        for (let e = 0; e < this.width; e += t) {
          const t = this.all.sprites[this.all.current_sprite].pixels[i][e]
          let s
          0 == t && (s = 1),
            1 == t && (s = 0),
            2 == t && (s = 3),
            3 == t && (s = 2),
            (this.all.sprites[this.all.current_sprite].pixels[i][e] = s)
        }
      this.save_backup()
    }
  }
  class v {
    constructor(t) {
      ;(this.config = t),
        (this.storage = {}),
        (this.config = t),
        (this.is_new_version = !1),
        this.init()
    }
    init() {
      void 0 !== v &&
        (null == localStorage.getItem('spritemate_config') &&
          (console.log('creating local storage file...'),
          localStorage.setItem(
            'spritemate_config',
            JSON.stringify(this.config),
          ),
          (this.is_new_version = !0)),
        (this.storage = JSON.parse(
          localStorage.getItem('spritemate_config') || '{}',
        )),
        this.config.version > this.storage.version &&
          ((this.storage = JSON.parse(JSON.stringify(this.config))),
          this.write(this.storage),
          (this.is_new_version = !0),
          console.log('updating storage')),
        (this.config = JSON.parse(JSON.stringify(this.storage))))
    }
    write(t) {
      void 0 !== v
        ? localStorage.setItem('spritemate_config', JSON.stringify(t))
        : o("I can't write to local web storage.")
    }
    read() {
      if (void 0 !== v)
        return JSON.parse(localStorage.getItem('spritemate_config') || '{}')
      o("I can't read from web storage."), (this.storage = this.config)
    }
    is_updated_version() {
      return this.is_new_version
    }
    get_config() {
      return this.config
    }
  }
  class f {
    constructor(t, i) {
      ;(this.config = t),
        (this.callback = i),
        (t.id = 'window-' + t.window_id),
        (t.position = {
          my: 'left top',
          at: 'left+' + t.left + ' top+' + t.top,
        }),
        void 0 === t.top && (t.position = void 0),
        void 0 === t.modal && (t.modal = !1),
        void 0 === t.escape && (t.escape = !1)
      const o = `<div id="${t.id}" class="${t.type}" title="${t.title}"></div>`
      s.append('#app', o),
        e()(this.get_window_id()).dialog({
          width: t.width,
          height: t.height,
          dialogClass: 'no-close',
          modal: t.modal,
          closeOnEscape: t.escape,
          autoOpen: t.autoOpen,
          position: t.position,
          resizable: t.resizable,
          buttons: t.buttons,
        }),
        i &&
          (e()(this.get_window_id()).dialog({
            dragStop: function (e, s) {
              const o = {
                name: t.name,
                data: { top: s.position.top, left: s.position.left },
              }
              i(o)
            },
          }),
          e()(this.get_window_id()).dialog({
            resizeStop: function (e, s) {
              const o = {
                name: t.name,
                data: {
                  top: s.position.top,
                  left: s.position.left,
                  width: s.size.width,
                  height: s.size.height,
                },
              }
              i(o)
            },
          }))
    }
    get_window_id() {
      return '#' + this.config.id
    }
  }
  class w {
    constructor(t) {
      ;(this.config = t),
        (this.storage = {}),
        (this.sprite = {}),
        (this.storage = new v(t)),
        (this.config = this.storage.get_config()),
        (this.config.colors = this.config.palettes[
          this.config.selected_palette
        ]),
        (this.sprite = new g(this.config))
      const i = {
        name: 'window_editor',
        title: 'Editor',
        type: 'sprite',
        resizable: !1,
        left: this.config.window_editor.left,
        top: this.config.window_editor.top,
        width: 'auto',
        height: 'auto',
        window_id: 0,
      }
      ;(this.window_editor = new f(i, this.store_window.bind(this))),
        (this.editor = new u(i.window_id, this.config))
      const s = {
        name: 'window_palette',
        title: 'Colors',
        type: 'colors',
        resizable: !1,
        left: this.config.window_palette.left,
        top: this.config.window_palette.top,
        width: 'auto',
        height: 'auto',
        window_id: 1,
      }
      ;(this.window_palette = new f(s, this.store_window.bind(this))),
        (this.palette = new _(s.window_id, this.config))
      const l = {
        name: 'window_preview',
        title: 'Preview',
        type: 'preview',
        resizable: !1,
        left: this.config.window_preview.left,
        top: this.config.window_preview.top,
        width: 'auto',
        height: 'auto',
        window_id: 2,
      }
      ;(this.window_preview = new f(l, this.store_window.bind(this))),
        (this.preview = new m(l.window_id, this.config))
      const n = {
        name: 'window_list',
        title: 'Sprite List',
        type: 'list',
        resizable: !0,
        left: this.config.window_list.left,
        top: this.config.window_list.top,
        width: this.config.window_list.width,
        height: this.config.window_list.height,
        window_id: 3,
      }
      ;(this.window_list = new f(n, this.store_window.bind(this))),
        (this.list = new r(n.window_id, this.config))
      const w = {
        name: 'window_about',
        title: 'Spritemate',
        type: 'info',
        escape: !0,
        modal: !0,
        resizable: !1,
        autoOpen: !1,
        width: '680',
        height: 'auto',
        window_id: 4,
      }
      ;(this.window_about = new f(w)),
        (this.about = new a(w.window_id, this.config, {
          onLoad: this.regain_keyboard_controls.bind(this),
        }))
      const b = {
        name: 'window_save',
        title: 'Save',
        type: 'file',
        escape: !0,
        modal: !0,
        resizable: !1,
        autoOpen: !1,
        width: '580',
        height: 'auto',
        window_id: 5,
      }
      ;(this.window_save = new f(b)),
        (this.save = new d(b.window_id, this.config, {
          onLoad: this.regain_keyboard_controls.bind(this),
        }))
      const y = {
        name: 'window_settings,',
        title: 'Settings',
        type: 'settings',
        modal: !0,
        escape: !0,
        resizable: !1,
        autoOpen: !1,
        width: '760',
        height: 'auto',
        window_id: 6,
      }
      ;(this.window_settings = new f(y)),
        (this.settings = new p(y.window_id, this.config, {
          onLoad: this.update_config.bind(this),
        }))
      const k = {
        name: 'window_tools',
        title: 'Tools',
        type: 'tools',
        resizable: !1,
        left: this.config.window_tools.left,
        top: this.config.window_tools.top,
        width: 'auto',
        height: 'auto',
        window_id: 8,
      }
      ;(this.window_tools = new f(k, this.store_window.bind(this))),
        (this.tools = new c(k.window_id, this.config)),
        (this.load = new h(this.config, {
          onLoad: this.update_loaded_file.bind(this),
        })),
        (this.is_drawing = !1),
        (this.oldpos = { x: 0, y: 0 }),
        this.sprite.new_sprite(this.palette.get_color()),
        (this.mode = 'draw'),
        (this.allow_keyboard_shortcuts = !0),
        (function () {
          const t = [
            'Hold shift while clicking to delete pixels.',
            'You can change and define your own colors in the seetings.',
            "Press 'z' for undo and 'shift + z' for redo.",
            'You can position all windows how you like it best. Spritemate remembers that for your next visit!',
            'Exporting in SpritePad 1.8 format is ideal for using your sprites in a C64 program.',
            'Sort your sprites by dragging them around with your mouse!',
            'Right click on your sprite in the preview window to save it as PNG (works in Chrome at least).',
          ]
          o('Tip Of The Day: ' + t[Math.floor(Math.random() * t.length)], 'tip')
        })(),
        this.list.update_all(this.sprite.get_all()),
        this.update(),
        this.user_interaction(),
        this.storage.is_updated_version() &&
          e()(this.window_about.get_window_id()).dialog('open')
    }
    update() {
      const t = this.sprite.get_all()
      this.editor.update(t),
        this.preview.update(t),
        this.list.update(t),
        this.palette.update(t),
        this.update_ui()
    }
    update_ui() {
      var t
      this.sprite.get_number_of_sprites() > 1
        ? s.fade('#icon-list-delete', 0.33, 1)
        : s.fade('#icon-list-delete', 1, 0.33),
        this.sprite.is_copy_empty()
          ? s.fade('#icon-list-paste', 1, 0.33)
          : s.fade('#icon-list-paste', 0.33, 1),
        this.sprite.can_undo()
          ? s.fade('#icon-undo', 0.33, 1)
          : s.fade('#icon-undo', 1, 0.33),
        this.sprite.can_redo()
          ? s.fade('#icon-redo', 0.33, 1)
          : s.fade('#icon-redo', 1, 0.33),
        this.sprite.is_overlay()
          ? s.attr(
              '#icon-preview-overlay',
              'src',
              'img/ui/icon-preview-overlay-hi.png',
            )
          : s.attr(
              '#icon-preview-overlay',
              'src',
              'img/ui/icon-preview-overlay.png',
            ),
        this.sprite.is_double_x()
          ? s.attr('#icon-preview-x', 'src', 'img/ui/icon-preview-x2-hi.png')
          : s.attr('#icon-preview-x', 'src', 'img/ui/icon-preview-x2.png'),
        this.sprite.is_double_y()
          ? s.attr('#icon-preview-y', 'src', 'img/ui/icon-preview-y2-hi.png')
          : s.attr('#icon-preview-y', 'src', 'img/ui/icon-preview-y2.png'),
        this.preview.is_min_zoom()
          ? s.fade('#icon-preview-zoom-out', 1, 0.33)
          : s.fade('#icon-preview-zoom-out', 0.33, 1),
        this.preview.is_max_zoom()
          ? s.fade('#icon-preview-zoom-in', 1, 0.33)
          : s.fade('#icon-preview-zoom-in', 0.33, 1),
        this.editor.is_min_zoom()
          ? s.fade('#icon-editor-zoom-out', 1, 0.33)
          : s.fade('#icon-editor-zoom-out', 0.33, 1),
        this.editor.is_max_zoom()
          ? s.fade('#icon-editor-zoom-in', 1, 0.33)
          : s.fade('#icon-editor-zoom-in', 0.33, 1),
        this.list.is_min_zoom()
          ? s.fade('#icon-list-zoom-out', 1, 0.33)
          : s.fade('#icon-list-zoom-out', 0.33, 1),
        this.list.is_max_zoom()
          ? s.fade('#icon-list-zoom-in', 1, 0.33)
          : s.fade('#icon-list-zoom-in', 0.33, 1),
        s.remove_all_class('.sprite_in_list', 'sprite_in_list_selected'),
        null ===
          (t = document.getElementById(
            this.sprite.get_current_sprite_number(),
          )) ||
          void 0 === t ||
          t.classList.add('sprite_in_list_selected')
    }
    store_window(t) {
      for (const i in t.data)
        this.config[t.name].hasOwnProperty(i) &&
          (this.config[t.name][i] = t.data[i])
      this.storage.write(this.config)
    }
    update_config() {
      this.palette.set_colors(this.config.colors),
        this.storage.write(this.config),
        this.list.update_all(this.sprite.get_all()),
        this.update(),
        this.regain_keyboard_controls(),
        o('Configuration updated.')
    }
    update_loaded_file() {
      this.sprite.set_all(this.load.get_imported_file()),
        this.list.update_all(this.sprite.get_all()),
        this.update()
    }
    regain_keyboard_controls() {
      this.allow_keyboard_shortcuts = !0
    }
    update_sprite_name() {
      this.allow_keyboard_shortcuts = !0
      let t = s.val('#input-sprite-name')
      ;(t = t.replace(/[^A-Za-z0-9-_]+/g, '')),
        this.sprite.set_sprite_name(t),
        this.list.update_all(this.sprite.get_all()),
        this.update()
    }
    user_interaction() {
      document.addEventListener('keydown', t => {
        if (this.allow_keyboard_shortcuts) {
          if ('a' == t.key) {
            console.time('performance')
            for (let t = 0; t <= 1e3; t++) this.update()
            console.timeEnd('performance')
          }
          'ArrowRight' == t.key &&
            (this.sprite.set_current_sprite('right'), this.update()),
            'ArrowLeft' == t.key &&
              (this.sprite.set_current_sprite('left'), this.update()),
            'F' == t.key && l(),
            'm' == t.key &&
              ((this.mode = 'move'),
              o('Move mode'),
              s.attr('#image-icon-move', 'src', 'img/ui/icon-move-hi.png'),
              s.attr('#image-icon-draw', 'src', 'img/ui/icon-draw.png'),
              s.attr('#image-icon-erase', 'src', 'img/ui/icon-erase.png'),
              s.attr('#image-icon-fill', 'src', 'img/ui/icon-fill.png')),
            'd' == t.key &&
              ((this.mode = 'draw'),
              o('Draw mode'),
              s.attr('#image-icon-move', 'src', 'img/ui/icon-move.png'),
              s.attr('#image-icon-draw', 'src', 'img/ui/icon-draw-hi.png'),
              s.attr('#image-icon-erase', 'src', 'img/ui/icon-erase.png'),
              s.attr('#image-icon-fill', 'src', 'img/ui/icon-fill.png')),
            'e' == t.key &&
              ((this.mode = 'erase'),
              o('Erase mode'),
              s.attr('#image-icon-move', 'src', 'img/ui/icon-move.png'),
              s.attr('#image-icon-draw', 'src', 'img/ui/icon-draw.png'),
              s.attr('#image-icon-erase', 'src', 'img/ui/icon-erase-hi.png'),
              s.attr('#image-icon-fill', 'src', 'img/ui/icon-fill.png')),
            'f' == t.key &&
              ((this.mode = 'fill'),
              o('Fill mode'),
              s.attr('#image-icon-move', 'src', 'img/ui/icon-move.png'),
              s.attr('#image-icon-draw', 'src', 'img/ui/icon-draw.png'),
              s.attr('#image-icon-erase', 'src', 'img/ui/icon-erase.png'),
              s.attr('#image-icon-fill', 'src', 'img/ui/icon-fill-hi.png')),
            '1' == t.key && (this.sprite.set_pen(0), this.update()),
            '2' == t.key && (this.sprite.set_pen(1), this.update()),
            '3' == t.key &&
              this.sprite.is_multicolor() &&
              (this.sprite.set_pen(2), this.update()),
            '4' == t.key &&
              this.sprite.is_multicolor() &&
              (this.sprite.set_pen(3), this.update()),
            'z' == t.key && (this.sprite.undo(), this.update()),
            'Z' == t.key && (this.sprite.redo(), this.update()),
            'c' == t.key && (this.sprite.toggle_multicolor(), this.update()),
            'N' == t.key &&
              (this.sprite.new_sprite(
                this.palette.get_color(),
                this.sprite.is_multicolor(),
              ),
              this.list.update_all(this.sprite.get_all()),
              this.update(),
              o('New sprite.')),
            'C' == t.key &&
              (this.sprite.copy(), this.update_ui(), o('Sprite copied.')),
            'V' == t.key &&
              (this.sprite.is_copy_empty()
                ? o('Nothing to copy.', 'error')
                : (this.sprite.paste(), this.update(), o('Sprite pasted.'))),
            'D' == t.key &&
              (this.sprite.duplicate(),
              this.list.update_all(this.sprite.get_all()),
              this.update_ui(),
              o('Sprite duplicated.')),
            'X' == t.key &&
              (this.sprite.delete(),
              this.list.update_all(this.sprite.get_all()),
              this.update()),
            'i' == t.key && (this.sprite.invert(), this.update())
        }
      }),
        (s.sel('#menubar-info').onclick = () => {
          ;(this.allow_keyboard_shortcuts = !1),
            e()(this.window_about.get_window_id()).dialog('open')
        }),
        (s.sel('#menubar-settings').onclick = () => {
          ;(this.allow_keyboard_shortcuts = !1),
            e()(this.window_settings.get_window_id()).dialog('open')
        }),
        (s.sel('#menubar-load').onclick = () => {
          s.sel('#input-load').click()
        }),
        (s.sel('#menubar-save').onclick = () => {
          ;(this.allow_keyboard_shortcuts = !1),
            e()(this.window_save.get_window_id()).dialog('open'),
            this.save.set_save_data(this.sprite.get_all())
        }),
        (s.sel('#menubar-new').onclick = () => {
          s.css('#dialog-confirm', 'visibility', 'visible'),
            e()('#dialog-confirm').dialog('open')
        }),
        e()('#dialog-confirm').dialog({
          resizable: !1,
          autoOpen: !1,
          height: 'auto',
          width: 400,
          modal: !0,
          dialogClass: 'no-close',
          buttons: [
            {
              click: () => {
                ;(this.sprite = new g(this.config)),
                  this.sprite.new_sprite(this.palette.get_color()),
                  this.list.update_all(this.sprite.get_all()),
                  this.update(),
                  e()('#dialog-confirm').dialog('close'),
                  o('New file created.')
              },
              text: 'Ok',
              class: 'confirm-button',
            },
            {
              click: () => {
                e()('#dialog-confirm').dialog('close')
              },
              text: 'Cancel',
              class: 'confirm-button',
            },
          ],
        }),
        (s.sel('#menubar-undo').onclick = () => {
          this.sprite.undo(),
            this.list.update_all(this.sprite.get_all()),
            this.update()
        }),
        (s.sel('#menubar-redo').onclick = () => {
          this.sprite.redo(),
            this.list.update_all(this.sprite.get_all()),
            this.update()
        }),
        (s.sel('#menubar-new-sprite').onclick = () => {
          this.sprite.new_sprite(
            this.palette.get_color(),
            this.sprite.is_multicolor(),
          ),
            this.list.update_all(this.sprite.get_all()),
            this.update()
        }),
        (s.sel('#menubar-kill').onclick = () => {
          this.sprite.delete(),
            this.list.update_all(this.sprite.get_all()),
            this.update()
        }),
        (s.sel('#menubar-copy').onclick = () => {
          this.sprite.copy(), this.update_ui(), o('Sprite copied.')
        }),
        (s.sel('#menubar-paste').onclick = () => {
          this.sprite.is_copy_empty()
            ? o('Nothing to copy.', 'error')
            : (this.sprite.paste(), this.update(), o('Sprite pasted.'))
        }),
        (s.sel('#menubar-duplicate').onclick = () => {
          this.sprite.duplicate(),
            this.list.update_all(this.sprite.get_all()),
            this.update_ui(),
            o('Sprite duplicated.')
        }),
        (s.sel('#menubar-shift-left').onclick = () => {
          this.sprite.shift_horizontal('left'), this.update()
        }),
        (s.sel('#menubar-shift-right').onclick = () => {
          this.sprite.shift_horizontal('right'), this.update()
        }),
        (s.sel('#menubar-shift-up').onclick = () => {
          this.sprite.shift_vertical('up'), this.update()
        }),
        (s.sel('#menubar-shift-down').onclick = () => {
          this.sprite.shift_vertical('down'), this.update()
        }),
        (s.sel('#menubar-flip-horizontal').onclick = () => {
          this.sprite.flip_horizontal(), this.update()
        }),
        (s.sel('#menubar-flip-vertical').onclick = () => {
          this.sprite.flip_vertical(), this.update()
        }),
        (s.sel('#menubar-colormode').onclick = () => {
          this.sprite.toggle_multicolor(), this.update()
        }),
        (s.sel('#menubar-stretch-x').onclick = () => {
          this.sprite.toggle_double_x(), this.update()
        }),
        (s.sel('#menubar-stretch-y').onclick = () => {
          this.sprite.toggle_double_y(), this.update()
        }),
        (s.sel('#menubar-invert').onclick = () => {
          this.sprite.invert(), this.update()
        }),
        (s.sel('#menubar-overlay').onclick = () => {
          this.sprite.toggle_overlay(), this.update()
        }),
        (s.sel('#menubar-fullscreen').onclick = () => {
          l()
        }),
        (s.sel('#menubar-editor-zoom-in').onclick = () => {
          this.editor.zoom_in(),
            (this.config.window_editor.zoom = this.editor.get_zoom()),
            this.storage.write(this.config),
            this.update()
        }),
        (s.sel('#menubar-editor-zoom-out').onclick = () => {
          this.editor.zoom_out(),
            (this.config.window_editor.zoom = this.editor.get_zoom()),
            this.storage.write(this.config),
            this.update()
        }),
        (s.sel('#menubar-editor-grid').onclick = () => {
          this.editor.toggle_grid(),
            (this.config.window_editor.grid = this.editor.get_grid()),
            this.storage.write(this.config),
            this.update()
        }),
        (s.sel('#menubar-preview-zoom-in').onclick = () => {
          this.preview.zoom_in(),
            (this.config.window_preview.zoom = this.preview.get_zoom()),
            this.storage.write(this.config),
            this.update()
        }),
        (s.sel('#menubar-preview-zoom-out').onclick = () => {
          this.preview.zoom_out(),
            (this.config.window_preview.zoom = this.preview.get_zoom()),
            this.storage.write(this.config),
            this.update()
        }),
        (s.sel('#menubar-list-grid').onclick = () => {
          this.list.toggle_grid(),
            this.list.update_all(this.sprite.get_all()),
            this.update()
        }),
        (s.sel('#menubar-list-zoom-in').onclick = () => {
          this.list.zoom_in(),
            (this.config.window_list.zoom = this.list.get_zoom()),
            this.storage.write(this.config),
            this.list.update_all(this.sprite.get_all()),
            this.update()
        }),
        (s.sel('#menubar-list-zoom-out').onclick = () => {
          this.list.zoom_out(),
            (this.config.window_list.zoom = this.list.get_zoom()),
            this.storage.write(this.config),
            this.list.update_all(this.sprite.get_all()),
            this.update()
        }),
        (s.sel('#icon-preview-zoom-in').onclick = () => {
          this.preview.zoom_in(),
            (this.config.window_preview.zoom = this.preview.get_zoom()),
            this.storage.write(this.config),
            this.update()
        }),
        (s.sel('#icon-preview-zoom-out').onclick = () => {
          this.preview.zoom_out(),
            (this.config.window_preview.zoom = this.preview.get_zoom()),
            this.storage.write(this.config),
            this.update()
        }),
        (s.sel('#icon-preview-x').onclick = () => {
          this.sprite.toggle_double_x(), this.update()
        }),
        (s.sel('#icon-preview-y').onclick = () => {
          this.sprite.toggle_double_y(), this.update()
        }),
        (s.sel('#icon-preview-overlay').onclick = () => {
          this.sprite.toggle_overlay(), this.update()
        }),
        (s.sel('#icon-load').onclick = () => {
          s.sel('#input-load').click()
        }),
        (s.sel('#icon-save').onclick = () => {
          ;(this.allow_keyboard_shortcuts = !1),
            e()(this.window_save.get_window_id()).dialog('open'),
            this.save.set_save_data(this.sprite.get_all())
        }),
        (s.sel('#icon-undo').onclick = () => {
          this.sprite.undo(),
            this.list.update_all(this.sprite.get_all()),
            this.update()
        }),
        (s.sel('#icon-redo').onclick = () => {
          this.sprite.redo(),
            this.list.update_all(this.sprite.get_all()),
            this.update()
        }),
        (s.sel('#icon-move').onclick = () => {
          ;(this.mode = 'move'),
            o('Move mode'),
            s.attr('#image-icon-move', 'src', 'img/ui/icon-move-hi.png'),
            s.attr('#image-icon-draw', 'src', 'img/ui/icon-draw.png'),
            s.attr('#image-icon-erase', 'src', 'img/ui/icon-erase.png'),
            s.attr('#image-icon-fill', 'src', 'img/ui/icon-fill.png')
        }),
        (s.sel('#icon-draw').onclick = () => {
          ;(this.mode = 'draw'),
            o('Draw mode'),
            s.attr('#image-icon-move', 'src', 'img/ui/icon-move.png'),
            s.attr('#image-icon-draw', 'src', 'img/ui/icon-draw-hi.png'),
            s.attr('#image-icon-erase', 'src', 'img/ui/icon-erase.png'),
            s.attr('#image-icon-fill', 'src', 'img/ui/icon-fill.png')
        }),
        (s.sel('#icon-erase').onclick = () => {
          ;(this.mode = 'erase'),
            o('Erase mode'),
            s.attr('#image-icon-move', 'src', 'img/ui/icon-move.png'),
            s.attr('#image-icon-draw', 'src', 'img/ui/icon-draw.png'),
            s.attr('#image-icon-erase', 'src', 'img/ui/icon-erase-hi.png'),
            s.attr('#image-icon-fill', 'src', 'img/ui/icon-fill.png')
        }),
        (s.sel('#icon-fill').onclick = () => {
          ;(this.mode = 'fill'),
            o('Fill mode'),
            s.attr('#image-icon-move', 'src', 'img/ui/icon-move.png'),
            s.attr('#image-icon-draw', 'src', 'img/ui/icon-draw.png'),
            s.attr('#image-icon-erase', 'src', 'img/ui/icon-erase.png'),
            s.attr('#image-icon-fill', 'src', 'img/ui/icon-fill-hi.png')
        }),
        (s.sel('#palette_all_colors').onclick = t => {
          this.palette.set_active_color(t),
            this.sprite.set_pen_color(this.palette.get_color()),
            this.list.update_all(this.sprite.get_all()),
            this.update()
        }),
        (s.sel('#palette_1').onclick = () => {
          this.sprite.set_pen(1), this.update()
        }),
        (s.sel('#palette_0').onclick = () => {
          this.sprite.set_pen(0), this.update()
        }),
        (s.sel('#palette_2').onclick = () => {
          this.sprite.set_pen(2), this.update()
        }),
        (s.sel('#palette_3').onclick = () => {
          this.sprite.set_pen(3), this.update()
        }),
        (s.sel('#icon-editor-zoom-in').onclick = () => {
          this.editor.zoom_in(),
            (this.config.window_editor.zoom = this.editor.get_zoom()),
            this.storage.write(this.config),
            this.update()
        }),
        (s.sel('#icon-editor-zoom-out').onclick = () => {
          this.editor.zoom_out(),
            (this.config.window_editor.zoom = this.editor.get_zoom()),
            this.storage.write(this.config),
            this.update()
        }),
        (s.sel('#icon-editor-grid').onclick = () => {
          this.editor.toggle_grid(),
            (this.config.window_editor.grid = this.editor.get_grid()),
            this.storage.write(this.config),
            this.update()
        }),
        (s.sel('#icon-flip-horizontal').onclick = () => {
          this.sprite.flip_horizontal(), this.update()
        }),
        (s.sel('#icon-flip-vertical').onclick = () => {
          this.sprite.flip_vertical(), this.update()
        }),
        (s.sel('#icon-multicolor').onclick = () => {
          this.sprite.toggle_multicolor(), this.update()
        }),
        (s.sel('#input-sprite-name').onfocus = () => {
          this.allow_keyboard_shortcuts = !1
        }),
        (s.sel('#input-sprite-name').onkeyup = t => {
          'Enter' === t.key &&
            (this.update_sprite_name(), s.sel('#input-sprite-name').blur())
        }),
        (s.sel('#input-sprite-name').onblur = () => {
          this.update_sprite_name()
        }),
        (s.sel('#editor').ontouchmove = t => {
          t.preventDefault()
        }),
        (s.sel('#editor').onmousedown = t => {
          'draw' == this.mode &&
            (this.sprite.set_pixel(this.editor.get_pixel(t), t.shiftKey),
            (this.is_drawing = !0)),
            'erase' == this.mode &&
              (this.sprite.set_pixel(this.editor.get_pixel(t), !0),
              (this.is_drawing = !0)),
            'fill' == this.mode &&
              this.sprite.floodfill(this.editor.get_pixel(t)),
            'move' == this.mode &&
              ((this.move_start = !0),
              (this.move_start_pos = this.editor.get_pixel(t))),
            this.update()
        }),
        (s.sel('#editor').onmousemove = t => {
          if (
            this.is_drawing &&
            ('draw' == this.mode || 'erase' == this.mode)
          ) {
            const i = this.editor.get_pixel(t)
            if (i.x != this.oldpos.x || i.y != this.oldpos.y) {
              const e = this.sprite.get_all()
              let s = t.shiftKey
              'erase' == this.mode && (s = !0),
                this.sprite.set_pixel(i, s),
                this.editor.update(e),
                this.preview.update(e),
                this.list.update(e),
                (this.oldpos = i)
            }
          }
          if (this.move_start) {
            const i = this.editor.get_pixel(t).x - this.move_start_pos.x,
              e = this.editor.get_pixel(t).y - this.move_start_pos.y
            i > 0 && this.sprite.shift_horizontal('right'),
              i < 0 && this.sprite.shift_horizontal('left'),
              e > 0 && this.sprite.shift_vertical('down'),
              e < 0 && this.sprite.shift_vertical('up'),
              (i || e) &&
                ((this.move_start_pos = this.editor.get_pixel(t)),
                this.update())
          }
        }),
        (s.sel('#editor').onclick = () => {
          ;(this.is_drawing = !1),
            (this.move_start = !1),
            this.sprite.save_backup(),
            this.update()
        }),
        (s.sel('#icon-list-grid').onclick = () => {
          this.list.toggle_grid(),
            this.list.update_all(this.sprite.get_all()),
            this.update()
        }),
        (s.sel('#icon-list-zoom-in').onclick = () => {
          this.list.zoom_in(),
            (this.config.window_list.zoom = this.list.get_zoom()),
            this.storage.write(this.config),
            this.list.update_all(this.sprite.get_all()),
            this.update()
        }),
        (s.sel('#icon-list-zoom-out').onclick = () => {
          this.list.zoom_out(),
            (this.config.window_list.zoom = this.list.get_zoom()),
            this.storage.write(this.config),
            this.list.update_all(this.sprite.get_all()),
            this.update()
        }),
        (s.sel('#icon-list-new').onclick = () => {
          this.sprite.new_sprite(
            this.palette.get_color(),
            this.sprite.is_multicolor(),
          ),
            this.list.update_all(this.sprite.get_all()),
            this.update()
        }),
        (s.sel('#icon-list-delete').onclick = () => {
          this.sprite.delete(),
            this.list.update_all(this.sprite.get_all()),
            this.update()
        }),
        (s.sel('#icon-list-copy').onclick = () => {
          this.sprite.copy(), this.update_ui(), o('Sprite copied.')
        }),
        (s.sel('#icon-list-paste').onclick = () => {
          this.sprite.is_copy_empty()
            ? o('Nothing to copy.', 'error')
            : (this.sprite.paste(), this.update(), o('Sprite pasted.'))
        }),
        (s.sel('#icon-list-duplicate').onclick = () => {
          this.sprite.duplicate(),
            this.list.update_all(this.sprite.get_all()),
            this.update_ui(),
            o('Sprite duplicated.')
        }),
        (s.sel('#spritelist').onclick = () => {
          this.dragging ||
            (this.sprite.set_current_sprite(this.list.get_clicked_sprite()),
            !this.sprite.is_multicolor() &&
              this.sprite.is_pen_multicolor() &&
              this.sprite.set_pen(1),
            this.update())
        }),
        e()('#spritelist').sortable({
          stop: () => {
            this.sprite.sort_spritelist(e()('#spritelist').sortable('toArray')),
              (this.dragging = !1),
              this.list.update_all(this.sprite.get_all()),
              this.update()
          },
        }),
        e()('#spritelist').sortable({
          start: () => {
            this.dragging = !0
          },
        })
    }
  }
  document.addEventListener('DOMContentLoaded', function () {
    new w({
      version: 1.3,
      sprite_x: 24,
      sprite_y: 21,
      palettes: {
        colodore: [
          '#000000',
          '#ffffff',
          '#813338',
          '#75cec8',
          '#8e3c97',
          '#56ac4d',
          '#2e2c9b',
          '#edf171',
          '#8e5029',
          '#553800',
          '#c46c71',
          '#4a4a4a',
          '#7b7b7b',
          '#a9ff9f',
          '#706deb',
          '#b2b2b2',
        ],
        pepto: [
          '#000000',
          '#ffffff',
          '#67372d',
          '#73a3b1',
          '#6e3e83',
          '#5b8d48',
          '#362976',
          '#b7c576',
          '#6c4f2a',
          '#423908',
          '#98675b',
          '#444444',
          '#6c6c6c',
          '#9dd28a',
          '#6d5fb0',
          '#959595',
        ],
        custom: [
          '#000000',
          '#ffffff',
          '#813338',
          '#75cec8',
          '#8e3c97',
          '#56ac4d',
          '#2e2c9b',
          '#edf171',
          '#8e5029',
          '#553800',
          '#c46c71',
          '#4a4a4a',
          '#7b7b7b',
          '#a9ff9f',
          '#706deb',
          '#b2b2b2',
        ],
      },
      selected_palette: 'pepto',
      window_tools: { top: 50, left: 20 },
      window_editor: { top: 50, left: 210, zoom: 18, grid: !0 },
      window_preview: { top: 50, left: 700, zoom: 6 },
      window_list: { top: 280, left: 700, width: 440, height: 200, zoom: 4 },
      window_palette: { top: 50, left: 110, zoom: 1 },
    })
  })
})()
