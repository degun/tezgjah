$(function(){

    $('.anash').animate({width: '180px'}, 1000);
    $('ul').delay(800).animate({opacity: '1', left: '50px'});
    $('.tregim, .tregim_admin').delay(900).animate({opacity: '1'});

    var nfk = $('#nofkalog').text();
    sessionStorage.setItem('nfk', nfk);

    var id3, idPar;
    var par = new Paragrafe();

    $('.shto').on('click', function() {
      id3 = sessionStorage.getItem('tregim');
      idPar = sessionStorage.getItem('idPar');
      var paragraf2 = new Paragraf({
        permbajtja: $('#textarea2').val(),
        nofka: nfk,
        idTregim: parseInt(id3),
        idParagraf: parseInt(idPar)+1
      });

    par.add(paragraf2);
    paragraf2.save();
    $('#textarea2').val('');
  });
})
