      function initMap() {
        var map = new google.maps.Map(document.getElementById('maplookup'), {
          zoom: 17,
          center: {lat: 42.341876, lng: -71.091273},
          mapTypeControl : false
        });
        var geocoder = new google.maps.Geocoder();

        document.getElementById('address-submit').addEventListener('click', function() {
          geocodeAddress(geocoder, map);
        });
      }

      function geocodeAddress(geocoder, resultsMap) {
        var address = document.getElementById('address-input').value;
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            });

            var lon = results[0].geometry.location.lng();
            var lat = results[0].geometry.location.lat();
            var geohash = encodeGeoHash(lat, lon);
            var celldata = getCellFromGeohash(geohash);
            if(celldata == undefined){
              document.getElementById("data2").innerHTML = "No crime data";
              document.getElementById("data2").style="color: gray;";
              document.getElementById("data1").innerHTML = "No streetlight data";
              document.getElementById("data1").style="color: gray;";
            }
            var lampaverage = 19;
            var crimeaverage = 131;
            if(celldata[4] < crimeaverage){
              document.getElementById("data2").innerHTML = "Crimes reported in area: " + celldata[4];
              document.getElementById("data2").style="color: green;";
              document.getElementById("info2").innerHTML = "This area is safer than average";
              
            }else{
              document.getElementById("data2").innerHTML = "Crimes reported in area: " + celldata[4];
              document.getElementById("data2").style="color: red;";
              document.getElementById("info2").innerHTML = "This area is more dangerous than average";
            }

            if(celldata[5] < lampaverage){
              document.getElementById("data1").innerHTML = "Streetlights in area: " + celldata[5];
              document.getElementById("data1").style="color: red;";
            }else{
              document.getElementById("data1").innerHTML = "Streetlights in area: " + celldata[5];
              document.getElementById("data1").style="color: green;";
            }


          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      }
    
      function getCellFromGeohash(gh){
        for(var geohash in cells){
          if (geohash==gh){
            return cells[geohash];
          }
        }
      }
