@extends('admin.layouts.app')
 
@section('title', 'Dashboard')
 
@section('content')

	<!-- Main Content-->
	<div class="main-content side-content pt-0">

		<div class="main-container container-fluid">
			<div class="inner-body">

				<!-- Page Header -->
				<div class="page-header">
					<div>
						<h2 class="main-content-title tx-24 mg-b-5">Dashboard</h2>
					</div>
				</div>
				<!-- End Page Header -->

				<!-- Row -->
				<div class="row row-sm">
					<div class="col-sm-12 col-md-6 col-lg-6 col-xl-4">
						<div class="card custom-card">
							<div class="card-body">
								<div class="card-order">
									<label class="main-content-label mb-3 pt-1">Artigos</label>
									<h2 class="text-end"><i class="mdi mdi-cube icon-size float-start text-primary"></i><span class="font-weight-bold">{{$qtd_articles}}</span></h2>
								</div>
							</div>
						</div>
					</div>
					<!-- COL END -->
				</div>
				<!-- End Row -->
			</div>
		</div>
	</div>
	<!-- End Main Content-->

@endsection