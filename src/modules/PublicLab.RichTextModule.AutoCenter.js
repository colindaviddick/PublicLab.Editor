/*
   Auto Center insertion: ****
*/

module.exports = function initAutoCenter(_module, wysiwyg) {

  // $('.woofmark-mode-markdown').removeClass('disabled')

  // create a menu option for auto center:
  $('.wk-commands').append('<button class="btn-autocenter"><a class="woofmark-command-autocenter btn btn-default" data-toggle="autocenter" title="<center> In Rich mode, insert spaces for images."><i class="fa fa-align-center"></i></a></button>');
  //since chunk.selection returns null for images

  $('.btn-autocenter').css({
    padding: 0,
    border: 0
  });

  $(document).ready(function(){
    $('[data-toggle="autocenter"]').tooltip();
  });

  $('.wk-commands .woofmark-command-autocenter').click(function() {
    wysiwyg.runCommand(function(chunks,mode) {
      if(mode == "wysiwyg") { //first convert then replace
        chunks.selection = ("->"+chunks.selection+"<-")
        var openingTag = /->/g;
        var closingTag = /<-/g;
        chunks.selection = chunks.selection.replace(openingTag,"<center>")
        chunks.selection = chunks.selection.replace(closingTag,"</center>")
      }
      else if (mode == "markdown") {
        chunks.selection = _module.wysiwyg.parseHTML("<center>"+chunks.selection+"</center>")
      }

      _module.afterParse();
      })
  })
}