function initGoogleMapsCompleted() {
    ocm_app.mappingManager.externalAPILoaded(OCM.MappingAPI.GOOGLE_WEB);
    ocm_app.initPlacesAutocomplete();
}
;
function loadGoogleMaps() {
    if (ocm_app.mappingManager.mapOptions.mapAPI != OCM.MappingAPI.GOOGLE_WEB) {
        {
            if (console)
                console.log("Google Maps Web API not selected [" + OCM.MappingAPI[ocm_app.mappingManager.mapOptions.mapAPI] + "]. Loading API anyway.");
        }
    }
    if (ocm_app.appState.isRunningUnderCordova) {
        var mappingManager = ocm_app.mappingManager;
        if (mappingManager.mapOptions.mapAPI != OCM.MappingAPI.GOOGLE_NATIVE) {
            if (window.plugin && plugin.google && plugin.google.maps) {
                plugin.google.maps.Map.isAvailable(function (isAvailable, message) {
                    if (isAvailable) {
                        mappingManager.log("Native maps available, switching API.");
                        mappingManager.setMapAPI(OCM.MappingAPI.GOOGLE_NATIVE);
                        mappingManager.mapAPIReady = true;
                    }
                    else {
                        mappingManager.log("Google Play Services not available, fallback to web maps API");
                    }
                });
            }
            else {
                mappingManager.log("Running under cordova but no native maps plugin available.");
            }
        }
    }
    if (console)
        console.log("Starting load of Google Maps Web API");
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyASE98mCjV1bqG4u2AUHqftB8Vz3zr2sEg&callback=initGoogleMapsCompleted';
    document.body.appendChild(script);
}
window.onload = loadGoogleMaps;
