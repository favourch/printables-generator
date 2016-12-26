import $ from "jquery"

export function showMessage(type, message) {
	$('#notifications .alert').addClass('alert-'+type)
	type += '!';
	$('#notifications .alert-type').text(type);
	$('#notifications .alert-message').text(message);
	$('#notifications').show();
	$('#notifications').on('click', function() {
		$(this).hide();
	})
}