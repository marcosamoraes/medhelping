<!DOCTYPE html>
<html>
<head>
    <title>MedHelping</title>
</head>
<body>
    <h1>Novo artigo publicado</h1>
    <div class="form-group">
      <label class="tx-medium">Título: {{$mailData['title']}}</label>
    </div>
    <div class="form-group">
      <label class="tx-medium">Descrição: {{$mailData['content']}}</label>
    </div>
    <div class="form-group">
      <label class="tx-medium">Arquivo: <img src="{{$mailData['image']}}" alt=""></label>
    </div>
</body>
</html>