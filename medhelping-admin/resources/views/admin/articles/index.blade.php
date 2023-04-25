@extends('admin.layouts.app')
 
@section('title', 'Orçamentos')
 
@section('content')

	<!-- Main Content-->
	<div class="main-content side-content pt-0">

		<div class="main-container container-fluid">
			<div class="inner-body">

				<!-- Page Header -->
				<div class="page-header">
					<div>
						<h2 class="main-content-title tx-24 mg-b-5">Artigos</h2>
					</div>
					<div class="d-flex">
						<div class="justify-content-center">
							<a href="{{route('admin.artigos.create')}}" class="btn btn-primary my-2 btn-icon-text">
							  <i class="fe fe-plus me-2"></i> Cadastrar
							</a>
						</div>
					</div>
				</div>
				<!-- End Page Header -->

				<!-- row -->
				<div class="row row-sm">
					<div class="col-md-12 col-lg-12 col-xl-12">
						<div class="card custom-card transcation-crypto">
							<div class="card-body">
								<div class="table-responsive">
									<table class="table" id="example1">
										<thead>
											<tr>
												<th class="text-center">ID</th>
												<th>Nome</th>
												<th>Título</th>
												<th>Tipo</th>
												<th>Likes</th>
												<th>Data</th>
												<th></th>
											</tr>
										</thead>
										<tbody>
											@foreach($articles as $article)
												<tr class="border-bottom">
													<td>#{{$article->id}}</td>
													<td>
														<a href="{{route('admin.users.index')}}?search={{$article->user->name}}">
															{{$article->user->name}} @if ($article->user_name != $article->user->name) ({{$article->user_name}}) @endif
														</a>
													</td>
													<td>{{$article->title}}</td>
													<td>{{$article->type}}</td>
													<td>{{$article->likes}}</td>
													<td>{{date_format($article->created_at, 'd/m/Y H:i:s')}}</td>
													<td>
														<div class="btn-group" role="group">
															<a href="{{route('admin.artigos.show', $article->id)}}" class="btn btn-primary">
																<i class="fa fa-eye"></i>
															</a>
															<a href="{{route('admin.artigos.edit', $article->id)}}" class="btn btn-warning">
																<i class="fa fa-edit"></i>
															</a>
															<form method="post" action="{{route('admin.artigos.destroy', $article->id)}}" onsubmit="return confirm('Tem certeza que quer excluir esse artigo?');">
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
										</tbody>
									</table>
								</div>
							</div>
						</div>
						<!-- Row End -->
					</div>
				</div>
				<!-- Row End -->
			</div>
		</div>
	</div>
	<!-- End Main Content-->

@endsection