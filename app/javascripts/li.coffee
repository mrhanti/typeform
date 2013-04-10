define ->
  class LI

    constructor: (@index, @el) ->
      @id = @el.dataset.id
      @$el = $ @el

      if document and document.defaultView
        t = @el.querySelector('.question')

        style = if t.style.marginTop then t.style else document.defaultView
          .getComputedStyle(t, null)

        @marginTop = parseInt(style.marginTop)

    toggleSelect: (target) =>
      area = @area()
      scrollTop = area.top
      scrollHeight = scrollTop + area.height + @marginTop

      seletClassName = "open"
      if target.scrollTop >= scrollTop and target.scrollTop < scrollHeight
        @$el.addClass(seletClassName) unless @$el.hasClass(seletClassName)
      else
        @$el.removeClass(seletClassName) if @$el.hasClass(seletClassName)

    area: =>
      {
        height: @el.offsetHeight,
        width: @el.offsetWidth,
        top: @el.offsetTop,
        left: @el.offsetLeft
      }

    scrollTo: (scroll) =>
      $(".viewport").animate
        scrollTop: @area().top + 144
      , 300
