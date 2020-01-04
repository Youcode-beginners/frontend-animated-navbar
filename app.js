const links = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section');
const bubble = document.querySelector('.bubble');
const gradients = [
    "linear-gradient(to right top, #f46b45, #eea849)",
    "linear-gradient(to right top, #005c97, #363795)",
    "linear-gradient(to right top, #e53935, #e35d5b)",
];
const options = { threshold: 0.7 };

let observer = new IntersectionObserver(navCheck, options);

function navCheck(entries) {
    entries.forEach(entry => {
        const className = entry.target.className;
        const activeAnchor = document.querySelector(`[data-page=${className}]`);
        const gradientIndex = entry.target.getAttribute('data-index');
        const coords = activeAnchor.getBoundingClientRect();
        const directions = {
            height: coords.height,
            width: coords.width,
            top: coords.top,
            left: coords.left
        };

        if (entry.isIntersecting) {
            bubble.style.setProperty('left', `${directions.left}px`);
            bubble.style.setProperty('top', `${directions.top}px`);
            bubble.style.setProperty('width', `${directions.width}px`);
            bubble.style.setProperty('height', `${directions.height}px`);
            bubble.style.background = gradients[gradientIndex];
            
            links.forEach(link => { link.style.color = ((link.getAttribute('data-page') == entry.target.id)) ? "white" : "black"; })
        }
    });
}

sections.forEach(section => { observer.observe(section) })

$(document).ready(function() {
    $("a").on('click', function(event){
        event.preventDefault();
        let id = event.target.getAttribute('data-page')
        $('html, body').animate({
            scrollTop: $(`#${id}`).offset().top
        }, 1000, function(){
            window.location.hash = id;
        })
    })
})