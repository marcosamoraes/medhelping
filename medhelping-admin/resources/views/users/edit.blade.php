<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Editar usuário {{ $user->id }}
        </h2>
    </x-slot>

    <div class="py-12">
        <form method="post" action="{{ route('users.update', $user->id) }}">
            @csrf
            @method('PUT')
            
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <div>
                        <section class="mt-6 space-y-6 flex flex-wrap gap-3">
                            <div class="w-full">
                                <img src="{{  $user->image ? asset('storage/' . $user->image) : asset('images/user.png') }}" 
                                    class="object-cover m-auto rounded-full border border-gray-200" 
                                    style="width: 100px; height: 100px;"
                                >
                            </div>

                            <div class="w-full lg:w-[32%]">
                                <x-input-label for="name" value="Nome" />
                                <x-text-input id="name" name="name" type="text" class="mt-1 block w-full" :value="old('name', $user->name)" required autofocus autocomplete="name" />
                                <x-input-error class="mt-2" :messages="$errors->get('name')" />
                            </div>

                            <div class="w-full lg:w-[32%]">
                                <x-input-label for="email" value="E-mail" />
                                <x-text-input id="email" name="email" type="email" class="mt-1 block w-full" :value="old('email', $user->email)" required autofocus autocomplete="email" />
                                <x-input-error class="mt-2" :messages="$errors->get('email')" />
                            </div>

                            <div class="w-full lg:w-[32%]">
                                <x-input-label for="whatsapp" value="Whatsapp" />
                                <x-text-input id="whatsapp" name="whatsapp" type="text" class="mt-1 block w-full" :value="old('whatsapp', $user->whatsapp)" required autofocus autocomplete="whatsapp" />
                                <x-input-error class="mt-2" :messages="$errors->get('whatsapp')" />
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-5">
                <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <div>
                        <section class="flex flex-wrap gap-3">
                            <div class="w-full lg:w-[32%]">
                                <x-input-label for="cep" value="CEP" />
                                <x-text-input id="cep" name="cep" type="text" class="mt-1 block w-full" :value="old('cep', $user->address?->cep)" required autofocus autocomplete="cep" />
                                <x-input-error class="mt-2" :messages="$errors->get('cep')" />
                            </div>
                            <div class="w-full"></div>
                            <div class="w-full lg:w-[32%]">
                                <x-input-label for="address" value="Endereço" />
                                <x-text-input id="address" name="address" type="text" class="mt-1 block w-full" :value="old('address', $user->address?->address)" required autofocus autocomplete="address" />
                                <x-input-error class="mt-2" :messages="$errors->get('address')" />
                            </div>

                            <div class="w-full lg:w-[32%]">
                                <x-input-label for="number" value="Número" />
                                <x-text-input id="number" name="number" type="text" class="mt-1 block w-full" :value="old('number', $user->address?->number)" required autofocus autocomplete="number" />
                                <x-input-error class="mt-2" :messages="$errors->get('number')" />
                            </div>

                            <div class="w-full lg:w-[32%]">
                                <x-input-label for="complement" value="Complemento" />
                                <x-text-input id="complement" name="complement" type="text" class="mt-1 block w-full" :value="old('complement', $user->address?->complement)" required autofocus autocomplete="complement" />
                                <x-input-error class="mt-2" :messages="$errors->get('complement')" />
                            </div>

                            <div class="w-full lg:w-[32%]">
                                <x-input-label for="district" value="Bairro" />
                                <x-text-input id="district" name="district" type="text" class="mt-1 block w-full" :value="old('district', $user->address?->district)" required autofocus autocomplete="district" />
                                <x-input-error class="mt-2" :messages="$errors->get('district')" />
                            </div>

                            <div class="w-full lg:w-[32%]">
                                <x-input-label for="city" value="Cidade" />
                                <x-text-input id="city" name="city" type="text" class="mt-1 block w-full" :value="old('city', $user->address?->city)" required autofocus autocomplete="city" />
                                <x-input-error class="mt-2" :messages="$errors->get('city')" />
                            </div>

                            <div class="w-full lg:w-[32%]">
                                <x-input-label for="state" value="Estado" />
                                <x-text-input id="state" name="state" type="text" class="mt-1 block w-full" :value="old('state', $user->address?->state)" required autofocus autocomplete="state" />
                                <x-input-error class="mt-2" :messages="$errors->get('state')" />
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-5">
                <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <div>
                        <section class="flex flex-wrap gap-3">
                            <div class="w-full lg:w-[24%]">
                                <x-input-label for="age" value="Idade" />
                                <x-text-input id="age" name="age" type="text" class="mt-1 block w-full" :value="old('age', $user->infos?->age)" required autofocus autocomplete="age" />
                                <x-input-error class="mt-2" :messages="$errors->get('age')" />
                            </div>

                            <div class="w-full lg:w-[24%]">
                                <x-input-label for="faculty" value="Faculdade" />
                                <x-text-input id="faculty" name="faculty" type="text" class="mt-1 block w-full" :value="old('faculty', $user->infos?->faculty)" required autofocus autocomplete="faculty" />
                                <x-input-error class="mt-2" :messages="$errors->get('faculty')" />
                            </div>

                            <div class="w-full lg:w-[24%]">
                                <x-input-label for="faculty_year" value="Ano de Formatura" />
                                <x-text-input id="faculty_year" name="faculty_year" type="text" class="mt-1 block w-full" :value="old('faculty_year', $user->infos?->faculty_year)" required autofocus autocomplete="faculty_year" />
                                <x-input-error class="mt-2" :messages="$errors->get('faculty_year')" />
                            </div>

                            <div class="w-full lg:w-[24%]">
                                <x-input-label for="crm" value="CRM" />
                                <x-text-input id="crm" name="crm" type="text" class="mt-1 block w-full" :value="old('crm', $user->infos?->crm)" required autofocus autocomplete="crm" />
                                <x-input-error class="mt-2" :messages="$errors->get('crm')" />
                            </div>

                            <div class="w-full lg:w-[32%]">
                                <x-input-label for="occupation_area" value="Área de atuação" />
                                <x-text-input id="occupation_area" name="occupation_area" type="text" class="mt-1 block w-full" :value="old('occupation_area', $user->infos?->occupation_area)" required autofocus autocomplete="occupation_area" />
                                <x-input-error class="mt-2" :messages="$errors->get('occupation_area')" />
                            </div>

                            <div class="w-full lg:w-[32%]">
                                <x-input-label for="specialties" value="Especialidades" />
                                <x-text-input id="specialties" name="specialties" type="text" class="mt-1 block w-full" :value="old('specialties', $user->infos?->specialties)" required autofocus autocomplete="specialties" />
                                <x-input-error class="mt-2" :messages="$errors->get('specialties')" />
                            </div>

                            <div class="w-full lg:w-[32%]">
                                <x-input-label for="link_facebook" value="Link Facebook" />
                                <x-text-input id="link_facebook" name="link_facebook" type="text" class="mt-1 block w-full" :value="old('link_facebook', $user->infos?->link_facebook)" required autofocus autocomplete="link_facebook" />
                                <x-input-error class="mt-2" :messages="$errors->get('link_facebook')" />
                            </div>

                            <div class="w-full lg:w-[32%]">
                                <x-input-label for="link_instagram" value="Link Instagram" />
                                <x-text-input id="link_instagram" name="link_instagram" type="text" class="mt-1 block w-full" :value="old('link_instagram', $user->infos?->link_instagram)" required autofocus autocomplete="link_instagram" />
                                <x-input-error class="mt-2" :messages="$errors->get('link_instagram')" />
                            </div>

                            <div class="w-full lg:w-[32%]">
                                <x-input-label for="link_twitter" value="Link Twitter" />
                                <x-text-input id="link_twitter" name="link_twitter" type="text" class="mt-1 block w-full" :value="old('link_twitter', $user->infos?->link_twitter)" required autofocus autocomplete="link_twitter" />
                                <x-input-error class="mt-2" :messages="$errors->get('link_twitter')" />
                            </div>

                            <div class="w-full lg:w-[32%]">
                                <x-input-label for="link_doctoralia" value="Link Doctoralia" />
                                <x-text-input id="link_doctoralia" name="link_doctoralia" type="text" class="mt-1 block w-full" :value="old('link_doctoralia', $user->infos?->link_doctoralia)" required autofocus autocomplete="link_doctoralia" />
                                <x-input-error class="mt-2" :messages="$errors->get('link_doctoralia')" />
                            </div>

                            <div class="flex items-center gap-4 w-full mt-5">
                                <x-primary-button>{{ __('Save') }}</x-primary-button>

                                @if (session('status') === 'user-updated')
                                    <p
                                        x-data="{ show: true }"
                                        x-show="show"
                                        x-transition
                                        x-init="setTimeout(() => show = false, 2000)"
                                        class="text-sm text-gray-600"
                                    >{{ __('Saved.') }}</p>
                                @endif
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </form>
    </div>
</x-app-layout>