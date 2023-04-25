@extends('admin.layouts.app')
 
@section('title', 'Visualizar Artigo')
 
@section('content')
	<!-- Main Content-->
	<div class="main-content side-content pt-0">

		<div class="main-container container-fluid">
			<div class="inner-body">

				<!-- Page Header -->
				<div class="page-header">
					<div>
						<h2 class="main-content-title tx-24 mg-b-5">Visualizar Artigo</h2>
						<ol class="breadcrumb">
							<li class="breadcrumb-item"><a href="{{route('admin.artigos.index')}}">Artigos</a></li>
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
									<input type="text" class="form-control" placeholder="Nome" name="user_name" value="{{$article->user_name}}" required>
								</div>
								<div class="form-group">
									<label class="tx-medium">Título</label>
									<input type="text" class="form-control" placeholder="Título" name="title" value="{{$article->title}}" required>
								</div>
								<div class="ql-wrapper ql-wrapper-demo mb-3">
									<label class="tx-medium">Conteúdo</label>
									<textarea id="summernote" name="content" required>{!!$article->content!!}</textarea>
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
										<input type="checkbox" name="type[]" id="Cardiologia" value="Cardiologia" {{in_array('Cardiologia', $categories) ? 'checked' : false}}>
										<label for="Cardiologia">Cardiologia</label>
									</div>
									<div>
										<input type="checkbox" name="type[]" id="Clín Médica" value="Clín Médica" {{in_array('Clín Médica', $categories) ? 'checked' : false}}>
										<label for="Clín Médica">Clín Médica</label>
									</div>
									<div>
										<input type="checkbox" name="type[]" id="Pediatria" value="Pediatria" {{in_array('Pediatria', $categories) ? 'checked' : false}}>
										<label for="Pediatria">Pediatria</label>
									</div>
									<div>
										<input type="checkbox" name="type[]" id="Cirurgia" value="Cirurgia" {{in_array('Cirurgia', $categories) ? 'checked' : false}}>
										<label for="Cirurgia">Cirurgia</label>
									</div>
									<div>
										<input type="checkbox" name="type[]" id="G.O" value="G.O" {{in_array('G.O', $categories) ? 'checked' : false}}>
										<label for="G.O">G.O</label>
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
										<input type="checkbox" name="type[]" id="Endócrino" value="Endócrino" {{in_array('Endócrino', $categories) ? 'checked' : false}}>
										<label for="Endócrino">Endócrino</label>
									</div>
									<div>
										<input type="checkbox" name="type[]" id="Anestesia" value="Anestesia" {{in_array('Anestesia', $categories) ? 'checked' : false}}>
										<label for="Anestesia">Anestesia</label>
									</div>
									<div>
										<input type="checkbox" name="type[]" id="Pneumologia" value="Pneumologia" {{in_array('Pneumologia', $categories) ? 'checked' : false}}>
										<label for="Pneumologia">Pneumologia</label>
									</div>
									<div>
										<input type="checkbox" name="type[]" id="Ambulatorial" value="Ambulatorial" {{in_array('Ambulatorial', $categories) ? 'checked' : false}}>
										<label for="Ambulatorial">Ambulatorial</label>
									</div>
									<div>
										<input type="checkbox" name="type[]" id="Enfermaria" value="Enfermaria" {{in_array('Enfermaria', $categories) ? 'checked' : false}}>
										<label for="Enfermaria">Enfermaria</label>
									</div>
								</div>
                <div class="form-group">
                  <label class="tx-medium">Número de likes</label>
                  <input type="number" class="form-control" name="likes" value="{{$article->likes}}" readonly>
                </div>
							</div>
						</div>
					</div>
				</div>
				<!-- End Row -->

				@if ($article->comments)
					<!-- Row -->
					<div class="row row-sm">
						<div class="col-lg-12 col-md-12 col-md-12">
							<div class="card custom-card">
								<div class="card-header">
									<h3>Comentários</h3>
								</div>
								<div class="card-body">
									<div class="table-responsive">
										<table class="table">
											<thead>
												<tr>
													<th>Usuário</th>
													<th>Comentário</th>
													<th>Likes</th>
													<th>Data</th>
													<th></th>
												</tr>
											</thead>
											<tbody>
												@foreach($article->comments as $comment)
													<tr class="border-bottom">
														<td class="text-center">
															<a href="{{route('admin.users.index')}}?search={{$comment->user->name}}">
																<img src="{{$comment->user->image}}" class="avatar avatar-sm me-2" alt="" style="margin: auto!important;">
																{{$comment->user->name}}
																@if ($comment->user_name != $comment->user->name) 
																	<br>({{$comment->user_name}}) 
																@endif
															</a>
														</td>
														<td>{{$comment->message}}</td>
														<td>{{$comment->likes}}</td>
														<td>{{date_format($comment->created_at, 'd/m/Y H:i:s')}}</td>
														<td>
															<div class="btn-group" role="group">
																<form method="post" action="{{route('admin.comments.destroy', $comment->id)}}" onsubmit="return confirm('Tem certeza que quer excluir esse comentário?');">
																	@csrf
																		{{ method_field('DELETE') }}
																	<button type="submit" class="btn btn-danger">
																		<i class="fa fa-trash"></i>
																	</button>
																</form>
															</div>
														</td>
													</tr>
													@foreach($comment->reply_comments as $reply_comment)
													<tr class="border-bottom bg-info">
														<td class="text-center">
															<a href="{{route('admin.users.index')}}?search={{$reply_comment->user->name}}" style="color:white!important">
																<img src="{{$reply_comment->user->image}}" class="avatar avatar-sm me-2" alt="" style="margin: auto!important;">
																{{$reply_comment->user->name}}
																@if ($reply_comment->user_name != $reply_comment->user->name) 
																	<br>({{$reply_comment->user_name}}) 
																@endif
															</a>
														</td>
														<td>{{$reply_comment->message}}</td>
														<td>{{$reply_comment->likes}}</td>
														<td>{{date_format($reply_comment->created_at, 'd/m/Y H:i:s')}}</td>
														<td>
															<div class="btn-group" role="group">
																<form method="post" action="{{route('admin.comments.destroy', $reply_comment->id)}}" onsubmit="return confirm('Tem certeza que quer excluir esse comentário?');">
																	@csrf
																		{{ method_field('DELETE') }}
																	<button type="submit" class="btn btn-danger">
																		<i class="fa fa-trash"></i>
																	</button>
																</form>
															</div>
														</td>
													</tr>
													@endforeach
												@endforeach
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- End Row -->
				@endif

			</div>
		</div>
	</div>
	<!-- End Main Content-->
@endsection