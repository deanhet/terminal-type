 (function ($){

  $.fn.terminalType = function(options){

    var elementType = this.prop('tagName');

    if(elementType !== "TEXTAREA"){
      throw new Error("The container needs to be a textarea. Check documentation for further help. ")
    }

    var self = this;
    var options = $.extend({
      introText: "Hello, I am some introduction text",
      typeText: true,
      prependUser: true,
      prependTerminal: true,
      prependUserText: "> ",
      prependTerminalText: "$ ",
      focusOnFinish: true,
      validCommands: {
        hello: "Hi there buddy! You checked the docs?",
      },
      error: [
      "I AM AN ERROR"
      ]
    }, options);

    var placeText = function(string){
      var result = string.split('');
      var i = 0;

      if(options.prependTerminal){
        self.val(self.val()+ options.prependTerminalText);
      }

      var place_this = function(){
        self.val(self.val() + string);
        self.val(self.val()+ "\n");
          if(options.prependUser){
            self.val(self.val()+ options.prependUserText);
          }
          if(options.focusOnFinish){
            self.focus();
          }
          return;
      }

      var type_this = function(){
        var typeDelay = Math.random() * (100 - 30) + 10;
        if(i < result.length){
          self.val(self.val() + result[i]);
          i++;
          setTimeout(type_this, typeDelay);
        } else {
          self.val(self.val()+ "\n");
          if(options.prependUser){
            self.val(self.val()+ options.prependUserText);
          }
          if(options.focusOnFinish){
            self.focus();
          }
          return;
        }
      }

      if(options.typeText){
        type_this();
      } else {
        place_this();
      }
    }

    placeText(options.introText);

    var checkInput = function(input){
      var checkUserInput = input.toLowerCase().replace(options.prependUserText, "").trim();
      if(options.validCommands[checkUserInput] !== undefined){
        placeText(options.validCommands[checkUserInput]);
        if(self._onSuccessCallback != undefined){
          self._onSuccessCallback(checkUserInput);
        }
      } else {
        placeText(options.error[Math.floor(Math.random() * options.error.length)]);
        if(self._onFailureCallback != undefined){
          self._onFailureCallback(checkUserInput);
        }
      }
    }

    this.keypress(function(e){
      if(e.which == 13){
        e.preventDefault();
        var userInput = $(this).val().substr($(this).val().lastIndexOf("\n") + 1);
        $(this).val($(this).val()+ "\n");
        checkInput(userInput, $(this));
      }
    });
    return this;
  };

  $.fn.onTerminalSuccess = function(providedCallback){
    if(typeof (providedCallback) === 'function'){
      this._onSuccessCallback = providedCallback;
    } else {
      throw new Error('Provided callback for onTerminalSuccess is not a function.');
    }
    return this;
  };

  $.fn.onTerminalFailure = function(providedCallback){
    if(typeof (providedCallback) === 'function'){
      this._onFailureCallback = providedCallback;
    } else {
      throw new Error('Provided callback for onTerminalFailure is not a function.');
    }
    return this;
  };

}(jQuery));
