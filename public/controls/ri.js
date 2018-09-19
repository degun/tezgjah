
$(function(){
    
    $('.anash').animate({width: '180px'}, 1000);
    $('ul').delay(800).animate({opacity: '1', left: '50px'});
    $('.tregim').delay(900).animate({opacity: '1'});
    
    var nofka = sessionStorage.getItem('nfk');
    
    var par = new Paragrafe();
    $('#textarea1').focus(function() {
        $(this).val('');
    });

  $('.shto').on('click', function() {

    var paragraf1 = new Paragraf({
      permbajtja: $('#textarea1').val(),
      nofka: nofka,
      idTregim: '0',
      idParagraf: '1'
    });
    
    par.add(paragraf1);
    paragraf1.save();
    $('#textarea1').val('');
  });
  
});
