function addEvent(obj, evt, fnc) { // helper, prolly don't need
      // W3C model
      if (obj.addEventListener) {
          obj.addEventListener(evt, fnc, false);
          return true;
      }
      // Microsoft model
      else if (obj.attachEvent) {
          return obj.attachEvent('on' + evt, fnc);
      }
      // Browser don't support W3C or MSFT model, go on with traditional
      else {
          evt = 'on'+evt;
          if(typeof obj[evt] === 'function'){
              // Object already has a function on traditional
              // Let's wrap it with our own function inside another function
              fnc = (function(f1,f2){
                  return function(){
                      f1.apply(this,arguments);
                      f2.apply(this,arguments);
                  };
              })(obj[evt], fnc);
          }
          obj[evt] = fnc;
          return true;
      }
      return false;
  }