<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Editar plantão {{ $shift->id }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                <div>
                    <section>
                        <form method="post" action="{{ route('shifts.update', $shift->id) }}" class="mt-6 space-y-6 flex flex-wrap gap-3">
                            @csrf
                            @method('PUT')

                            <div class="w-full lg:w-[32%]">
                                <x-input-label for="city" value="Cidade" />
                                <x-text-input id="city" name="city" type="text" class="mt-1 block w-full" :value="old('city', $shift->city)" required autofocus autocomplete="city" />
                                <x-input-error class="mt-2" :messages="$errors->get('city')" />
                            </div>

                            <div class="w-full lg:w-[32%]">
                                <x-input-label for="care_unit_id" value="Unidade" />
                                <x-select-input id="care_unit_id" name="care_unit_id" type="text" class="mt-1 block w-full" required autofocus autocomplete="care_unit_id">
                                    <option value="" readonly>Selecione uma unidade...</option>
                                    @foreach ($careUnits as $id => $careUnit)
                                        <option value="{{ $id }}" {{ old('care_unit_id', $shift->care_unit_id) === $id ? 'selected' : false }}>{{ $careUnit }}</option>
                                    @endforeach
                                </x-select-input>
                                <x-input-error class="mt-2" :messages="$errors->get('care_unit_id')" />
                            </div>

                            <div class="w-full lg:w-[32%]">
                                <x-input-label for="date" value="Data" />
                                <x-text-input id="date" name="date" type="date" class="mt-1 block w-full" :value="old('date', $shift->date)" required autofocus autocomplete="date" />
                                <x-input-error class="mt-2" :messages="$errors->get('date')" />
                            </div>

                            <div class="w-full lg:w-[32%]">
                                <x-input-label for="entry_time" value="Hora de entrada" />
                                <x-text-input id="entry_time" name="entry_time" type="time" class="mt-1 block w-full" :value="old('entry_time', $shift->entry_time)" required autofocus autocomplete="entry_time" />
                                <x-input-error class="mt-2" :messages="$errors->get('entry_time')" />
                            </div>

                            <div class="w-full lg:w-[32%]">
                                <x-input-label for="out_time" value="Hora de saída" />
                                <x-text-input id="out_time" name="out_time" type="time" class="mt-1 block w-full" :value="old('out_time', $shift->out_time)" required autofocus autocomplete="out_time" />
                                <x-input-error class="mt-2" :messages="$errors->get('out_time')" />
                            </div>

                            <div class="w-full lg:w-[32%]">
                                <x-input-label for="value" value="Valor" />
                                <x-text-input id="value" name="value" type="text" class="mt-1 block w-full" :value="old('value', $shift->value)" autofocus autocomplete="value" />
                                <x-input-error class="mt-2" :messages="$errors->get('value')" />
                            </div>

                            <div class="w-full lg:w-[32%]">
                                <x-input-label for="payment_method" value="Método de pagamento" />
                                <x-text-input id="payment_method" name="payment_method" type="text" class="mt-1 block w-full" :value="old('payment_method', $shift->payment_method)" autofocus autocomplete="payment_method" />
                                <x-input-error class="mt-2" :messages="$errors->get('payment_method')" />
                            </div>

                            <div class="w-full">
                                <x-input-label for="description" value="Descrição" />
                                <x-text-area-input id="description" name="description" type="text" class="mt-1 block w-full" autofocus autocomplete="description">
                                    {{ old('description', $shift->description) }}
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