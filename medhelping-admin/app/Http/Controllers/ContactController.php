<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use RealRashid\SweetAlert\Facades\Alert;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $contacts = Contact::paginate(50);

        $title = 'Deletar contato';
        $text = "Você tem certeza que quer deletar esse contato?";
        confirmDelete($title, $text);

        return view('contacts.index', compact('contacts'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contact $contact)
    {
        $contact->delete();
        Alert::toast('Contato deletado com sucesso.', 'success');
        return back();
    }
}
