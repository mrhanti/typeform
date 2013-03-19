define ->
  class LI

    constructor: (@el) ->
      # ...


      $(".viewport").scroll (e) =>
        offset = @offset()
        scrollTop = offset.top
        scrollHeight = scrollTop + offset.height
        if e.target.scrollTop >= scrollTop and e.target.scrollTop < scrollHeight
          $(@el).addClass("open") unless $(@el).hasClass("open")
        else
          $(@el).removeClass("open") if $(@el).hasClass("open")


    offset: =>
      {
        height: @el.offsetHeight,
        width: @el.offsetWidth,
        top: @el.offsetTop,
        left: @el.offsetLeft
      }
