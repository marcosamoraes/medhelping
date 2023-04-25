<!DOCTYPE html>
<html lang="en">
	<head>

		<meta charset="utf-8">
		<meta content="width=device-width, initial-scale=1, shrink-to-fit=no" name="viewport">
		<meta name="description" content="Spruha -  Admin Panel HTML Dashboard Template">
		<meta name="author" content="Spruko Technologies Private Limited">
		<meta name="keywords" content="admin,dashboard,panel,bootstrap admin template,bootstrap dashboard,dashboard,themeforest admin dashboard,themeforest admin,themeforest dashboard,themeforest admin panel,themeforest admin template,themeforest admin dashboard,cool admin,it dashboard,admin design,dash templates,saas dashboard,dmin ui design">

		<!-- Favicon -->
		<link rel="icon" href="{{ env('APP_URL')}}/assets/img/brand/favicon.ico" type="image/x-icon"/>

		<!-- Title -->
    	<title>{{ env('APP_NAME') }} - @yield('title')</title>

		<meta name="csrf-token" content="{{ csrf_token() }}" />
		<!-- Bootstrap css-->
		<link  id="style" href="{{ env('APP_URL')}}/assets/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet"/>

		<!-- Icons css-->
		<link href="{{ env('APP_URL')}}/assets/plugins/web-fonts/icons.css" rel="stylesheet"/>
		<link href="{{ env('APP_URL')}}/assets/plugins/web-fonts/font-awesome/font-awesome.min.css" rel="stylesheet">
		<link href="{{ env('APP_URL')}}/assets/plugins/web-fonts/plugin.css" rel="stylesheet"/>

		<!-- Style css-->
		<link href="{{ env('APP_URL')}}/assets/css/style.css" rel="stylesheet">

		<!-- Owl-carousel css-->
		<link href="{{ env('APP_URL')}}/assets/plugins/owl-carousel/owl.carousel.css" rel="stylesheet" />

		<!-- Select2 css-->
		<link href="{{ env('APP_URL')}}/assets/plugins/select2/css/select2.min.css" rel="stylesheet">

		<!-- Mutipleselect css-->
		<link rel="stylesheet" href="{{ env('APP_URL')}}/assets/plugins/multipleselect/multiple-select.css">

		<!-- DATA TABLE CSS -->
		<link href="{{ env('APP_URL')}}/assets/plugins/datatable/css/dataTables.bootstrap5.css" rel="stylesheet" />
		<link href="{{ env('APP_URL')}}/assets/plugins/datatable/css/buttons.bootstrap5.min.css"  rel="stylesheet">
		<link href="{{ env('APP_URL')}}/assets/plugins/datatable/css/responsive.bootstrap5.css" rel="stylesheet" />

		<!-- Internal Summernote css-->
		<link rel="stylesheet" href="{{ env('APP_URL')}}/assets/plugins/summernote-editor/summernote.css">
		<link rel="stylesheet" href="{{ env('APP_URL')}}/assets/plugins/summernote-editor/summernote1.css">

		<!-- InternalFancy uploader css-->
		<link href="{{ env('APP_URL')}}/assets/plugins/fancyuploder/fancy_fileupload.css" rel="stylesheet" />

		<!-- Mutipleselect css-->
		<link rel="stylesheet" href="{{ env('APP_URL')}}/assets/plugins/multipleselect/multiple-select.css">

		<!-- InternalFileupload css-->
		<link href="{{ env('APP_URL')}}/assets/plugins/fileuploads/css/fileupload.css" rel="stylesheet" type="text/css"/>

		<!-- Jquery js-->
		<script src="{{ env('APP_URL')}}/assets/plugins/jquery/jquery.min.js"></script>

		<script type="text/javascript">
			let APP_URL = '{{ env('APP_URL')}}';
		</script>
	</head>

	<body class="ltr main-body leftmenu">

	@foreach ($errors->all() as $error)
		<div class="alert alert-solid-danger mg-b-0" role="alert" style="z-index: 999999;">
			<button aria-label="Close" class="btn-close" data-bs-dismiss="alert" type="button">
			<span aria-hidden="true">&times;</span></button>
			{{ $error }}
		</div>
	@endforeach

	@if (session('success'))
		<div class="alert alert-solid-success mg-b-0" role="alert" style="z-index: 999999;">
			<button aria-label="Close" class="btn-close" data-bs-dismiss="alert" type="button">
			<span aria-hidden="true">&times;</span></button>
			{{ session('success') }}
		</div>
	@endif


	<!-- Loader -->
	<div id="global-loader">
		<img src="{{ env('APP_URL')}}/assets/img/loader.svg" class="loader-img" alt="Loader">
	</div>
	<!-- End Loader -->

	<!-- Page -->
	<div class="page">

		@include('admin/elements/head')

		@include('admin/elements/sidemenu')

        @yield('content')

		@include('admin/elements/footer')

		<script type="text/javascript">
			$(document).ready(function() {
				setTimeout(function() {
					$('.alert').slideUp();
				}, 3000);
			});
		</script>

	</div>
		<!-- End Page -->

		<!-- Back-to-top -->
		<a href="#top" id="back-to-top"><i class="fe fe-arrow-up"></i></a>

		<!-- Bootstrap js-->
		<script src="{{ env('APP_URL')}}/assets/plugins/bootstrap/js/popper.min.js"></script>
		<script src="{{ env('APP_URL')}}/assets/plugins/bootstrap/js/bootstrap.min.js"></script>

		<!-- Internal Chart.Bundle js-->
		<script src="{{ env('APP_URL')}}/assets/plugins/chart.js/Chart.bundle.min.js"></script>

		<!-- Peity js-->
		<script src="{{ env('APP_URL')}}/assets/plugins/peity/jquery.peity.min.js"></script>

		<!-- Select2 js-->
		<script src="{{ env('APP_URL')}}/assets/plugins/select2/js/select2.min.js"></script>
		<script src="{{ env('APP_URL')}}/assets/js/select2.js"></script>

		<!-- Internal Blog Post js-->
		<script src="{{ env('APP_URL')}}/assets/js/blog-post.js"></script>

		<!-- INTERNAL Summernote Editor js -->
		<script src="{{ env('APP_URL')}}/assets/plugins/summernote-editor/summernote1.js"></script>
		<script src="{{ env('APP_URL')}}/assets/js/summernote.js"></script>

		<!--Internal Fancy uploader js-->
		<script src="{{ env('APP_URL')}}/assets/plugins/fancyuploder/jquery.ui.widget.js"></script>
		<script src="{{ env('APP_URL')}}/assets/plugins/fancyuploder/jquery.fileupload.js"></script>
		<script src="{{ env('APP_URL')}}/assets/plugins/fancyuploder/jquery.iframe-transport.js"></script>
		<script src="{{ env('APP_URL')}}/assets/plugins/fancyuploder/jquery.fancy-fileupload.js"></script>
		<script src="{{ env('APP_URL')}}/assets/plugins/fancyuploder/fancy-uploader.js"></script>

		<!-- Perfect-scrollbar js -->
		<script src="{{ env('APP_URL')}}/assets/plugins/perfect-scrollbar/perfect-scrollbar.min.js"></script>

		<!-- Sidemenu js -->
		<script src="{{ env('APP_URL')}}/assets/plugins/sidemenu/sidemenu.js" id="leftmenu"></script>

		<!-- Sidebar js -->
		<script src="{{ env('APP_URL')}}/assets/plugins/sidebar/sidebar.js"></script>

		<!-- Internal Data Table js -->
		<script src="{{ env('APP_URL')}}/assets/plugins/datatable/js/jquery.dataTables.min.js"></script>
		<script src="{{ env('APP_URL')}}/assets/plugins/datatable/js/dataTables.bootstrap5.js"></script>
		<script src="{{ env('APP_URL')}}/assets/plugins/datatable/js/dataTables.buttons.min.js"></script>
		<script src="{{ env('APP_URL')}}/assets/plugins/datatable/js/buttons.bootstrap5.min.js"></script>
		<script src="{{ env('APP_URL')}}/assets/plugins/datatable/js/jszip.min.js"></script>
		<script src="{{ env('APP_URL')}}/assets/plugins/datatable/pdfmake/pdfmake.min.js"></script>
		<script src="{{ env('APP_URL')}}/assets/plugins/datatable/pdfmake/vfs_fonts.js"></script>
		<script src="{{ env('APP_URL')}}/assets/plugins/datatable/js/buttons.html5.min.js"></script>
		<script src="{{ env('APP_URL')}}/assets/plugins/datatable/js/buttons.print.min.js"></script>
		<script src="{{ env('APP_URL')}}/assets/plugins/datatable/js/buttons.colVis.min.js"></script>
		<script src="{{ env('APP_URL')}}/assets/plugins/datatable/dataTables.responsive.min.js"></script>
		<script src="{{ env('APP_URL')}}/assets/plugins/datatable/responsive.bootstrap5.min.js"></script>
		<script src="{{ env('APP_URL')}}/assets/js/table-data.js"></script>

		<!-- Internal Fileuploads js-->
		<script src="{{ env('APP_URL')}}/assets/plugins/fileuploads/js/fileupload.js"></script>
        <script src="{{ env('APP_URL')}}/assets/plugins/fileuploads/js/file-upload.js"></script>

		<!-- Color Theme js -->
		<script src="{{ env('APP_URL')}}/assets/js/themeColors.js"></script>

		<!-- Sticky js -->
		<script src="{{ env('APP_URL')}}/assets/js/sticky.js"></script>

		<!-- Jquery Mask js -->
		<script src="{{ env('APP_URL')}}/assets/js/jquery.mask.min.js"></script>

		<!-- Custom js -->
		<script src="{{ env('APP_URL')}}/assets/js/custom.js"></script>

	</body>
</html>