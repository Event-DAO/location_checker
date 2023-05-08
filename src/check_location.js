
// implement in javascript

navigator.geolocation.getCurrentPosition(function(position) {
        console.log("Latitude is :");
        console.log("", position.coords.latitude,",", position.coords.longitude);
  
        // get muze locations
        var lt1 = 0; // latitude of the destination
        var ln1 = 0; // longitude of the destination
        var adres = "";
        var data = "";
        const fetchCoord = async () => {
          try {
            // get your destination data from any database. Following row is just react data fetch example. You need to manupilate it according your datbase source
            const response = await axios.get(server+"/locations/" + destID);
  
            // console.log("fetchCoord response: ", response);
            
            lt1 = response.data[0].Lat;
            ln1 = response.data[0].Long;
            
            
            // calculate distance
            var lt = position.coords.latitude;
            // var lt1 = muze_coors[0];
            var ln = position.coords.longitude;
            // var ln1 = muze_coors[1];
            var dLat = (lt - lt1) * Math.PI / 180;
            var dLon = (ln - ln1) * Math.PI / 180;
            var a = 0.5 - Math.cos(dLat) / 2 + Math.cos(lt1 * Math.PI / 180) * Math.cos(lt * Math.PI / 180) * (1 - Math.cos(dLon)) / 2;
            var d = Math.round(6371000 * 2 * Math.asin(Math.sqrt(a)));
  
            
            console.log("Distance is :", d, " meters");
            
          }catch (error) {
            console.log("distance calculation error: "+error);
          }
        };
        fetchCoord();
  
        
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
      
    }
