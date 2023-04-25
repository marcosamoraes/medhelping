@extends('admin.layouts.app')
 
@section('title', 'Editar Usuário')
 
@section('content')
	<!-- Main Content-->
	<div class="main-content side-content pt-0">

		<div class="main-container container-fluid">
			<div class="inner-body">

				<!-- Page Header -->
				<div class="page-header">
					<div>
						<h2 class="main-content-title tx-24 mg-b-5">Editar Usuário</h2>
						<ol class="breadcrumb">
							<li class="breadcrumb-item"><a href="{{route('admin.users.index')}}">Usuários</a></li>
							<li class="breadcrumb-item active" aria-current="page">Editar</li>
						</ol>
					</div>
				</div>
				<!-- End Page Header -->

				<!-- Row -->
				<div class="row row-sm">
					<div class="col-lg-12 col-md-12 col-md-12">
						<form id="mainForm" action="{{route('admin.users.update', $user->id)}}" method="post" enctype="multipart/form-data">
							@csrf
							{{ method_field('PUT') }}
							<div class="card custom-card">
								<div class="card-body">
									<div class="form-group">
										<label class="tx-medium">Nome</label>
										<input type="text" class="form-control" placeholder="Nome" name="name" value="{{$user->user_name}}" readonly>
									</div>
									<div class="form-group">
										<label class="tx-medium">E-mail</label>
										<input type="email" class="form-control" placeholder="E-mail" name="email" value="{{$user->email}}" readonly>
									</div>
									<div class="form-group">
										<label class="tx-medium">Idade</label>
										<input type="text" class="form-control" placeholder="Idade" name="age" value="{{$user->age}}">
									</div>
									<div class="form-group">
										<label class="tx-medium">Endereço</label>
										<input type="text" class="form-control" placeholder="Endereço" name="address" value="{{$user->address}}">
									</div>
									<div class="form-group">
										<label class="tx-medium">Cidade</label>
										<input type="text" class="form-control" placeholder="Cidade" name="city" value="{{$user->city}}" readonly>
									</div>
									<div class="form-group">
										<label class="tx-medium">Faculdade</label>
										<input type="text" class="form-control" placeholder="Faculdade" name="college" value="{{$user->college}}">
									</div>
									<div class="form-group">
										<label class="tx-medium">Ano de formatura</label>
										<input type="text" class="form-control" placeholder="Ano de formatura" name="college_year" value="{{$user->college_year}}">
									</div>
									<div class="form-group">
										<label class="tx-medium">CRM</label>
										<input type="text" class="form-control" placeholder="CRM" name="crm" value="{{$user->crm}}">
									</div>
									<div class="form-group">
										<label class="tx-medium">Área de ocupação</label>
										<input type="text" class="form-control" placeholder="Área de ocupação" name="occupation_area" value="{{$user->occupation_area}}">
									</div>
									<div class="form-group">
										<label class="tx-medium">Especialidades</label>
										<input type="text" class="form-control" placeholder="Especialidades" name="specialties" value="{{$user->specialties}}">
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