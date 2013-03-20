define (require) ->

  LI = require "cs!li"

  class UL
    constructor: (@el) ->
      $children = @el.querySelectorAll("li")
      @children = []
      if $children
        for item in $children
          @children.push(new LI(item))

      @firstChild = @children[0]
      @lastChild = @children[@children.length - 1]

    offset: =>
      {
        height: @el.offsetHeight,
        width: @el.offsetWidth
      }

    length: =>
      @children.length

    setMargin: (top, bottom=0) =>
      @el.style.marginTop = "#{top}px"
      @el.style.marginBottom = "#{bottom}px"
