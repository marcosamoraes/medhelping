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

                            <div class="w-full lg:w-[24%]">
                                <x-input-label for="name" value="Nome" />
                                <x-text-input id="name" name="name" type="text" class="mt-1 block w-full" :value="old('name', $user->name)" required autofocus autocomplete="name" />
                                <x-input-error class="mt-2" :messages="$errors->get('name')" />
                            </div>

                            <div class="w-full lg:w-[24%]">
                                <x-input-label for="email" value="E-mail" />
                                <x-text-input id="email" name="email" type="email" class="mt-1 block w-full" :value="old('email', $user->email)" required autofocus autocomplete="email" />
                                <x-input-error class="mt-2" :messages="$errors->get('email')" />
                            </div>

                            <div class="w-full lg:w-[24%]">
                                <x-input-label for="whatsapp" value="Whatsapp" />
                                <x-text-input id="whatsapp" name="whatsapp" type="text" class="mt-1 block w-full" :value="old('whatsapp', $user->whatsapp)" required autofocus autocomplete="whatsapp" />
                                <x-input-error class="mt-2" :messages="$errors->get('whatsapp')" />
                            </div>

                            <div class="w-full lg:w-[24%]">
                                <x-input-label for="active" value="Ativo" />
                                <x-select-input id="active" name="active" type="text" class="mt-1 block w-full" required autofocus autocomplete="active">
                                    <option value="1" {{ old('active', $user->active) ? 'selected' : false }}>Sim</option>
                                    <option value="0" {{ !old('active', $user->active) ? 'selected' : false }}>Não</option>
                                </x-select-input>
                                <x-input-error class="mt-2" :messages="$errors->get('active')" />
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
                                <x-text-input id="cep" name="address[cep]" type="text" class="mt-1 block w-full" :value="old('address[cep]', $user->address?->cep)" required autofocus autocomplete="cep" />
                                <x-input-error class="mt-2" :messages="$errors->get('cep')" />
                            </div>
                            <div class="w-full"></div>
                            <div class="w-full lg:w-[32%]">
                                <x-input-label for="address" value="Endereço" />
                                <x-text-input id="address" name="address[address]" type="text" class="mt-1 block w-full" :value="old('address[address]', $user->address?->address)" required autofocus autocomplete="address" />
                                <x-input-error class="mt-2" :messages="$errors->get('address')" />
                            </div>

                            <div class="w-full lg:w-[32%]">
                                <x-input-label for="number" value="Número" />
                                <x-text-input id="number" name="address[number]" type="text" class="mt-1 block w-full" :value="old('address[number]', $user->address?->number)" required autofocus autocomplete="number" />
                                <x-input-error class="mt-2" :messages="$errors->get('number')" />
                            </div>

                            <div class="w-full lg:w-[32%]">
                                <x-input-label for="complement" value="Complemento" />
                                <x-text-input id="complement" name="address[complement]" type="text" class="mt-1 block w-full" :value="old('address[complement]', $user->address?->complement)" required autofocus autocomplete="complement" />
                                <x-input-error class="mt-2" :messages="$errors->get('complement')" />
                            </div>

                            <div class="w-full lg:w-[32%]">
                                <x-input-label for="district" value="Bairro" />
                                <x-text-input id="district" name="address[district]" type="text" class="mt-1 block w-full" :value="old('address[district]', $user->address?->district)" required autofocus autocomplete="district" />
                                <x-input-error class="mt-2" :messages="$errors->get('district')" />
                            </div>

                            <div class="w-full lg:w-[32%]">
                                <x-input-label for="city" value="Cidade" />
                                <x-text-input id="city" name="address[city]" type="text" class="mt-1 block w-full" :value="old('address[city]', $user->address?->city)" required autofocus autocomplete="city" />
                                <x-input-error class="mt-2" :messages="$errors->get('city')" />
                            </div>

                            <div class="w-full lg:w-[32%]">
                                <x-input-label for="state" value="Estado" />
                                <x-text-input id="state" name="address[state]" type="text" class="mt-1 block w-full" :value="old('address[state]', $user->address?->state)" required autofocus autocomplete="state" />
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
                                <x-text-input id="age" name="infos[age]" type="text" class="mt-1 block w-full" :value="old('infos[age]', $user->infos?->age)" required autofocus autocomplete="age" />
                                <x-input-error class="mt-2" :messages="$errors->get('age')" />
                            </div>

                            <div class="w-full lg:w-[24%]">
                                <x-input-label for="faculty" value="Faculdade" />
                                <x-text-input id="faculty" name="infos[faculty]" type="text" class="mt-1 block w-full" :value="old('infos[faculty]', $user->infos?->faculty)" required autofocus autocomplete="faculty" />
                                <x-input-error class="mt-2" :messages="$errors->get('faculty')" />
                            </div>

                            <div class="w-full lg:w-[24%]">
                                <x-input-label for="faculty_year" value="Ano de Formatura" />
                                <x-text-input id="faculty_year" name="infos[faculty_year]" type="text" class="mt-1 block w-full" :value="old('infos[faculty_year]', $user->infos?->faculty_year)" required autofocus autocomplete="faculty_year" />
                                <x-input-error class="mt-2" :messages="$errors->get('faculty_year')" />
                            </div>

                            <div class="w-full lg:w-[24%]">
                                <x-input-label for="crm" value="CRM" />
                                <x-text-input id="crm" name="infos[crm]" type="text" class="mt-1 block w-full" :value="old('infos[crm]', $user->infos?->crm)" required autofocus autocomplete="crm" />
                                <x-input-error class="mt-2" :messages="$errors->get('crm')" />
                            </div>

                            <div class="w-full lg:w-[32%]">
                                <x-input-label for="occupation_area" value="Área de atuação" />
                                <x-text-input id="occupation_area" name="infos[occupation_area]" type="text" class="mt-1 block w-full" :value="old('infos[occupation_area]', $user->infos?->occupation_area)" required autofocus autocomplete="occupation_area" />
                                <x-input-error class="mt-2" :messages="$errors->get('occupation_area')" />
                            </div>

                            <div class="w-full lg:w-[32%]">
                                <x-input-label for="specialties" value="Especialidades" />
                                <x-text-input id="specialties" name="infos[specialties]" type="text" class="mt-1 block w-full" :value="old('infos[specialties]', $user->infos?->specialties)" required autofocus autocomplete="specialties" />
                                <x-input-error class="mt-2" :messages="$errors->get('specialties')" />
                            </div>

                            <div class="w-full lg:w-[32%]">
                                <x-input-label for="link_facebook" value="Link Facebook" />
                                <x-text-input id="link_facebook" name="infos[link_facebook]" type="text" class="mt-1 block w-full" :value="old('infos[link_facebook]', $user->infos?->link_facebook)" required autofocus autocomplete="link_facebook" />
                                <x-input-error class="mt-2" :messages="$errors->get('link_facebook')" />
                            </div>

                            <div class="w-full lg:w-[32%]">
                                <x-input-label for="link_instagram" value="Link Instagram" />
                                <x-text-input id="link_instagram" name="infos[link_instagram]" type="text" class="mt-1 block w-full" :value="old('infos[link_instagram]', $user->infos?->link_instagram)" required autofocus autocomplete="link_instagram" />
                                <x-input-error class="mt-2" :messages="$errors->get('link_instagram')" />
                            </div>

                            <div class="w-full lg:w-[32%]">
                                <x-input-label for="link_twitter" value="Link Twitter" />
                                <x-text-input id="link_twitter" name="infos[link_twitter]" type="text" class="mt-1 block w-full" :value="old('infos[link_twitter]', $user->infos?->link_twitter)" required autofocus autocomplete="link_twitter" />
                                <x-input-error class="mt-2" :messages="$errors->get('link_twitter')" />
                            </div>

                            <div class="w-full lg:w-[32%]">
                                <x-input-label for="link_doctoralia" value="Link Doctoralia" />
                                <x-text-input id="link_doctoralia" name="infos[link_doctoralia]" type="text" class="mt-1 block w-full" :value="old('infos[link_doctoralia]', $user->infos?->link_doctoralia)" required autofocus autocomplete="link_doctoralia" />
                                <x-input-error class="mt-2" :messages="$errors->get('link_doctoralia')" />
                            </div>

                            <div class="flex items-center gap-4 w-full mt-5">
                                <x-primary-button>{{ __('Save') }}</x-primary-button>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </form>
    </div>
</x-app-layout>