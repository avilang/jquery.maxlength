!(function($){

  $.fn.maxlength = function (settings) {

      if (typeof settings == 'string') {
          settings = { feedback : settings };
      }

      settings = $.extend({}, $.fn.maxlength.defaults, settings);

      function length(el) {
        return el.value.length;
      }

      return this.each(function () {
        var field = this,
            $field = $(field),
            $form = settings.form === '' ? $(field.form) : $(settings.form),
            limit = settings.useInput ? $form.find('input[name=maxlength]').val() : $field.attr('maxlength'),
            $charsLeft = $form.find(settings.feedback);

        function limitCheck(event) {
            var len = length(this),
                exceeded = len >= limit,
                code = event.keyCode;

            if ( !exceeded )
              return;

              switch (code) {
                  case 8:
                  case 9:
                  case 17:
                  case 36:
                  case 35:
                  case 37:
                  case 38:
                  case 39:
                  case 40:
                  case 46:
                  case 65:
                      return;

                  default:
                      return false;
              }
          }


          var updateCount = function () {
              var len = length(field),
                  diff = limit - len;

              $charsLeft.html( diff || '0' );

              // 截取
              if (settings.hardLimit && diff < 0) {
                 field.value = field.value.substr(0, limit);
                 updateCount();
              }
          };

          $field.keyup(updateCount).change(updateCount);
          if (settings.hardLimit) {
              $field.keydown(limitCheck);
          }

          updateCount();
      });
  };

  $.fn.maxlength.defaults = {
      useInput : false,
      hardLimit : true,
      feedback : '.charsLeft',
      form : ''
  };

})(jQuery);