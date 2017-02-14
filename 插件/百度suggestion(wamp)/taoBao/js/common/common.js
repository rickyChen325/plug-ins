function loadHtml(url, selector) {
	$.ajax({
		url: url,
		async: false,
		success: function(data) {
			$(selector).html(data);
		}
	})
}