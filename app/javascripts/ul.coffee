define (require) ->

  LI = require "cs!li"

  class UL
    constructor: (@el) ->
      $children = @el.querySelectorAll("li")
      @children = []
      if $children
        for item, i in $children
          @children.push(new LI(i, item))

      @firstChild = @children[0]
      @lastChild = @children[@children.length-1]
      @length = @children.length
      @

    area: =>
      {
        height: @el.offsetHeight,
        width: @el.offsetWidth
      }

    setMargin: (top, bottom) =>
      @el.style.marginTop = "#{top or 0}px"
      @el.style.marginBottom = "#{(bottom*1.5) or 0}px"

    dataset: (opts=null) =>
      if opts?
        for k, v of opts
          @el.dataset[k] = v
      else
        opts = {}
        for k, v of @el.dataset
          opts[k] = parseFloat(v)
      opts

    scrollTo: (pos) =>
      @children[pos].scrollTo()

    childrenOffsets: =>
      for child in @children
        console.log child.area()




