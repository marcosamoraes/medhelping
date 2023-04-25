@extends('admin.layouts.app')

@section('title', 'Editar Artigo')

@section('content')
	<!-- Main Content-->
	<div class="main-content side-content pt-0">

		<div class="main-container container-fluid">
			<div class="inner-body">

				<!-- Page Header -->
				<div class="page-header">
					<div>
						<h2 class="main-content-title tx-24 mg-b-5">Editar Artigo</h2>
						<ol class="breadcrumb">
							<li class="breadcrumb-item"><a href="{{route('admin.artigos.index')}}">Artigos</a></li>
							<li class="breadcrumb-item active" aria-current="page">Editar</li>
						</ol>
					</div>
				</div>
				<!-- End Page Header -->

				<!-- Row -->
				<div class="row row-sm">
					<div class="col-lg-12 col-md-12 col-md-12">
						<form id="mainForm" action="{{route('admin.artigos.update', $article->id)}}" method="post" enctype="multipart/form-data">
							@csrf
							{{ method_field('PUT') }}
							<div class="card custom-card">
								<div class="card-body">
									<div class="form-group">
										<label class="tx-medium">Nome</label>
										<input type="text" class="form-control" placeholder="Nome" name="user_name" value="{{$article->user_name}}" required>
									</div>
									<div class="form-group">
										<label class="tx-medium">Título</label>
										<input type="text" class="form-control" placeholder="Título" name="title" value="{{$article->title}}" required>
									</div>
									<div class="form-group">
										<label class="tx-medium">Imagem</label>
										<input type="file" name="image" class="fancyUpload" accept="image/jpeg, image/jpg, image/png">
										<img src="{{$article->image}}">
									</div>
									<div class="ql-wrapper ql-wrapper-demo mb-3">
										<label class="tx-medium">Conteúdo</label>
										<textarea class="form-control" name="content" required>{{$article->content}}</textarea>
									</div>
									<div class="form-group">
										<label class="tx-medium">Categorias</label>
										@php
											$categories = explode(',', $article->type);
										@endphp
										<div>
											<input type="checkbox" name="type[]" id="Emergência" value="Emergência" {{in_array('Emergência', $categories) ? 'checked' : false}}>
											<label for="Emergência">Emergência</label>
										</div>
										<div>
											<input type="checkbox" name="type[]" id="Clín Médica" value="Clín Médica" {{in_array('Clín Médica', $categories) ? 'checked' : false}}>
											<label for="Clín Médica">Clín Médica</label>
										</div>
										<div>
											<input type="checkbox" name="type[]" id="Cirurgia" value="Cirurgia" {{in_array('Cirurgia', $categories) ? 'checked' : false}}>
											<label for="Cirurgia">Cirurgia</label>
										</div>
										<div>
											<input type="checkbox" name="type[]" id="Cardiologia" value="Cardiologia" {{in_array('Cardiologia', $categories) ? 'checked' : false}}>
											<label for="Cardiologia">Cardiologia</label>
										</div>
										<div>
											<input type="checkbox" name="type[]" id="Pediatria" value="Pediatria" {{in_array('Pediatria', $categories) ? 'checked' : false}}>
											<label for="Pediatria">Pediatria</label>
										</div>
										<div>
											<input type="checkbox" name="type[]" id="Ortopedia" value="Ortopedia" {{in_array('Ortopedia', $categories) ? 'checked' : false}}>
											<label for="Ortopedia">Ortopedia</label>
										</div>
										<div>
											<input type="checkbox" name="type[]" id="Neurologia" value="Neurologia" {{in_array('Neurologia', $categories) ? 'checked' : false}}>
											<label for="Neurologia">Neurologia</label>
										</div>
										<div>
											<input type="checkbox" name="type[]" id="G.O" value="G.O" {{in_array('G.O', $categories) ? 'checked' : false}}>
											<label for="G.O">G.O</label>
										</div>
										<div>
											<input type="checkbox" name="type[]" id="Ambulatorial" value="Ambulatorial" {{in_array('Ambulatorial', $categories) ? 'checked' : false}}>
											<label for="Ambulatorial">Ambulatorial</label>
										</div>
										<div>
											<input type="checkbox" name="type[]" id="Outros" value="Outros" {{in_array('Outros', $categories) ? 'checked' : false}}>
											<label for="Outros">Outros</label>
										</div>
										<div>
											<input type="checkbox" name="type[]" id="Outros" value="Projetos" {{in_array('Projetos', $categories) ? 'checked' : false}}>
											<label for="Projetos">Projetos</label>
										</div>
									</div>
									<div class="form-group">
										<label class="tx-medium">Ativo</label>
										<select class="form-control" name="active" required>
											<option value="1">Sim</option>
											<option value="0">Não</option>
										</select>
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