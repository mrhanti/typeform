define (require) ->
  require "resize"
  $ = require "jquery"


  class Viewport

    constructor: (@el, @ul) ->
      @$el = $ @el

      @$el.on "resize", @resize
      @$el.scroll (e) =>
        for child in @ul.children
          child.toggleSelect(e.target)
        false


      @current = @ul.firstChild
      # ..
      @resize()

    area: =>
      {
        height: @el.offsetHeight
        width: @el.offsetWidth
      }

    scrollTop: (scroll) =>
      @el.scrollTop = scroll

    resize: =>
      difference = @area().height - @ul.firstChild.area().height
      difference = difference / 2
      marginTop = difference

      difference = @area().height - @ul.lastChild.area().height
      difference = difference / 2
      marginBottom = difference

      @ul.setMargin(marginTop, marginBottom)

      false

    next: =>
      _current = @ul.children[@current.index+1]
      console.log _current, @current
      # return unless _current

      # @$el.animate
      #   scrollTop: @current.area().top
      # , 300, => @current = _current

    previous: =>
      _current = @ul.children[@current.index-1]
      console.log _current, @current
      # return unless _current

      # @$el.animate
      #   scrollTop: @current.area().top
      # , 300, => @current = _current


