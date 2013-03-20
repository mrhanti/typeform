define (require) ->
  # $ = require 'jquery'

  # el = document.querySelector(".container")

  # $(document.body).on "keyup", (e) ->
  #   if e.keyCode is 13
  #     console.log "again", el.scrollTop
  #     el.scrollTop += 50
  #     e.preventDefault()

  UL = require "cs!ul"
  Viewport = require "cs!viewport"

  class App
    constructor: (ul, viewport) ->
      console.log "App#constructor", ul, viewport
      ul = new UL(ul)
      viewport = new Viewport(viewport, ul)

      window.ul = ul
      window.viewport = viewport
