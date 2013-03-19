define (require) ->

  LI = require "cs!li"

  class UL
    constructor: (@el) ->
      $children = @el.querySelectorAll("li")
      @children = []
      if $children
        for item in $children
          @children.push(new LI(item))

    offset: =>
      {
        height: @el.offsetHeight,
        width: @el.offsetWidth
      }

    childrenOffsets: =>
      offsets = []
      for child in @children
        offsets.push(child.offset())
      offsets

    length: =>
      @children.length
