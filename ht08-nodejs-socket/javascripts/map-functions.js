$(function () {
    if ('geolocation' in navigator) {
        refreshCurrent();
    } else {
        $('#current-wrapper').html(
            "(We can't seem to get this device's location)"
        );
    }

    function refreshCurrent(ev) {
        if (ev) ev.preventDefault();
        navigator.geolocation.getCurrentPosition(queryCurrentNeighborhood);
    }

    function queryCurrentNeighborhood(pos) {
        $.getJSON(
            '/currentNeighborhood?lat=' +
            pos.coords.latitude +
            '&lng=' +
            pos.coords.longitude,
            displayCurrentNeighborhood
        );
    }

    function displayCurrentNeighborhood(data) {
        if (!data.name) {
            $('#current-n-name').text('(unknown)');
        } else {
            $('#current-n-name').text(data.name);
        }
    }

    var originEl = $('#origin'),
        destEl = $('#dest'),
        searchBtnEl = $('#search'),
        neighborhoodEl = $('#neighborhoods');

    function displayResults(data) {
        if (data.error) {
            alert(data.errorMessage);
        } else {
            listNeighborhoods(data.neighborhoodNames);
            redrawMap(data.route);
        }
    }

    function listNeighborhoods(neighborhoods) {
        neighborhoodEl.empty();
        for (var i = 0, ii = neighborhoods.length; i < ii; i++) {
            neighborhoodEl.append(
                '<div class="hood">' + neighborhoods[i] + '</div>'
            );
        }
    }

    var currentRoute;
    function redrawMap(route) {
        if (currentRoute) map.removeLayer(currentRoute);
        var Lroute = route.map(function (coords) {
            return new L.LatLng(coords[1], coords[0]);
        });

        currentRoute = L.polyline(Lroute, { color: 'blue' }).addTo(map);
        map.fitBounds(currentRoute.getBounds());
    }

    function getNeighborhoods() {
        var originAddress = originEl.val();
        var destAddress = destEl.val();

        if (!originAddress || !destAddress) {
            return alert('Please fill in both start and end addresses');
        }

        $.getJSON(
            '/searchNeighborhoods?or=' +
            encodeURI(originAddress) +
            '&dest=' +
            encodeURI(destAddress),
            displayResults
        );
    }

    searchBtnEl.bind('click', getNeighborhoods);

    let config = {
        minZoom: 7,
        maxZoom: 18,
    };
    const zoom = 18;
    const lat = 52.22977;
    const lng = 21.01178;

    const map = L.map("map", config).setView([lat, lng], zoom);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    map
        .locate({
            // https://leafletjs.com/reference-1.7.1.html#locate-options-option
            setView: true,
            enableHighAccuracy: true,
        })
        // if location found show marker and circle
        .on("locationfound", (e) => {
            console.log(e);
            // marker
            const marker = L.marker([e.latitude, e.longitude]).bindPopup(
                "Your are here :)"
            );
            // circle
            const circle = L.circle([e.latitude, e.longitude], e.accuracy / 2, {
                weight: 2,
                color: "red",
                fillColor: "red",
                fillOpacity: 0.1,
            });
            // add marker
            map.addLayer(marker);
            // add circle
            map.addLayer(circle);
        })
        // if error show alert
        .on("locationerror", (e) => {
            console.log(e);
            alert("Location access denied.");
        });


});
