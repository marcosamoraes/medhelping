@props(['disabled' => false])

<input
    type="file"
    {{ $disabled ? 'disabled' : '' }}
    {!! $attributes->merge(['class' => 'block w-full text-sm text-gray-500 mt-0.5 file:mr-4 file:py-2 file:px-4 file:rounded-md
    file:border-0 file:text-lg file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600']) !!}
/>
