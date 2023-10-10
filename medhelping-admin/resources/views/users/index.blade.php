<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Usuários
        </h2>
        <x-primary-button><a href="{{ route('users.export') }}">Exportar</a></x-primary-button>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="overflow-hidden overflow-x-auto p-6 bg-white border-b border-gray-200">
                    <div class="min-w-full align-middle">
                        <form>
                            <x-select-input id="sort" name="sort" type="text" class="mt-1 block w-full" required autofocus autocomplete="sort" onchange="this.form.submit()">
                                <option value="" readonly>Ordenar por...</option>
                                <option value="more_likes" {{ $sort === 'more_likes' ? 'selected' : false }}>Mais curtiram</option>
                                <option value="more_comments" {{ $sort === 'more_comments' ? 'selected' : false }}>Mais comentaram</option>
                            </x-select-input>
                        </form>
                        <table class="min-w-full divide-y mt-3 divide-gray-200 border">
                            <thead>
                            <tr>
                                <th class="px-6 py-3 bg-gray-50 text-left">
                                    <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">ID</span>
                                </th>
                                <th class="px-6 py-3 bg-gray-50 text-left">
                                    <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Nome</span>
                                </th>
                                <th class="px-6 py-3 bg-gray-50 text-left">
                                    <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Whatsapp</span>
                                </th>
                                <th class="px-6 py-3 bg-gray-50 text-left">
                                    <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Cidade</span>
                                </th>
                                <th class="px-6 py-3 bg-gray-50 text-left">
                                    <span class="text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">CRM</span>
                                </th>
                                <th class="px-6 py-3 bg-gray-50 text-left">
                                    <span class="text-xs leading-4 font-medium text-center text-gray-500 uppercase tracking-wider">Likes</span>
                                </th>
                                <th class="px-6 py-3 bg-gray-50 text-left">
                                    <span class="text-xs leading-4 font-medium text-center text-gray-500 uppercase tracking-wider">Comentários</span>
                                </th>
                                <th class="px-6 py-3 bg-gray-50 text-left">
                                    <span class="text-xs leading-4 font-medium text-center text-gray-500 uppercase tracking-wider">Status</span>
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
                            @foreach($users as $user)
                                <tr class="bg-white">
                                    <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                        {{ $user->id }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                        {{ $user->name }}<br />
                                        <small>{{ $user->email }}</small>
                                    </td>
                                    <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                        <a
                                            href="https://wa.me/{{ preg_replace('/\D/', '', $user->whatsapp) }}"
                                            class="text-blue-500 hover:text-blue-600"
                                            target="_blank"
                                        >
                                            {{ $user->whatsapp }}
                                        </a>
                                    </td>
                                    <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                        @if ($user->address)
                                            {{ $user->address->city . '/' . $user->address->state }}
                                        @else
                                            -
                                        @endif
                                    </td>
                                    <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                        @if ($user->infos)
                                            {{ $user->infos->crm }}
                                        @else
                                            -
                                        @endif
                                    </td>
                                    <td class="px-6 py-4 whitespace-no-wrap text-center text-sm leading-5 text-gray-900">
                                        {{ $user->likes }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-no-wrap text-center text-sm leading-5 text-gray-900">
                                        {{ $user->articles_commented }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-no-wrap text-center text-sm leading-5 {{ $user->active ? 'text-green-500' : 'text-red-500' }}">
                                        {{ $user->active ? 'Ativo' : 'Inativo' }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                        {{ $user->created_at->format('d/m/Y H:i:s') }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900 flex gap-3">
                                        <a href="{{ route('users.edit', $user->id) }}">
                                            <x-warning-button>
                                                <i class="fas fa-edit"></i>
                                            </x-warning-button>
                                        </a>
                                        @if ($user->active)
                                            <form method="POST" action="{{ route('users.inactive', $user->id) }}">
                                                @csrf
                                                <x-danger-button>
                                                    <i class="fas fa-times"></i>
                                                </x-danger-button>
                                            </form>
                                        @else
                                            <form method="POST" action="{{ route('users.active', $user->id) }}">
                                                @csrf
                                                <x-primary-button>
                                                    <i class="fas fa-check"></i>
                                                </x-primary-button>
                                            </form>
                                        @endif
                                    </td>
                                </tr>
                            @endforeach
                            </tbody>
                        </table>
                    </div>

                    <div class="mt-2">
                        {{ $users->links() }}
                    </div>

                </div>
            </div>
        </div>
    </div>
</x-app-layout>
