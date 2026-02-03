// --- Cementary page timer logic ---
function renderFlipTimer(containerId, labelId, values) {
    const labels = ['lat', 'msc.', 'dni', 'godz.', 'min.', 'sek.'];
    const keys = ['years', 'months', 'days', 'hours', 'minutes', 'seconds'];
    const container = document.getElementById(containerId);
    const labelRow = document.getElementById(labelId);
    container.innerHTML = '';
    labelRow.innerHTML = '';
    for (let i = 0; i < keys.length; i++) {
        const val = values[keys[i]];
        const card = document.createElement('div');
        card.className = 'flip-card-static';
        card.innerHTML = `<span>${val}</span>`;
        container.appendChild(card);
        const label = document.createElement('div');
        label.className = 'flip-label-static';
        label.textContent = labels[i];
        labelRow.appendChild(label);
    }
}

function updateTombstoneTimer(flipId, startDate) {
    const labelId = flipId.replace('flip-', 'labels-');
    const now = new Date();
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();
    let hours = now.getHours() - startDate.getHours();
    let minutes = now.getMinutes() - startDate.getMinutes();
    let seconds = now.getSeconds() - startDate.getSeconds();

    if (seconds < 0) { seconds += 60; minutes--; }
    if (minutes < 0) { minutes += 60; hours--; }
    if (hours < 0) { hours += 24; days--; }
    if (days < 0) {
        let prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
        months--;
    }
    if (months < 0) { months += 12; years--; }

    renderFlipTimer(flipId, labelId, { years, months, days, hours, minutes, seconds });
}

function startAllTombstoneTimers() {
    document.querySelectorAll('.tombstone').forEach(tombstone => {
        const initials = tombstone.getAttribute('data-initials');
        const dateStr = tombstone.getAttribute('data-date');
        const flipId = `flip-${initials}`;
        const startDate = new Date(dateStr);
        setInterval(() => updateTombstoneTimer(flipId, startDate), 1000);
        updateTombstoneTimer(flipId, startDate);
    });
}

document.addEventListener('DOMContentLoaded', startAllTombstoneTimers);
/*!
* Start Bootstrap - Freelancer v7.0.7 (https://startbootstrap.com/theme/freelancer)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});
