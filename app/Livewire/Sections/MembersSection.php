<?php

namespace App\Livewire\Sections;

use Livewire\Component;
use App\Models\Members;
class MembersSection extends Component
{
    public $members;

    public function mount()
    {
        $this->members = Members::all();
    }
    public function render()
    {
        return view('livewire.sections.members-section', ['members' => $this->members])->with('layout', 'public');
    }
}
