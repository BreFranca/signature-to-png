var signature = document.getElementById("signature");
function exportImage(nameArchive) {
	html2canvas(signature).then(function(canvas) {

	    var base64image = canvas.toDataURL("image/png");

	    var a = $("<a>").attr("href", base64image).attr("download", nameArchive+".png").appendTo("body");
		a[0].click();
		a.remove();
	});
}

var SPMaskBehavior = function (val) {
  return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
},
spOptions = {
  onKeyPress: function(val, e, field, options) {
      field.mask(SPMaskBehavior.apply({}, arguments), options);
    }
};

$('.phone').mask(SPMaskBehavior, spOptions);

$('#input-name').keyup(function(event) {
	event.preventDefault();
	val = $(this).val();
	$('.container-signature').fadeIn();
	$('#name').html(val);
});

$('#input-phone1').keyup(function(event) {
	event.preventDefault();
	val = $(this).val();
	$('.container-signature').fadeIn();
	$('#phone1').html(val);
});

$('#input-phone2').keyup(function(event) {
	event.preventDefault();
	val = $(this).val();
	$('.container-signature').fadeIn();
	$('#phone2-container').show();
	$('#phone2').html(val);
	if(val === '' || val === '(') {
		$('#phone2-container').hide();
	} 
});

$('#input-email').keyup(function(event) {
	event.preventDefault();
	val = $(this).val();
	$('.container-signature').fadeIn();
	$('#email').html(val);
});

// $('#input-address').keyup(function(event) {
// 	event.preventDefault();
// 	val = $(this).val();
// 	$('#address').html(val);
// });

// $('#input-site').keyup(function(event) {
// 	event.preventDefault();
// 	val = $(this).val();
// 	$('#site').html(val);
// });


$('button').click(function(e){
	e.preventDefault();
	var name = $('#name').html(),
		email = $('#email').html(),
		phone1 = $('#phone1').html(),
		phone2 = $('#phone2').html(),
		// address = $('#address').html(),
		// site = $('#site').html(),

		nameArchive = name.replace(/ /g, '-');
		nameArchive = nameArchive.toLowerCase();

	if($.isNumeric(name)) {
		alert('Nome pode conter somente letras');
	} else {
		if(name === '' || email === '' || phone1 === '' || name === '' || name === '') {
			alert('Existem campos em branco');
		} else {
			exportImage(nameArchive);
		}
	}

});