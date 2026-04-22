//Sections Initialization
let homeSection = document.getElementById('home');
let aboutSection = document.getElementById('aboutUs');
let admissionSection = document.getElementById('admission');
let facilitiesSection = document.getElementById('facilities');
let contactSection = document.getElementById('contact');

//Show section function
function showSection(section) {
    //HIdes all section
    homeSection.classList.add('hidden');
    aboutSection.classList.add('hidden');
    admissionSection.classList.add('hidden');
    facilitiesSection.classList.add('hidden');
    contactSection.classList.add('hidden');

    //Removes Hiddden fron Selected Section
    section.classList.remove('hidden');
    
    // scroll to top of page
    window.scrollTo({ top: 0, behavior: "smooth" });
}

//Intilazation of Buttons
let homeBtn = document.querySelector('nav button:nth-child(1)');
let aboutBtn = document.querySelector('nav button:nth-child(2)');
let admissionBtn = document.querySelector('nav button:nth-child(3)');
let facilitiesBtn = document.querySelector('nav button:nth-child(4)');
let contactBtn = document.querySelector('nav button:nth-child(5)');

//Adding event listeners to buttons
homeBtn.addEventListener('click', () => {
    console.log('Clicked');
    showSection(homeSection);
});
aboutBtn.addEventListener('click', () => {
    console.log('Clicked');
    showSection(aboutSection);
});
admissionBtn.addEventListener('click', () => {
    console.log('Clicked');
    showSection(admissionSection);
});
facilitiesBtn.addEventListener('click', () => {
    console.log('Clicked');
    showSection(facilitiesSection);
});
contactBtn.addEventListener('click', () => {
    console.log('Clicked');
    showSection(contactSection);
});


//Show Home by default
showSection(homeSection);

// Modal Handling function
function modalBtn(button, modal){
    button.addEventListener('click', () => {
    
        //Show Modal
        modal.classList.remove('hidden');
    });
    
    //Initialization of Modal "X" button
    let x = modal.querySelector('.x');
    
    // Hide Modal
    x.addEventListener('click', () => {
        modal.classList.add('hidden');
    });
}

//Apply Now (Admission)
//Initialization of "Apply now" Btn
let applyBtn = document.getElementById('applyBtn');

// Initialization of "Apply now" Modal
let applyModal = document.getElementById('applyModal');

// Open/Close Modal
modalBtn(applyBtn, applyModal);

//Visit (Admission)
//Initialization of "Visit" Btn
let visitBtn = document.getElementById('visitBtn');

// Initialization of "Visit" Modal
let visitModal = document.getElementById('visitModal');

// Open/Close Modal
modalBtn(visitBtn, visitModal);