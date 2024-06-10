<?php

namespace App\Livewire\Sections;

use Livewire\Component;

class ContactSection extends Component
{
    public function render()
    {
        return view('livewire.sections.contact-section')->with('layout', 'public');
    }
}
