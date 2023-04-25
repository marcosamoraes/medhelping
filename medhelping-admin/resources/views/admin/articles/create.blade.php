@extends('admin.layouts.app')

@section('title', 'Cadastrar Artigo')

@section('content')
	<!-- Main Content-->
	<div class="main-content side-content pt-0">

		<div class="main-container container-fluid">
			<div class="inner-body">

				<!-- Page Header -->
				<div class="page-header">
					<div>
						<h2 class="main-content-title tx-24 mg-b-5">Cadastrar Artigo</h2>
						<ol class="breadcrumb">
							<li class="breadcrumb-item"><a href="{{route('admin.artigos.index')}}">Artigos</a></li>
							<li class="breadcrumb-item active" aria-current="page">Cadastrar</li>
						</ol>
					</div>
				</div>
				<!-- End Page Header -->

				<!-- Row -->
				<div class="row row-sm">
					<div class="col-lg-12 col-md-12 col-md-12">
						<form id="mainForm" action="{{route('admin.artigos.store')}}" method="post" enctype="multipart/form-data">
							@csrf
							<div class="card custom-card">
								<div class="card-body">
									<div class="form-group">
										<label class="tx-medium">Nome</label>
										<input type="text" class="form-control" placeholder="Nome" name="user_name" required>
									</div>
									<div class="form-group">
										<label class="tx-medium">Título</label>
										<input type="text" class="form-control" placeholder="Título" name="title" required>
									</div>
									<div class="form-group">
										<label class="tx-medium">Imagem</label>
										<input type="file" name="image" class="fancyUpload" accept="image/jpeg, image/jpg, image/png">
									</div>
									<div class="ql-wrapper ql-wrapper-demo mb-3">
										<label class="tx-medium">Conteúdo</label>
										<textarea class="form-control" name="content" required></textarea>
									</div>
									<div class="form-group">
										<label class="tx-medium">Categorias</label>
										<div>
											<input type="checkbox" name="type[]" id="Emergência" value="Emergência" checked>
											<label for="Emergência">Emergência</label>
										</div>
										<div>
											<input type="checkbox" name="type[]" id="Clín Médica" value="Clín Médica">
											<label for="Clín Médica">Clín Médica</label>
										</div>
										<div>
											<input type="checkbox" name="type[]" id="Cirurgia" value="Cirurgia">
											<label for="Cirurgia">Cirurgia</label>
										</div>
										<div>
											<input type="checkbox" name="type[]" id="Cardiologia" value="Cardiologia">
											<label for="Cardiologia">Cardiologia</label>
										</div>
										<div>
											<input type="checkbox" name="type[]" id="Pediatria" value="Pediatria">
											<label for="Pediatria">Pediatria</label>
										</div>
										<div>
											<input type="checkbox" name="type[]" id="Ortopedia" value="Ortopedia">
											<label for="Ortopedia">Ortopedia</label>
										</div>
										<div>
											<input type="checkbox" name="type[]" id="Neurologia" value="Neurologia">
											<label for="Neurologia">Neurologia</label>
										</div>
										<div>
											<input type="checkbox" name="type[]" id="G.O" value="G.O">
											<label for="G.O">G.O</label>
										</div>
										<div>
											<input type="checkbox" name="type[]" id="Ambulatorial" value="Ambulatorial">
											<label for="Ambulatorial">Ambulatorial</label>
										</div>
										<div>
											<input type="checkbox" name="type[]" id="Outros" value="Outros">
											<label for="Outros">Outros</label>
										</div>
										<div>
											<input type="checkbox" name="type[]" id="Projetos" value="Projetos">
											<label for="Projetos">Projetos</label>
										</div>
								</div>
								<div class="card-footer mb-1">
									<button type="submit" class="btn btn-primary">Cadastrar</a>
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