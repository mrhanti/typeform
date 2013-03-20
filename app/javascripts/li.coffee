define ->
  class LI

    constructor: (@el) ->
      # ...
      if document and document.defaultView
        t = @el.querySelector('.question')

        style = if t.style.marginTop then t.style else document.defaultView
            .getComputedStyle(t, null)

        @marginTop = parseInt(style.marginTop)

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
        height: @el.offsetHeight + @marginTop,
        width: @el.offsetWidth,
        top: @el.offsetTop,
        left: @el.offsetLeft
      }

    scrollTo: =>
      $(".viewport").animate
        scrollTop: @offset().top + @marginTop
      , 300


