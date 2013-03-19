define (require) ->
  class Viewport

    constructor: (@el) ->
      # ...

    area: =>
      {
        height: @el.offsetHeight
        width: @el.offsetWidth
      }

    scrollTop: (scroll) =>
      @el.scrollTop = scroll