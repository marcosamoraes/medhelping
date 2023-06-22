<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Cadastrar artigo
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                <div>
                    <section>
                        <form method="post" action="{{ route('articles.store') }}" class="mt-6 space-y-6 flex flex-wrap gap-3" enctype="multipart/form-data">
                            @csrf

                            <div class="w-full lg:w-[32%]">
                                <x-input-label for="title" value="Título" />
                                <x-text-input id="title" name="title" type="text" class="mt-1 block w-full" :value="old('title')" required autofocus autocomplete="title" />
                                <x-input-error class="mt-2" :messages="$errors->get('title')" />
                            </div>

                            <div class="w-full lg:w-[64%] flex gap-3" x-data="imageViewer()">
                                <div class="w-full lg:w-1/2">
                                    <x-input-label for="image" value="Imagem" />
                                    <x-file-input id="image" name="image" :value="old('image')" autofocus autocomplete="image" @change="fileChosen" />
                                    <x-input-error class="mt-2" :messages="$errors->get('image')" />
                                </div>

                                <div class="w-full lg:w-1/2">
                                    <x-input-label value="Preview" />
                                    <template x-if="imageUrl">
                                        <img :src="imageUrl" 
                                            class="object-cover rounded border border-gray-200" 
                                            style="width: 100px; height: 100px;"
                                        >
                                    </template>
                                    <!-- Show the gray box when image is not available -->
                                    <template x-if="!imageUrl">
                                        <div 
                                            class="border rounded border-gray-200 bg-gray-100 w-full lg:w-[100px] h-[100px]" 
                                        ></div>
                                    </template>
                                </div>
                            </div>

                            <div class="w-full lg:w-[32%]">
                                <x-input-label for="category1" value="Categoria 1" />
                                <x-select-input id="category1" name="category1" type="text" class="mt-1 block w-full" required autofocus autocomplete="category1">
                                    <option value="" readonly>Selecione uma categoria...</option>
                                    @foreach ($categories as $id => $category)
                                        <option value="{{ $id }}" {{ old('category1') === $id ? 'selected' : false }}>{{ $category }}</option>
                                    @endforeach
                                </x-select-input>
                                <x-input-error class="mt-2" :messages="$errors->get('category1')" />
                            </div>

                            <div class="w-full lg:w-[32%]">
                                <x-input-label for="category2" value="Categoria 2" />
                                <x-select-input id="category2" name="category2" type="text" class="mt-1 block w-full" autofocus autocomplete="category2">
                                    <option value="" readonly>Selecione uma categoria...</option>
                                    @foreach ($categories as $id => $category)
                                        <option value="{{ $id }}" {{ old('category2') === $id ? 'selected' : false }}>{{ $category }}</option>
                                    @endforeach
                                </x-select-input>
                                <x-input-error class="mt-2" :messages="$errors->get('category2')" />
                            </div>

                            <div class="w-full lg:w-[32%]">
                                <x-input-label for="category3" value="Categoria 3" />
                                <x-select-input id="category3" name="category3" type="text" class="mt-1 block w-full" autofocus autocomplete="category3">
                                    <option value="" readonly>Selecione uma categoria...</option>
                                    @foreach ($categories as $id => $category)
                                        <option value="{{ $id }}" {{ old('category3') === $id ? 'selected' : false }}>{{ $category }}</option>
                                    @endforeach
                                </x-select-input>
                                <x-input-error class="mt-2" :messages="$errors->get('category3')" />
                            </div>

                            <div class="w-full">
                                <x-input-label for="description" value="Descrição" />
                                <x-text-area-input id="description" name="description" type="text" class="mt-1 block w-full" autofocus autocomplete="description">
                                    {{ old('description') }}
                                </x-text-area-input>
                                <x-input-error class="mt-2" :messages="$errors->get('description')" />
                            </div>

                            <div class="flex items-center gap-4 w-full">
                                <x-primary-button>{{ __('Save') }}</x-primary-button>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>

<script>
    function imageViewer() {
        return {
            imageUrl: '',

            fileChosen(event) {
                this.fileToDataUrl(event, src => this.imageUrl = src)
            },

            fileToDataUrl(event, callback) {
                if (! event.target.files.length) return

                let file = event.target.files[0],
                    reader = new FileReader()

                reader.readAsDataURL(file)
                reader.onload = e => callback(e.target.result)
            },
        }
    }
</script>