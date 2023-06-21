<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Dashboard
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-wrap gap-3 justify-center">
            <x-dashboard-card title="Usuários" :value="$countUsers" icon="fa-solid fa-users" />
            <x-dashboard-card title="Artigos" :value="$countArticles" icon="fa-solid fa-file-medical" />
            <x-dashboard-card title="Plantões" :value="$countShifts" icon="fa-solid fa-file-waveform" />
            <x-dashboard-card title="Contatos" :value="$countContacts" icon="fa-solid fa-address-book" />
        </div>
    </div>
</x-app-layout>
