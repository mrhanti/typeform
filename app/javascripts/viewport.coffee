define (require) ->
  require "resize"
  $ = require "jquery"


  class Viewport

    constructor: (@el, @ul) ->
      # ...
      @$el = $ @el

      @$el.on "resize", (e) =>
        difference = @area().height - @ul.firstChild.offset().height
        difference = difference / 2

        marginTop = @ul.firstChild.marginTop + difference

        difference = @area().height - @ul.lastChild.offset().height
        difference = difference / 2

        marginBottom = @ul.firstChild.marginTop + difference
        @ul.setMargin(marginTop, marginBottom)

      @$el.trigger "resize"

    area: =>
      {
        height: @el.offsetHeight
        width: @el.offsetWidth
      }

    scrollTop: (scroll) =>
      @el.scrollTop = scroll
