@extends('admin.layouts.app')
 
@section('title', 'Usuários')
 
@section('content')

	<!-- Main Content-->
	<div class="main-content side-content pt-0">

		<div class="main-container container-fluid">
			<div class="inner-body">

				<!-- Page Header -->
				<div class="page-header">
					<div>
						<h2 class="main-content-title tx-24 mg-b-5">Usuários</h2>
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
												<th>Nome</th>
												<th>E-mail</th>
												<th>Cidade</th>
												<th>Likes</th>
												<th>Data</th>
												<th></th>
											</tr>
										</thead>
										<tbody>
											@foreach($users as $user)
												<tr class="border-bottom">
													<td class="text-center">
                            <img src="{{$user->image}}" class="avatar avatar-sm me-2" alt="" style="margin: auto!important;">
                            {{$user->name}}
                          </td>
													<td>{{$user->email}}</td>
													<td>{{$user->city}}</td>
													<td>{{$user->likes}}</td>
													<td>{{date_format($user->created_at, 'd/m/Y H:i:s')}}</td>
													<td>
														<div class="btn-group" role="group">
															<a href="{{route('admin.users.show', $user->id)}}" class="btn btn-primary">
																<i class="fa fa-eye"></i>
															</a>
															<a href="{{route('admin.users.edit', $user->id)}}" class="btn btn-warning">
																<i class="fa fa-edit"></i>
															</a>
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

	@isset($_GET['search'])
		<script>
			$(document).ready(function() {
				setTimeout(() => {
					$('input[type="search"]').val('{{$_GET["search"]}}').keyup();
				}, 1000);
			});
		</script>
	@endif
@endsection