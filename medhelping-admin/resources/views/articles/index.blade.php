<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Artigos
        </h2>
        <x-primary-button><a href="{{ route('articles.create') }}">Cadastrar</a></x-primary-button>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="overflow-hidden overflow-x-auto p-6 bg-white border-b border-gray-200">
                    <div class="min-w-full align-middle">
                        <form>
                            <x-select-input id="sort" name="sort" type="text" class="mt-1 block w-full" required autofocus autocomplete="sort" onchange="this.form.submit()">
                                <option value="" readonly>Ordenar por...</option>
                                <option value="more_liked" {{ $sort === 'more_liked' ? 'selected' : false }}>Mais curtidos</option>
                                <option value="more_shared" {{ $sort === 'more_shared' ? 'selected' : false }}>Mais compartilhados</option>
                                <option value="more_commented" {{ $sort === 'more_commented' ? 'selected' : false }}>Mais comentados</option>
                            </x-select-input>
                        </form>
                        <table class="min-w-full divide-y divide-gray-200 border mt-5">
                            <thead>
                            <tr>
                                <th class="px-6 py-3 bg-gray-50 text-left">
                                    <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">ID</span>
                                </th>
                                <th class="px-6 py-3 bg-gray-50 text-left">
                                    <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Usuário</span>
                                </th>
                                <th class="px-6 py-3 bg-gray-50 text-left">
                                    <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Título</span>
                                </th>
                                <th class="px-6 py-3 bg-gray-50 text-left">
                                    <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Categorias</span>
                                </th>
                                <th class="px-6 py-3 bg-gray-50 text-left">
                                    <span class="text-xs leading-4 font-medium text-gray-500 text-center uppercase tracking-wider">Likes</span>
                                </th>
                                <th class="px-6 py-3 bg-gray-50 text-left">
                                    <span class="text-xs leading-4 font-medium text-gray-500 text-center uppercase tracking-wider">Compartilhamentos</span>
                                </th>
                                <th class="px-6 py-3 bg-gray-50 text-left">
                                    <span class="text-xs leading-4 font-medium text-gray-500 text-center uppercase tracking-wider">Comentários</span>
                                </th>
                                <th class="px-6 py-3 bg-gray-50 text-left">
                                    <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Data de criação</span>
                                </th>
                                <th class="px-6 py-3 bg-gray-50 text-left">
                                    <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Ações</span>
                                </th>
                            </tr>
                            </thead>

                            <tbody class="bg-white divide-y divide-gray-200 divide-solid">
                            @foreach($articles as $article)
                                <tr class="bg-white">
                                    <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                        {{ $article->id }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                        @if ($article->user)
                                            <a href="/users/{{ $article->user->id }}" class="text-blue-500 hover:text-blue-600">
                                                {{ $article->user->name }}{{ $article->anonymous_publication ? ' (anônimo)' : '' }}
                                            </a>
                                        @else
                                            Admin
                                        @endif
                                    </td>
                                    <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                        {{ $article->title }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                        @if ($article->categories->count() > 0)
                                            {{ $article->categories->pluck('name')->join(', ') }}
                                        @else
                                            -
                                        @endif
                                    </td>
                                    <td class="px-6 py-4 whitespace-no-wrap text-sm text-center leading-5 text-gray-900">
                                        {{ $article->likes }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-no-wrap text-sm text-center leading-5 text-gray-900">
                                        {{ $article->quantity_shared }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-no-wrap text-sm text-center leading-5 text-gray-900">
                                        {{ $article->comments->count() }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                        {{ $article->created_at->format('d/m/Y H:i:s') }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900 flex gap-3">
                                        <a href="{{ route('articles.edit', $article->id) }}">
                                            <x-warning-button>
                                                <i class="fas fa-edit"></i>
                                            </x-warning-button>
                                        </a>
                                        <form method="POST" action="{{ route('articles.destroy', $article->id) }}">
                                            @csrf
                                            @method('DELETE')
                                            <x-danger-button onclick="if (!confirm('Você tem certeza que quer deletar?')) return false">
                                                <i class="fas fa-trash"></i>
                                            </x-danger-button>
                                        </form>
                                    </td>
                                </tr>
                            @endforeach
                            </tbody>
                        </table>
                    </div>

                    <div class="mt-2">
                        {{ $articles->links() }}
                    </div>

                </div>
            </div>
        </div>
    </div>
</x-app-layout>
