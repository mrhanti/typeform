define (require) ->

  UL = require "cs!ul"
  Viewport = require "cs!viewport"

  class App
    constructor: (ul, viewport) ->
      ul = new UL(ul)
      viewport = new Viewport(viewport, ul)

      window.ul = ul
      window.viewport = viewport
