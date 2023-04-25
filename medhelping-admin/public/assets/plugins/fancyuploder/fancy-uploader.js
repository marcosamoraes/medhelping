$(function() {
	//fancyfileuplod
	$('.fancyUpload').FancyFileUpload({
	params : {
		 action : 'fileuploader'
		},
		maxfilesize : 1000000,
		added : function(e, data) {
			this.find('.ff_fileupload_start_upload').click();
		}
	});
});