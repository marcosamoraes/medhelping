@props(['title', 'value', 'icon'])

<div class="bg-white overflow-hidden shadow-sm sm:rounded-lg min-w-[280px] flex justify-center items-center flex-wrap flex-col p-5 gap-3">
    <i class="{{ $icon }} text-[30px] rounded-full border-2 w-[60px] h-[60px] flex justify-center items-center"></i>
    <div class="text-gray-900 text-xl">{{ $title }}</div>
    <div class="text-gray-900 text-2xl">{{ $value }}</div>
</div>
