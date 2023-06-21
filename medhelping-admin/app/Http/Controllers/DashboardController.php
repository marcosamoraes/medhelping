<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Contact;
use App\Models\Shift;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Display the email verification prompt.
     */
    public function __invoke()
    {
        $countUsers = User::count();
        $countArticles = Article::count();
        $countShifts = Shift::count();
        $countContacts = Contact::count();

        return view('dashboard', compact('countUsers', 'countArticles', 'countShifts', 'countContacts'));
    }
}
