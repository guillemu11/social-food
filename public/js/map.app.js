function initMap() {

    new google.maps.Map(
        document.querySelector('#map'),
        { zoom: 14, center: { lat: 40.392499, lng: -3.698214 }, styles: mapStyles.aubergine }
    )
}