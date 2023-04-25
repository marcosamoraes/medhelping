@extends('admin.layouts.app')
 
@section('title', 'Visualizar Usuário')
 
@section('content')
	<!-- Main Content-->
	<div class="main-content side-content pt-0">

		<div class="main-container container-fluid">
			<div class="inner-body">

				<!-- Page Header -->
				<div class="page-header">
					<div>
						<h2 class="main-content-title tx-24 mg-b-5">Visualizar Usuário</h2>
						<ol class="breadcrumb">
							<li class="breadcrumb-item"><a href="{{route('admin.users.index')}}">Usuários</a></li>
							<li class="breadcrumb-item active" aria-current="page">Visualizar</li>
						</ol>
					</div>
				</div>
				<!-- End Page Header -->

				<!-- Row -->
				<div class="row row-sm">
					<div class="col-lg-12 col-md-12 col-md-12">
            <div class="card custom-card">
              <div class="card-body">
                <div class="form-group">
                  <label class="tx-medium">Nome</label>
                  <input type="text" class="form-control" name="name" value="{{$user->name}}" readonly>
                </div>
                <div class="form-group">
                  <label class="tx-medium">E-mail</label>
                  <input type="email" class="form-control" name="email" value="{{$user->email}}" readonly>
                </div>
                <div class="form-group">
                  <label class="tx-medium">Idade</label>
                  <input type="text" class="form-control" name="age" value="{{$user->age}}" readonly>
                </div>
                <div class="form-group">
                  <label class="tx-medium">Endereço</label>
                  <input type="text" class="form-control" name="address" value="{{$user->address}}" readonly>
                </div>
                <div class="form-group">
                  <label class="tx-medium">Cidade</label>
                  <input type="text" class="form-control" name="city" value="{{$user->city}}" readonly>
                </div>
                <div class="form-group">
                  <label class="tx-medium">Faculdade</label>
                  <input type="text" class="form-control" name="college" value="{{$user->college}}" readonly>
                </div>
                <div class="form-group">
                  <label class="tx-medium">Ano de formatura</label>
                  <input type="text" class="form-control" name="college_year" value="{{$user->college_year}}" readonly>
                </div>
                <div class="form-group">
                  <label class="tx-medium">CRM</label>
                  <input type="text" class="form-control" name="crm" value="{{$user->crm}}" readonly>
                </div>
                <div class="form-group">
                  <label class="tx-medium">Área de ocupação</label>
                  <input type="text" class="form-control" name="occupation_area" value="{{$user->occupation_area}}" readonly>
                </div>
                <div class="form-group">
                  <label class="tx-medium">Especialidades</label>
                  <input type="text" class="form-control" name="specialties" value="{{$user->specialties}}" readonly>
                </div>
                <div class="form-group">
                  <label class="tx-medium">Número de likes</label>
                  <input type="number" class="form-control" name="likes" value="{{$user->likes}}" readonly>
                </div>
              </div>
            </div>
					</div>
				</div>
				<!-- End Row -->

			</div>
		</div>
	</div>
	<!-- End Main Content-->
@endsection