var signature = document.getElementById("signature");
function exportImage(nameArchive) {
	html2canvas(signature).then(function(canvas) {

	    var base64image = canvas.toDataURL("image/png");

	    var a = $("<a>").attr("href", base64image).attr("download", 'assinatura_email_'+nameArchive+".png").appendTo("body");
		a[0].click();
		a.remove();
	});
}

var SPMaskBehavior = function (val) {
  return val.replace(/\D/g, '').length === 11 ? '(00) 00000 0000' : '(00) 0000 00009';
},
spOptions = {
  onKeyPress: function(val, e, field, options) {
      field.mask(SPMaskBehavior.apply({}, arguments), options);
    }
};

$('.phone').mask(SPMaskBehavior, spOptions);

$('#tabs .tab').click(function(e) {
	var tab = $(this).attr('data-type');
	$(tab).hide();
	console.log(tab);
	$('.tab-cont').show();
	$('.tab-cont:not(".'+tab+'")').hide();
	$('.container-signature').removeClass('layout-loja layout-escritorio')
	$('.container-signature').addClass('layout-'+tab)
})




$('input').each(function(e) {

	$(this).keyup(function(event) {
		var name = $(this).attr('name');
		var val = $(this).val();
		$('#'+name).html(val);
		$(this).removeClass('error');
	});
});


$('button').click(function(e){
	e.preventDefault();
		var name = $('#nome-completo').html()
		nameArchive = name.replace(/ /g, '-');
		nameArchive = nameArchive.toLowerCase();

		$('input').removeClass('success error');
		$('input').each(function(e) {
			if($(this).val() === '') {
				$(this).addClass('error');
			} else {
				var regex = /@comprebem\.com\.br$/;
				var email = $('#input-email').val();
				test = regex.test(email);
				if($(this).attr('name') === 'nome-completo' || $(this).val() === '') {
					if($.isNumeric($(this).val())) {
						alert('Nome pode conter somente letras');
						$(this).addClass('error');
					} else {
						$(this).addClass('success');
					}
				} else if(!test) {
					$('#input-email').addClass('error');
					alert('Somente email corporativo');
				} else {
					$(this).addClass('success');
					exportImage(nameArchive);
				}


			}
		});

});