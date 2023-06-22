<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Editar categoria {{ $category->id }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                <div>
                    <section>
                        <form method="post" action="{{ route('categories.update', $category->id) }}" class="mt-6 space-y-6 flex flex-wrap gap-3" enctype="multipart/form-data">
                            @csrf
                            @method('PUT')

                            <div class="w-full lg:w-[32%]">
                                <x-input-label for="name" value="Nome" />
                                <x-text-input id="name" name="name" type="text" class="mt-1 block w-full" :value="old('name', $category->name)" required autofocus autocomplete="name" />
                                <x-input-error class="mt-2" :messages="$errors->get('name')" />
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
            imageUrl: "{{ $category->image ? asset('storage/' . $category->image) : null }}",

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