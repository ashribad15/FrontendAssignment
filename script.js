const recommendedEventsContainer = document.querySelector('.recommended-events-container');
const upcomingEventsContainer = document.querySelector('.upcoming-events-container');
const loader = document.querySelector('.loader');

async function fetchEvents(url) {
    loader.style.display = 'block';
    const response = await fetch(url);
    const data = await response.json();
    loader.style.display = 'none';
    return data;
}

async function renderRecommendedEvents() {
    const url = 'https://gg-backend-assignment.azurewebsites.net/api/Events?code=FOX643kbHEAkyPbdd8nwNLkekHcL4z0hzWBGCd64Ur7mAzFuRCHeyQ==&type=reco';
    const events = await fetchEvents(url);
    events.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.classList.add('event');
        eventElement.innerHTML = `
            <img src="${event.img_url}" alt="${event.eventName}">
            <h3>${event.eventName}</h3>
            <p>${event.cityName}</p>
            <p>${event.date}</p>
        `;
        recommendedEventsContainer.appendChild(eventElement);
    });
}

async function renderUpcomingEvents(page) {
    const url = `https://gg-backend-assignment.azurewebsites.net/api/Events?code=FOX643kbHEAkyPbdd8nwNLkekHcL4z0hzWBGCd64Ur7mAzFuRCHeyQ==&page=${page}&type=upcoming`;
    const events = await fetchEvents(url);
    events.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.classList.add('event');
        eventElement.innerHTML = `
            <h3>${event.eventName}</h3>
            <p>${event.cityName}</p>
            <p>${event.date}</p>
            <p>${event.weather}</p>
            <p>${event.distanceKm} km</p>
        `;
        upcomingEventsContainer.appendChild(eventElement);
    });
}

let currentPage = 1;

window.addEventListener('scroll', () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
        currentPage++;
        renderUpcomingEvents(currentPage);
    }
});

renderRecommendedEvents();
renderUpcomingEvents(currentPage);
