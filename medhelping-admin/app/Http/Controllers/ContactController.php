<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $contacts = Contact::paginate();

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
        return back()->with('status', 'contact-deleted');
    }
}
