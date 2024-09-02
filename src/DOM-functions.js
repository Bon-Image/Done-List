// Purpose: Edit the name of the project
// Signature: !!! -> void 
// Example(s): editProjectName(!!!)

function editProjectName(target) {

    const input = target.nextElementSibling;
    // target is a span node
    toggle(input, target);

    // Get the corresponding project in the main window
    const currentProject = target.classList[1];
    const span = document.querySelector(`div.main-window > span.${currentProject}`);

    // Live update the project name in the main window 
    input.addEventListener('input', () => {

        span.textContent = input.value;

    });

};


// Purpose: Save the name of the project 
// Signature: !!! -> void 
// Example(s): saveProjectName(!!!)

function saveProjectName(target) {

    const span = target.previousElementSibling;
    toggle(span, target);
    span.textContent = target.value;

};



// Purpose: Change the style of span and input elements 
// Signature: input span -> void 
// Example(s): toggleToInput(input, span)

function toggle(element1, element2) {

    element1.style.display = "inline";

    if (element1.tagName === 'input') {

        element1.focus();
    };

    element2.style.display = "none";

};


export { editProjectName, saveProjectName }