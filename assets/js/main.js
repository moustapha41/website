/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 

/*===== GESTION DES CERTIFICATS =====*/
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('certificateModal');
    const modalBody = document.querySelector('.certificate-modal__body');
    const closeBtn = document.querySelector('.certificate-modal__close');
    const viewButtons = document.querySelectorAll('.view-certificate');
    
    // Chemins vers les fichiers des certificats
    const certificates = {
        'devsecops': {
            path: 'assets/certifications/devsecops.pdf',
            type: 'pdf'
        },
        'ccna': {
            path: 'assets/certifications/ccna.jpg',
            type: 'image'
        },
        'javascript': {
            path: 'assets/certifications/javascript.jpeg',
            type: 'image'
        }
    };

    // Fonction pour ouvrir la modale
    function openModal(certificateId) {
        const cert = certificates[certificateId];
        if (!cert) return;

        // Vider le contenu précédent
        modalBody.innerHTML = '';
        
        // Afficher un indicateur de chargement
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'loading';
        modalBody.appendChild(loadingDiv);
        
        // Afficher la modale immédiatement
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Simuler un chargement (peut être supprimé en production)
        setTimeout(() => {
            modalBody.innerHTML = ''; // Enlever l'indicateur de chargement
            
            // Créer un conteneur pour l'image ou le PDF
            const container = document.createElement('div');
            container.className = 'certificate-container';
            
            if (cert.type === 'pdf') {
                // Créer un conteneur pour la prévisualisation et les boutons
                const previewContainer = document.createElement('div');
                previewContainer.className = 'pdf-preview-container';
                
                // Créer une image de prévisualisation cliquable
                const previewLink = document.createElement('a');
                previewLink.href = cert.path;
                previewLink.target = '_blank';
                previewLink.rel = 'noopener noreferrer';
                previewLink.className = 'preview-link';
                
                // Créer l'image de prévisualisation
                const img = document.createElement('img');
                img.src = 'assets/certifications/Image.png';
                img.alt = 'Aperçu de la certification DevSecOps';
                img.className = 'certificate-modal__image';
                
                // Créer un bouton de téléchargement
                const downloadBtn = document.createElement('button');
                downloadBtn.className = 'download-button';
                downloadBtn.innerHTML = '<i class="bx bx-download"></i> Télécharger le PDF';
                downloadBtn.onclick = (e) => {
                    e.stopPropagation();
                    const downloadLink = document.createElement('a');
                    downloadLink.href = cert.path;
                    downloadLink.download = 'devsecops-certification.pdf';
                    downloadLink.click();
                };
                
                // Ajouter les éléments au DOM
                previewLink.appendChild(img);
                previewContainer.appendChild(previewLink);
                previewContainer.appendChild(downloadBtn);
                container.appendChild(previewContainer);
                
                // Ajouter une légende d'information
                const caption = document.createElement('p');
                caption.className = 'certificate-caption';
                caption.textContent = 'Cliquez sur l\'image pour voir le PDF dans un nouvel onglet';
                container.appendChild(caption);
            } else {
                // Pour les images normales
                const img = document.createElement('img');
                img.src = cert.path;
                img.alt = 'Certification ' + certificateId;
                img.className = 'certificate-modal__image';
                container.appendChild(img);
            }
            
            modalBody.appendChild(container);
        }, 500);
    }

    // Fonction pour fermer la modale
    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Rétablir le défilement de la page
        // Vider le contenu de la modale après l'animation de fermeture
        setTimeout(() => {
            modalBody.innerHTML = '';
        }, 300);
    }

    // Ajouter les écouteurs d'événements
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const certificateId = this.getAttribute('data-certificate');
            const certType = this.getAttribute('data-type');
            
            // Mettre à jour le type dans l'objet certificates
            if (certificates[certificateId]) {
                certificates[certificateId].type = certType;
            }
            
            openModal(certificateId);
        });
    });

    closeBtn.addEventListener('click', closeModal);

    // Fermer la modale en cliquant en dehors de l'image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Fermer la modale avec la touche Échap
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
});
