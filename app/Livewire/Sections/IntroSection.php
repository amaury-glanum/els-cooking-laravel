<?php

namespace App\Livewire\Sections;

use Livewire\Component;

class IntroSection extends Component
{
    public function render()
    {
        return view('livewire.sections.intro-section')->with('layout', 'public');
    }
}
