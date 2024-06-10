<?php

namespace App\Livewire\Sections;

use App\Models\ProjectMedia;
use App\Models\Projects;
use App\Models\Medias;
use Livewire\Component;

class ProjectsSection extends Component
{
    public $projects;

    public function mount()
    {
        $this->projects = Projects::with('medias')->get();
    }
    public function render()
    {
        return view('livewire.sections.projects-section',  ['projects' => $this->projects])->with('layout', 'public');
    }
}
