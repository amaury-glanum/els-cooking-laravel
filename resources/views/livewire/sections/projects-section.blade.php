<?php
$data = [
'projects' => [
[
'project-img' => './assets/img/projects/project1.jpg',
'date' => '2024-05-01',
'title' => 'Project One',
'place' => 'New York',
'category' => 'Development',
'id' => 1,
],
[
'project-img' => './assets/img/projects/project2.jpg',
'date' => '2024-04-15',
'title' => 'Project Two',
'place' => 'Los Angeles',
'category' => 'Design',
'id' => 2,
],
[
'project-img' => './assets/img/projects/project3.jpg',
'date' => '2024-03-30',
'title' => 'Project Three',
'place' => 'Chicago',
'category' => 'Marketing',
'id' => 3,
],
// Add more projects as needed
]
];

?>
<section id="nos-projets" class="projects-section">
    <div class="projects-section-inner container">
        <div class="content">
            <div class="image-text__textWrapper">
                <div class="pre-title">Nos projets</div>
                <div class="title">Découvrez nos projets.</div>
                <p>Nos projets incarnent la force et la diversité de nos convictions. Nous nous engageons avec les populations locales afin d'avancer ensemble.
                    Nous mettons un point d'honneur à la coopération et l'autonomisation.</p>
            </div>
        </div>
        <div class="swiper-container els-swiper-projects">
            <div class="swiper">
                <div class="swiper-wrapper">
                        <?php
                        $i = 1;
                    foreach($data['projects'] as $project) { ?>
                    <div
                        class="swiper-slide"
                        data-imageid="<?php echo $project['project-img'] ?? "./assets/img/projects/placeholder/placeholder-project.jpg" ?>"
                    >
                        <span><?php echo $project['date'] ?? ""; ?></span>
                        <div class="swiper__inner-btn">
                            <a class="button button--secondary button--radius-light" href="/project?project-page-id=1">En savoir + </a>
                        </div>
                        <div class="slide-content">
                            <h3 class="els-title"><?php echo $project['title']; ?></h3>
                            <p class="els-text els-text--white"><?php echo $project['place']; ?></p>
                        </div>

                    </div>
                        <?php $i++; } ?>
                </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
    </div>
</section>

