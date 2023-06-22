<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Editar unidade {{ $careUnit->id }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                <div>
                    <section>
                        <form method="post" action="{{ route('care-units.update', $careUnit->id) }}" class="mt-6 space-y-6 flex flex-wrap gap-3">
                            @csrf
                            @method('PUT')

                            <div class="w-full lg:w-[32%]">
                                <x-input-label for="name" value="Nome" />
                                <x-text-input id="name" name="name" type="text" class="mt-1 block w-full" :value="old('name', $careUnit->name)" required autofocus autocomplete="name" />
                                <x-input-error class="mt-2" :messages="$errors->get('name')" />
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