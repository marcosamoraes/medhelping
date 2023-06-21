<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Editar artigo {{ $article->id }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                <div>
                    <section>
                        <form method="post" action="{{ route('articles.update', $article->id) }}" class="mt-6 space-y-6 flex flex-wrap gap-3">
                            @csrf

                            <div class="w-[32%]">
                                <x-input-label for="title" value="Título" />
                                <x-text-input id="title" name="title" type="text" class="mt-1 block w-full" :value="old('title', $article->title)" required autofocus autocomplete="title" />
                                <x-input-error class="mt-2" :messages="$errors->get('title')" />
                            </div>

                            <div class="w-[32%]">
                                <x-input-label for="image" value="Imagem" />
                                <x-file-input id="image" name="image" :value="old('image')" required autofocus autocomplete="image" />
                                <x-input-error class="mt-2" :messages="$errors->get('image')" />
                            </div>

                            <div class="w-[32%]">
                                <x-input-label value="Preview" />
                                <img src="{{ asset('/images/logo.png') }}" alt="">
                            </div>

                            <div class="w-[32%]">
                                <x-input-label for="category1" value="Categoria 1" />
                                <x-select-input id="category1" name="category1" type="text" class="mt-1 block w-full" required autofocus autocomplete="category1">
                                    <option value="" readonly>Selecione uma categoria...</option>
                                    @foreach ($categories as $id => $category)
                                        <option value="{{ $id }}" {{ old('category1', $article->categories[0]->id) === $id ? 'selected' : false }}>{{ $category }}</option>
                                    @endforeach
                                </x-select-input>
                                <x-input-error class="mt-2" :messages="$errors->get('category1')" />
                            </div>

                            <div class="w-[32%]">
                                <x-input-label for="category2" value="Categoria 2" />
                                <x-select-input id="category2" name="category2" type="text" class="mt-1 block w-full" autofocus autocomplete="category2">
                                    <option value="" readonly>Selecione uma categoria...</option>
                                    @foreach ($categories as $id => $category)
                                        <option value="{{ $id }}" {{ old('category2', isset($article->categories[1]) ? $article->categories[1]->id : null) === $id ? 'selected' : false }}>{{ $category }}</option>
                                    @endforeach
                                </x-select-input>
                                <x-input-error class="mt-2" :messages="$errors->get('category2')" />
                            </div>

                            <div class="w-[32%]">
                                <x-input-label for="category3" value="Categoria 3" />
                                <x-select-input id="category3" name="category3" type="text" class="mt-1 block w-full" autofocus autocomplete="category3">
                                    <option value="" readonly>Selecione uma categoria...</option>
                                    @foreach ($categories as $id => $category)
                                        <option value="{{ $id }}" {{  old('category3', isset($article->categories[2]) ? $article->categories[2]->id : null) === $id ? 'selected' : false }}>{{ $category }}</option>
                                    @endforeach
                                </x-select-input>
                                <x-input-error class="mt-2" :messages="$errors->get('category3')" />
                            </div>

                            <div class="w-full">
                                <x-input-label for="description" value="Descrição" />
                                <x-text-area-input id="description" name="description" type="text" class="mt-1 block w-full" required autofocus autocomplete="description">
                                    {{ old('description', $article->description) }}
                                </x-text-area-input>
                                <x-input-error class="mt-2" :messages="$errors->get('description')" />
                            </div>

                            <div class="flex items-center gap-4 w-full">
                                <x-primary-button>{{ __('Save') }}</x-primary-button>

                                @if (session('status') === 'article-created')
                                    <p
                                        x-data="{ show: true }"
                                        x-show="show"
                                        x-transition
                                        x-init="setTimeout(() => show = false, 2000)"
                                        class="text-sm text-gray-600"
                                    >{{ __('Saved.') }}</p>
                                @endif
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
