@extends('admin.layouts.app')
 
@section('title', 'Meus Dados')
 
@section('content')
	<!-- Main Content-->
	<div class="main-content side-content pt-0">

		<div class="main-container container-fluid">
			<div class="inner-body">

				<!-- Page Header -->
				<div class="page-header">
					<div>
						<h2 class="main-content-title tx-24 mg-b-5">Meus Dados</h2>
					</div>
				</div>
				<!-- End Page Header -->

				<!-- Row -->
				<div class="row row-sm">
					<div class="col-lg-12 col-md-12 col-md-12">
						<form action="{{route('admin.settings.save')}}" method="post" enctype="multipart/form-data">
							@csrf
							{{ method_field('PUT') }}
							<div class="card custom-card">
								<div class="card-body">
									<div class="form-group">
										<label class="tx-medium">Nome</label>
										<input type="text" class="form-control" placeholder="Nome" name="name" value="{{Auth::user()->name}}" required>
									</div>
									<div class="form-group">
										<label class="tx-medium">E-mail</label>
										<input type="email" class="form-control" placeholder="E-mail" name="email" value="{{Auth::user()->email}}" required>
									</div>
									<div class="form-group">
										<label class="tx-medium">Senha</label>
										<input type="password" class="form-control" placeholder="Senha" name="password">
									</div>
									<label class="tx-medium">Imagem</label>
									<div class="row mb-4">
										<div class="col-sm-12 col-md-4">
											<input type="file" class="dropify" data-height="200" name="image" data-default-file="{{env('APP_URL')}}/images/{{Auth::user()->image}}"/>
										</div>
									</div>
								</div>
								<div class="card-footer mb-1">
									<button type="submit" class="btn btn-primary">Editar</a>
								</div>
							</div>
						</form>
					</div>
				</div>
				<!-- End Row -->

			</div>
		</div>
	</div>
	<!-- End Main Content-->
@endsection