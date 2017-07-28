

gpsApp.controller('mapCtrl',['$scope','$http','$timeout','$q',function($scope,$http,$timeout,$q){

  //console.log('map controller');

      var map;
      var mapcount = 0;
      var triangleCoords = [
          {lng: 79.310962557793, lat: 14.027443564282},
          {lng: 79.311507046223, lat: 14.028155271672},
          {lng: 79.311843663454, lat: 14.027824139350},
          {lng: 79.312137365341, lat: 14.027466984305},
          {lng: 79.312799870968, lat: 14.026414382048},
          {lng: 79.312267452478, lat: 14.026275812912},
          {lng: 79.311713576317, lat: 14.026293378018},
          {lng: 79.311397075653, lat: 14.026757877011},
          {lng: 79.311241507530, lat: 14.027159921599}          
        ];
      var flightPlanCoordinates = [];

      var excavator = [
      {id:27771,lng:79.317196,lat:14.026379},
      {id:27771,lng:79.317196,lat:14.026358},
      {id:27771,lng:79.317222,lat:14.02639},
      {id:27771,lng:79.317228,lat:14.026401},
      {id:27771,lng:79.317209,lat:14.026404},
      {id:27771,lng:79.317216,lat:14.026401},
      {id:27771,lng:79.317216,lat:14.0264},
      {id:27771,lng:79.317228,lat:14.026401},
      {id:27771,lng:79.317235,lat:14.0264},
      {id:27771,lng:79.317228,lat:14.026401},
      {id:27771,lng:79.317235,lat:14.0264},
      {id:27771,lng:79.317235,lat:14.026398},
      {id:27771,lng:79.317235,lat:14.026398},
      {id:27771,lng:79.317228,lat:14.026398},
      {id:27771,lng:79.317235,lat:14.0264},
      {id:27771,lng:79.317254,lat:14.026408},
      {id:27771,lng:79.317254,lat:14.026408},
      {id:27771,lng:79.31726,lat:14.026411},
      {id:27771,lng:79.317273,lat:14.02642},
      {id:27771,lng:79.317267,lat:14.026412},
      {id:27771,lng:79.317267,lat:14.026412}

      ];

      $scope.dumpyardNewData = [ //'A Grade Ore Dump',
      [{'lat':14.027443564282,'lng':79.310962557793},{'lat':14.028155271672,'lng':79.311507046223},{'lat':14.027824139350,'lng':79.311843663454},{'lat':14.027466984305,'lng':79.312137365341},{'lat':14.026414382048,'lng':79.312799870968},{'lat':14.026275812912,'lng':79.312267452478},{'lat':14.026293378018,'lng':79.311713576317},{'lat':14.026757877011,'lng':79.311397075653},{'lat':14.027159921599,'lng':79.311241507530}], //B Grade Ore Dump
      [{'lat':14.026548397190,'lng':79.313693046570},{'lat':14.026423489876,'lng':79.313017129898},{'lat':14.027042821307,'lng':79.312577247620},{'lat':14.027703786619,'lng':79.312110543251},{'lat':14.028764189587,'lng':79.310959875584},{'lat':14.029138256949,'lng':79.311460107565},{'lat':14.029460279667,'lng':79.311944246292},{'lat':14.029087513934,'lng':79.312417656183},{'lat':14.028652294536,'lng':79.312815964222},{'lat':14.028052484087,'lng':79.312883019447},{'lat':14.027295237418,'lng':79.313186109066}], //BS Dump-1
      [{'lat':14.032450190221,'lng':79.299252033234},{'lat':14.030810818506,'lng':79.300469756126},{'lat':14.029900051376,'lng':79.302846193314},{'lat':14.029686671126,'lng':79.305823445320},{'lat':14.029764737094,'lng':79.308714866638},{'lat':14.027568471041,'lng':79.309578537941},{'lat':14.026496352484,'lng':79.305850267410},{'lat':14.024086669670,'lng':79.305842220783},{'lat':14.022049088748,'lng':79.304958432913},{'lat':14.022176600728,'lng':79.302486777306},{'lat':14.024102283247,'lng':79.298522472382},{'lat':14.026111221293,'lng':79.296312332153}], /*//BS Dump-2
      [{'lat':14.030951336541,'lng':79.306397438049},{'lat':14.030597439103,'lng':79.308993816376},{'lat':14.026829438397,'lng':79.310088157654},{'lat':14.025944677875,'lng':79.308049678803},{'lat':14.026184084000,'lng':79.306139945984}],*/ //C & D Old Dump
      [{'lat':14.031150837280,'lng':79.308215975761},{'lat':14.030850284973,'lng':79.308293089271},{'lat':14.030175016665,'lng':79.308756440878},{'lat':14.028708675744,'lng':79.309911802411},{'lat':14.029698814696,'lng':79.312365353108},{'lat':14.031796177699,'lng':79.311225414276}], //C & D Ore Dump
      [{'lat':14.034490280873,'lng':79.312641620636},{'lat':14.035460878852,'lng':79.311498999596},{'lat':14.035890230534,'lng':79.309841394424},{'lat':14.035499910857,'lng':79.306783676148},{'lat':14.034529313043,'lng':79.306762218475},{'lat':14.033787700683,'lng':79.308156967163},{'lat':14.031767120098,'lng':79.307658076286},{'lat':14.031163089250,'lng':79.307914227247},{'lat':14.031620747664,'lng':79.310144484043},{'lat':14.032140532018,'lng':79.312416315079}], //Chemical Grade Ore-1
      [{'lat':14.026043533502,'lng':79.313188791275},{'lat':14.025897807975,'lng': 79.312963485718},{'lat':14.025741673379,'lng': 79.312754273415},{'lat':14.025647992571,'lng': 79.312673807144},{'lat':14.025538698245,'lng': 79.312512874603},{'lat':14.025424199373,'lng': 79.312325119972},{'lat':14.025320109439,'lng': 79.312164187431},{'lat':14.025216019458,'lng': 79.312040805817},{'lat':14.025106724927,'lng': 79.311879873276},{'lat':14.025023452869,'lng': 79.311735033989},{'lat':14.024919362753,'lng': 79.311407804489},{'lat':14.024976612322,'lng': 79.310860633850},{'lat':14.025031259625,'lng': 79.310764074326},{'lat':14.025083955227,'lng': 79.310638010502},{'lat':14.025219922833,'lng': 79.310522675514},{'lat':14.025387117339,'lng': 79.310503900051},{'lat':14.025543577458 ,'lng':79.310499876738},{'lat':14.025679056871 ,'lng':79.310546144843},{'lat':14.025783227962 ,'lng':79.310580007732},{'lat':14.025892562830 ,'lng':79.310639854521},{'lat':14.025999275076 ,'lng':79.310755608603},{'lat':14.026057835661 ,'lng':79.310851036571},{'lat':14.026133956267 ,'lng':79.310989945661},{'lat':14.026121759539 ,'lng':79.311472601839},{'lat':14.026047109042 ,'lng':79.311955258017},{'lat':14.026076548158 ,'lng':79.312625668827},{'lat':14.026184948343 ,'lng':79.312891136797},{'lat':14.026105987271 ,'lng':79.313011765480}], //Chemical Grade Ore-2
      [{'lat':14.028135755046 ,'lng':79.311472177505},{'lat':14.027865124319 ,'lng':79.311241507530},{'lat':14.027615311058 ,'lng':79.311048388481},{'lat':14.027542448805 ,'lng':79.310989379883},{'lat':14.027714195506 ,'lng':79.310624599457},{'lat':14.028175438852 ,'lng':79.310249090195},{'lat':14.028688725489 ,'lng':79.309970140457},{'lat':14.028528689474 ,'lng':79.310570955277}], //Parking Point
      [{'lat':14.027797466588 ,'lng': 79.315195083618},{'lat':14.028101926223  ,'lng':79.315479397774},{'lat':14.027896350958  ,'lng':79.316042661667},{'lat':14.026964754412  ,'lng':79.316171407700},{'lat':14.026652486566  ,'lng':79.315710067749},{'lat':14.026361036193  ,'lng':79.315551817417},{'lat':14.026090403373  ,'lng':79.315457940102},{'lat':14.026392263037  ,'lng':79.315173625946},{'lat':14.026548397190  ,'lng':79.314712285996},{'lat':14.026595237415  ,'lng':79.314525872469},{'lat':14.026891891952  ,'lng':79.314425289631},{'lat':14.027214568382  ,'lng':79.314717650414}], //Scania & Dumper Parking
      [{'lat':14.026163266086 ,'lng': 79.314208030701},{'lat':14.025939473392 ,'lng': 79.314910769463},{'lat':14.024781472819 ,'lng': 79.314650595188},{'lat':14.023158961060 ,'lng': 79.314222782850},{'lat':14.023972170072 ,'lng': 79.313558936119}],/* //Volvo Truck Parking Area -1
      [{'lat':14.028198208245 ,'lng': 79.315275549889},{'lat':14.028068097394 ,'lng':79.315881729126},{'lat':14.027594493274 ,'lng':79.316096305847},{'lat':14.027110479261  ,'lng':79.316026568413},{'lat':14.026777393755  ,'lng':79.315565228462},{'lat':14.026912709800  ,'lng':79.314959049225},{'lat':14.027323861908  ,'lng':79.314755201340},{'lat':14.027857317659  ,'lng':79.314857125282}],*/    //Workshop
      [{'lat':14.025819770232 ,'lng':79.314916133881},{'lat':14.024565485549 ,'lng':79.314664006233},{'lat':14.023269557655 ,'lng':79.314283132553},{'lat':14.023099108763 ,'lng':79.315051585436},{'lat':14.023345023536 ,'lng':79.315841495991},{'lat':14.024544667488 ,'lng':79.315811991692},{'lat':14.024946715955 ,'lng':79.315920621157},{'lat':14.025348763718 ,'lng':79.315600097179},{'lat':14.025719583845 ,'lng':79.315301030874}], //WS Dump-1
      [{'lat':14.026621141431 ,'lng':79.307513237000},{'lat':14.025601063367 ,'lng':79.308865070343},{'lat':14.024580980765 ,'lng':79.308736324310},{'lat':14.023651973021 ,'lng':79.308446645737},{'lat':14.024138596594 ,'lng':79.306569099426},{'lat':14.025403292605 ,'lng':79.306118488312},{'lat':14.026459802856 ,'lng':79.306182861328},{'lat':14.026558687803 ,'lng':79.306762218475}], //WS Dump-2
      [{'lat':14.029150617425 ,'lng':79.309240579605},{'lat':14.028401181025 ,'lng':79.308457374573},{'lat':14.028010848596 ,'lng':79.308387637138},{'lat':14.027722002172 ,'lng':79.308374226093},{'lat':14.027143332395 ,'lng':79.308137856424},{'lat':14.026689568395 ,'lng':79.307643994689},{'lat':14.025850671869 ,'lng':79.309456832707},{'lat':14.026779182790 ,'lng':79.309724885970},{'lat':14.027978320864 ,'lng':79.309907108545},{'lat':14.027849510999 ,'lng':79.309905767441},{'lat':14.027974417536 ,'lng':79.309873580933},{'lat':14.028177390514 ,'lng':79.309873580933},{'lat':14.028682219962 ,'lng':79.309540987015}], //WS Dump-3
      [{'lat':14.034261292011 ,'lng':79.301204681397},{'lat':14.034885806551 ,'lng':79.305260181427},{'lat':14.034323743541 ,'lng':79.307226240635},{'lat':14.033709636085 ,'lng':79.308016151190},{'lat':14.031825669045 ,'lng':79.307432770729},{'lat':14.029868825011 ,'lng':79.308029562235},{'lat':14.029920868951 ,'lng':79.304165169597},{'lat':14.031097058856 ,'lng':79.300472438335},{'lat':14.032158747218 ,'lng':79.299738854170},{'lat':14.032637546242 ,'lng':79.300035238266}], //WS Dump-4 IBC
      [{'lat':14.016378637398 ,'lng':79.332296848297},{'lat':14.014661079743 ,'lng':79.331792593002},{'lat':14.014182243197 ,'lng':79.331073760986},{'lat':14.013588900874 ,'lng':79.330269098282},{'lat':14.013203748019 ,'lng':79.329400062561},{'lat':14.013401529295 ,'lng':79.328595399857},{'lat':14.013703405652 ,'lng':79.327737092972},{'lat':14.014192652698 ,'lng':79.327168464661},{'lat':14.014962954444 ,'lng':79.326889514923},{'lat':14.015608340403 ,'lng':79.326556921005},{'lat':14.016160039865 ,'lng':79.326320886612},{'lat':14.017055247491 ,'lng':79.326610565186},{'lat':14.017721446249 ,'lng':79.326900243759},{'lat':14.018054544903 ,'lng':79.327232837677},{'lat':14.018293959262 ,'lng':79.327629804611},{'lat':14.018512554762 ,'lng':79.328091144562},{'lat':14.018741559349 ,'lng':79.328445196152},{'lat':14.018908107996 ,'lng':79.328724145889},{'lat':14.019012200839 ,'lng':79.328949451447},{'lat':14.018980972991 ,'lng':79.329335689545},{'lat':14.018897698709 ,'lng':79.329700469971},{'lat':14.018793605814 ,'lng':79.330108165741},{'lat':14.018741559349 ,'lng':79.330590963364},{'lat':14.018627057084 ,'lng':79.330923557281},{'lat':14.018377233763 ,'lng':79.331213235855}]
      ];
      console.log($scope.dumpyardNewData);

      $scope.excavNewData = [{'lat':14.026379,'lng':79.317222,title:27771},{'lat':14.026116,'lng':79.319529,title:41473},{'lat':14.026448,'lng':79.318645,title:41467},{'lat':14.018201,'lng':79.324285,title:41464},{'lat':14.024616,'lng':79.315066,title:41463},{'lat':14.02655,'lng':79.316504,title:41466},{'lat':14.028336,'lng':79.320012,title:41373},{'lat':14.02487,'lng':79.314912,title:41356},{'lat':14.02704,'lng':79.321955,title:41462},{'lat':14.02701,'lng':79.319628,title:41375},{'lat':14.021422,'lng':79.32304,title:41377}];
      //console.log(triangleCoords.length);
      function initMap(lat,lng) {
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15,
          center: {lat:lat,lng:lng},
          mapTypeId: 'terrain'
        });        
        var flightPath = new google.maps.Polyline({
          path: {lat:lat,lng:lng},
          geodesic: true,
          strokeColor: '#000000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });

        flightPath.setMap(map);
        // animateCircle(line);
        var bermudaTriangle = new google.maps.Polygon({
             /* paths: [
              new google.maps.LatLng(14.026548397190, 79.313693046570),
              new google.maps.LatLng(14.026423489876, 79.313017129898),
              new google.maps.LatLng(14.027042821307, 79.312577247620),
              new google.maps.LatLng(14.027703786619, 79.312110543251),
              new google.maps.LatLng(14.028764189587, 79.310959875584),
              new google.maps.LatLng(14.029138256949, 79.311460107565),
              new google.maps.LatLng(14.029460279667, 79.311944246292),
              new google.maps.LatLng(14.029087513934, 79.312417656183),
              new google.maps.LatLng(14.028652294536, 79.312815964222),
              new google.maps.LatLng(14.028052484087, 79.312883019447),
              new google.maps.LatLng(14.027295237418, 79.313186109066)],*/
             // paths: [{'lat':25.774252,'lng':-80.190262},{'lat':18.466465,'lng':-66.118292},{'lat':32.321384,'lng':-64.75737}],
              paths: $scope.dumpyardNewData,
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 1,
              fillColor: '#FF0000',
              fillOpacity: 0.35,
              name: 'name 1', // dynamic, not an official API property..
              map: map
          });


        var icon = {
            url: "assets/img/Excavator-icon.png", // url
            scaledSize: new google.maps.Size(50, 50), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(0, 0) // anchor
        };

        angular.forEach($scope.excavNewData, function(value,key){
          var start = String.fromCharCode("S".charCodeAt(0));
          var marker1 = new google.maps.Marker({
            position: value,
            map: map,
            title: value.title,
            icon: icon
          });
        });

        

      }

      /*[{'lat':14.026379,'lng':79.317222,title:27771},{'lat':14.026116,'lng':79.319529,title:41473},{'lat':14.026448,'lng':79.318645,title:41467},{'lat':14.018201,'lng':79.324285,title:41464},{'lat':14.024616,'lng':79.315066,title:41463},{'lat':14.02655,'lng':79.316504,title:41466},{'lat':14.028336,'lng':79.320012,title:41373},{'lat':14.02487,'lng':79.314912,title:41356},{'lat':14.02704,'lng':79.321955,title:41462},{'lat':14.02701,'lng':79.319628,title:41375},{'lat':14.021422,'lng':79.32304,title:41377}]*/

      initMap(14.027443564282,79.310962557793);

      function animateCircle(line) {
          var count = 0;
          window.setInterval(function() {
            count = (count + 1) % 200;

            var icons = line.get('icons');
            icons[0].offset = (count / 2) + '%';
            line.set('icons', icons);
        }, 20);
      }
      function movementitem(lat,lng)
      {
          flightPlanCoordinates.push({lat: parseFloat(lat), lng: parseFloat(lng)});
          var flightPath = new google.maps.Polyline({
          path: flightPlanCoordinates,
          geodesic: true,
          strokeColor: '#000000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });
        flightPath.setMap(map);
      }
     
      function checkloading(lat,lng,speed,pre='')
      {
          var status = pre;
          for(var i=0;i<$scope.excavator.length; i++)
          {
              var status = pre;
              var p1 = new google.maps.LatLng(lat, lng);
              var p2 = new google.maps.LatLng(parseFloat($scope.excavator[i].latitude), parseFloat($scope.excavator[i].longitude));      
              var distance = calcDistance(p1, p2);
              if(parseFloat(distance)<=5)
              {
                  if(pre=='Loading Wait')
                  {
                    returnvalue = {'status':'Loading','locationequipmentid':$scope.excavator[i].id};
                    break;
                  }
              }
              else if(parseFloat(distance)>5&&parseFloat(distance)<=10)
              {
                  if(pre=='Empty Haul')
                  {
                    status = 'Loading Wait';
                    returnvalue = {'status':status,'locationequipmentid':''};
                    break;
                  }
              }
              else if(parseFloat(distance)>10)
              {
                  if(pre=='Loading')
                  {
                    status = 'Hauling';
                    returnvalue = {'status':status,'locationequipmentid':''};
                    break;
                  }
              }
          }
          for(var i=0;i<$scope.dumpyard.length; i++)
          {
              var status = pre;
              var p1 = new google.maps.LatLng(lat, lng);
              var p2 = new google.maps.LatLng(parseFloat($scope.dumpyard[i].lat), parseFloat($scope.dumpyard[i].lng));      
              var distance = calcDistance(p1, p2);
              if(parseFloat(distance)<=5)
              {
                  if(pre=='Unloading Wait')
                  {
                    status = 'Unloading';
                    returnvalue = {'status':status,'locationequipmentid':''};
                    break;
                  }
              }
              else if(parseFloat(distance)>5&&parseFloat(distance)<=10)
              {
                  if(pre=='Hauling')
                  {
                    status = 'Unloading Wait';
                    returnvalue = {'status':status,'locationequipmentid':''};
                    break;
                  }
              }
              else if(parseFloat(distance)>10)
              {
                  if(pre=='Unloading')
                  {
                    status = 'Empty Haul';
                    returnvalue = {'status':status,'locationequipmentid':''};
                    break;
                  }
              }
          }
          if(speed==0)
          {
              if(pre=='Unloading Wait'||pre=='Unloading'||pre=='loading Wait'||pre=='loading'||pre=='')
              {
                status = 'Idle';
                returnvalue = {'status':status,'locationequipmentid':''};
              }
          }
          return returnvalue;      
      }
      
      //calculates distance between two points in km's
      function calcDistance(p1, p2) {
        return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2)).toFixed(2);
      }

      /*var str1 = "06:20:45",
    str2 = "10:10:10";

if (str1 > str2)
    alert("Time 1 is later than time 2");
else
    alert("Time 2 is later than time 1");*/

      
     // $scope.vechileIdInp = 41383;

     $scope.getVehicleDetails = function(){
        $scope.loader = true;
        console.log(123);
        $http.get('http://localhost:8080/vehiclemaster').then(function(response){
          //console.log(response.data);
          $scope.vehicleDetails = response.data;
          $scope.loader = false;
        },function(response){
          console.log(response);
          alert('OOPS, Something went wrong...! Check your internet connection');
          $scope.loader = false;
        });

      }
      $scope.getVehicleDetails();

      $scope.getVechileIdFun = function(vid,vname){
        $scope.vechileId = vid;
        $scope.vechileIdInp = vname;
        $('.drop3').removeClass('open');
      }

      $scope.close = function(id){
        $('.'+id).removeClass('open');
      }

      function groupBy( array , f )
      {
        var groups = {};
        array.forEach( function( o )
        {
          var group = JSON.stringify( f(o) );
          groups[group] = groups[group] || [];
          groups[group].push( o );  
        });
        return Object.keys(groups).map( function( group )
        {
          return groups[group]; 
         // console.log(groups[group]);
        })
      }

      $scope.drawPolygon = function(PolygonData){
            var bermudaTriangle = new google.maps.Polygon({
             /* paths: [
              new google.maps.LatLng(14.026548397190, 79.313693046570),
              new google.maps.LatLng(14.026423489876, 79.313017129898),
              new google.maps.LatLng(14.027042821307, 79.312577247620),
              new google.maps.LatLng(14.027703786619, 79.312110543251),
              new google.maps.LatLng(14.028764189587, 79.310959875584),
              new google.maps.LatLng(14.029138256949, 79.311460107565),
              new google.maps.LatLng(14.029460279667, 79.311944246292),
              new google.maps.LatLng(14.029087513934, 79.312417656183),
              new google.maps.LatLng(14.028652294536, 79.312815964222),
              new google.maps.LatLng(14.028052484087, 79.312883019447),
              new google.maps.LatLng(14.027295237418, 79.313186109066)],*/
             // paths: [{'lat':25.774252,'lng':-80.190262},{'lat':18.466465,'lng':-66.118292},{'lat':32.321384,'lng':-64.75737}],
              paths: [{'lat':14.027443564282,'lng':79.310962557793},{'lat':14.028155271672,'lng':79.311507046223},{'lat':14.027824139350,'lng':79.311843663454},{'lat':14.027466984305,'lng':79.312137365341},{'lat':14.026414382048,'lng':79.312799870968},{'lat':14.026275812912,'lng':79.312267452478},{'lat':14.026293378018,'lng':79.311713576317},{'lat':14.026757877011,'lng':79.311397075653},{'lat':14.027159921599,'lng':79.311241507530}],
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 1,
              fillColor: '#FF0000',
              fillOpacity: 0.35,
              name: 'name 1', // dynamic, not an official API property..
              map: map
          });
        
      }

      $scope.newPolygon = [{'lat':14.027443564282,'lng':79.310962557793},
        {'lat':14.028155271672,'lng':79.311507046223},
{'lat':14.027824139350,'lng':79.311843663454},
{'lat':14.027466984305,'lng':79.312137365341},
{'lat':14.026414382048,'lng':79.312799870968},
{'lat':14.026275812912,'lng':79.312267452478},
{'lat':14.026293378018,'lng':79.311713576317},
{'lat':14.026757877011,'lng':79.311397075653},
{'lat':14.027159921599,'lng':79.311241507530}];

//$scope.drawPolygon();


      $scope.exacavPolygon = function(exavData){

        console.log(exavData);
        
        var icon = {
            url: "assets/img/Excavator-icon.png", // url
            scaledSize: new google.maps.Size(50, 50), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(0, 0) // anchor
        };

        var start = String.fromCharCode("S".charCodeAt(0));
        var marker1 = new google.maps.Marker({
          position: exavData,
          map: map,
          title: exavData.title,
          icon: icon
        });
      }

     // $scope.drawPolygon();

      /*var list = [
          {name: "1", lastname: "foo1", age: "16"},
          {name: "2", lastname: "foo", age: "13"},
          {name: "3", lastname: "foo1", age: "11"},
          {name: "4", lastname: "foo", age: "11"},
          {name: "5", lastname: "foo1", age: "16"},
          {name: "6", lastname: "foo", age: "16"},
          {name: "7", lastname: "foo1", age: "13"},
          {name: "8", lastname: "foo1", age: "16"},
          {name: "9", lastname: "foo", age: "13"},
          {name: "0", lastname: "foo", age: "16"}
      ];
      var result = groupBy(list, function(item)
      {
        return [item.age];
      });
      console.log(result);*/


      dumpDyData = [];
      excavDyData = [];
      $scope.vehicleDatas = [];

      $scope.getVehicleFun = function(){
        $scope.loader = true;
        console.log(123);
        var data = {'vechile_id':41383};
        $http.get('http://localhost:8080/getvehicle?vehicle_id='+$scope.vechileId+'&date='+$scope.date+'&shift='+$scope.shiftId).then(function(response){
        //$http.get('http://localhost:8080/getvehicle?vehicle_id='+$scope.vechileId).then(function(response){
          console.log(response.data);
          if(response.data[0].result==1)
          {
            $scope.vehicleDatas = [];
            $timeout.cancel( timer ); 
            $scope.vehicleDynamicDatas = response.data[0].vehiclemaster;
            //console.log($scope.vehicleDynamicDatas);
            $scope.dumpyard = response.data[0].dump_master;
            $scope.excavator = response.data[0].excavaotor;
            $scope.vehicleDataLength = $scope.vehicleDynamicDatas.length;
            var flightPlanCoordinates = [{'lat':parseFloat($scope.vehicleDynamicDatas[0].latitude),'lng':parseFloat($scope.vehicleDynamicDatas[0].longitude)}];
            initMap(parseFloat($scope.vehicleDynamicDatas[0].latitude),parseFloat($scope.vehicleDynamicDatas[0].longitude));
            $scope.play();
            
            var start = String.fromCharCode("S".charCodeAt(0));
            var marker1 = new google.maps.Marker({
              position: {'lat':parseFloat($scope.vehicleDynamicDatas[0].latitude),'lng':parseFloat($scope.vehicleDynamicDatas[0].longitude)},
              map: map,
              title: 'Hello World!',
              icon: "http://maps.google.com/mapfiles/marker" + start + ".png"
            });
            var destination = String.fromCharCode("E".charCodeAt(0));
            var marker2 = new google.maps.Marker({
              position: {'lat':parseFloat($scope.vehicleDynamicDatas[$scope.vehicleDataLength-1].latitude),'lng':parseFloat($scope.vehicleDynamicDatas[$scope.vehicleDataLength-1].longitude)},
              map: map,
              title: 'Hello World!',
              icon: "http://maps.google.com/mapfiles/marker" + destination + ".png"
            });
            $scope.loader = false;
            /*var marker2 = new google.maps.Marker({
              position: {myLatLng},
              map: map,
              title: 'Hello World!'
            });*/

            //$scope.drawPolygon($scope.dumpGrp);
            //console.log($scope.dumpGrp);
          }
          else
          {
            $timeout.cancel( timer ); 
            $scope.vehicleDatas = [];
            $scope.flag = 'stop';
            alert('No Result Found');
            initMap(13.0827,80.2707);
            $scope.loader = false;
          }
        },function(response){
          console.log(response);
          alert('OOPS, Something went wrong...! Check your internet connection');
          $scope.loader = false;
        });

      }
   
     // $scope.getVehicleFun();

     /* $scope.vehicleDynamicDatas = [
      {'gprsRcTime':'5/2/2017 06:00'},
      {'gprsRcTime':'5/2/2017 06:05'},
      {'gprsRcTime':'5/2/2017 06:10'},
      {'gprsRcTime':'5/2/2017 06:30'},
      {'gprsRcTime':'5/2/2017 06:35'},
      {'gprsRcTime':'5/2/2017 06:40'},
      {'gprsRcTime':'5/2/2017 06:50'},
      {'gprsRcTime':'5/2/2017 06:52'},
      {'gprsRcTime':'5/2/2017 07:00'},
      {'gprsRcTime':'5/2/2017 07:05'},
      {'gprsRcTime':'5/2/2017 07:20'},
      {'gprsRcTime':'5/2/2017 07:25'},
      {'gprsRcTime':'5/2/2017 07:26'},
      {'gprsRcTime':'5/2/2017 07:30'},
      {'gprsRcTime':'5/2/2017 07:36'},
      {'gprsRcTime':'5/2/2017 07:40'},
      {'gprsRcTime':'5/2/2017 07:50'},
      {'gprsRcTime':'5/2/2017 08:00'},
      {'gprsRcTime':'5/2/2017 08:12'},
      {'gprsRcTime':'5/2/2017 08:15'},
      {'gprsRcTime':'5/2/2017 08:20'},
      ];
      myLoop();*/

    


    $scope.statusData = [{'status':'Loading Wait'},{'status':'Loading'},{'status':'Hauling'},{'status':'Unloading Wait'},{'status':'Unloading'},{'status':'Empty Haul'},{'status':'Idle'},{'status':'Stop'},{'status':'Stop-Tea Break'},{'status':'Stop-Lunch'},{'status':'Stop-Shift Change'},{'status':'Stop-Breakdown'}];

   
    prevStatus = '';
    $scope.counter = 0;
    $scope.statusChanged = false;
    
    var timer;

       function myLoop(){
       
            timer = $timeout(
                function() { 
                   // console.log( "Timeout executed", Date.now() ); 
                },
                1000
            );

            timer.then(
                function() { 
                    if($scope.counter<$scope.vehicleDataLength)
                    {
                   // console.log( "Timer resolved!");
                      if($scope.statusChanged==false)
                      {
                        getData = checkloading($scope.vehicleDynamicDatas[$scope.counter].latitude,$scope.vehicleDynamicDatas[$scope.counter].longitude,$scope.vehicleDynamicDatas[$scope.counter].speed,prevStatus);
                        returnStatus = getData.status;
                        equipId = getData.locationequipmentid;
                        prevStatus = returnStatus;
                        locationData = $scope.vehicleDynamicDatas[0].name;
                      }
                      else
                      {
                        returnStatus = $scope.newStatus;
                        equipId = $scope.newEquipId;
                        locationData = $scope.newLocation;
                      }
                   
                    movementitem($scope.vehicleDynamicDatas[$scope.counter].latitude,$scope.vehicleDynamicDatas[$scope.counter].longitude);
                    $scope.vehicleDatas.unshift({'vechileId':$scope.vehicleDynamicDatas[$scope.counter].vehicle_id,'attId':$scope.vehicleDynamicDatas[$scope.counter].attribute_id,'gprsRcTime':$scope.vehicleDynamicDatas[$scope.counter].gps_record_time,'lat':$scope.vehicleDynamicDatas[$scope.counter].latitude,'lng':$scope.vehicleDynamicDatas[$scope.counter].longitude,'attribVal':$scope.vehicleDynamicDatas[$scope.counter].attribute_value,'speed':$scope.vehicleDynamicDatas[$scope.counter].speed,'gprsId':$scope.vehicleDynamicDatas[$scope.counter].gps_id,'updatedOn':'5/2/2017 5:40','loadEquiId':equipId,'status': returnStatus,'location':locationData});
                    $scope.timeData = $scope.vehicleDynamicDatas[$scope.counter].gps_record_time;
                    $scope.counter++;
                    myLoop();
                    }
                    else
                    {
                        alert('Completed');
                        $scope.flag = 'stop';
                      //  console.log('loop exited');
                    }

                    /*if($scope.counter<$scope.vehicleDynamicDatas.length)
                    {
                      $scope.vehicleDatas.unshift({'gprsRcTime':$scope.vehicleDynamicDatas[$scope.counter].gprsRcTime});
                      $scope.timeData = $scope.vehicleDynamicDatas[$scope.counter].gprsRcTime;
                      $scope.counter++;
                      myLoop();
                    }else
                    {
                      alert('Completed');
                    }*/
                    

                },
                function() { 
                   // console.log( "Timer rejected!" ); 
                }
            );
        }

        //myLoop();

        // When the DOM element is removed from the page,
        // AngularJS will trigger the $destroy event on
        // the scope. 
        // Cancel timeout
        $scope.$on(
            "$destroy",
            function( event ) { 
                $timeout.cancel( timer ); 
            }
        );

    //$scope.flag = false;
    $scope.play = function(){
        $scope.flag = 'false';
       //setInterval(prepandData, 3000);
        myLoop();
    }
    
    $scope.pause = function(){
        $scope.flag = 'true';
        $timeout.cancel( timer ); 
       // clearInterval(myVar);
    }



    //$scope.shiftDetails = 'Shift 1';
    $scope.getShift = function(sid,data){
       // console.log('hi');
        $scope.shiftDetails = data;
        $scope.shiftId = sid;
        $('.drop1').removeClass('open');
    }

    $scope.getStatus = function(stdata,eqData,locData){
        console.log(stdata);
        $scope.statusChanged = true;
        $scope.vehicleDatas[0].status = stdata;
        $scope.vehicleDatas[0].loadEquiId = eqData;
        $scope.vehicleDatas[0].location = locData;
        $scope.newStatus = stdata;
        $scope.newEquipId = eqData;
        $scope.newLocation = locData;
        $('.drop2').removeClass('open');
    }

    $scope.clearForm = function(){
      $timeout.cancel( timer ); 
      $scope.shiftDetails = '';
      $scope.date = '';
      $scope.vechileIdInp = '';
      $scope.vehicleDatas = [];
      $scope.flag = 'stop';
      initMap(14.027443564282,79.310962557793);
      //alert('No Result Found');
    }

   


}]);

gpsApp.directive('datetimez', function() {
    return {
        restrict: 'A',
        require : 'ngModel',
        link: function(scope, element, attrs, ngModelCtrl) {
          element.datetimepicker({
            dateFormat:'dd/MM/yyyy hh:mm:ss',
            language: 'pt-BR'
          }).on('changeDate', function(e) {
            ngModelCtrl.$setViewValue(e.date);
            scope.$apply();
          });
        }
    };
});

gpsApp.filter('datefilter', function() {
  return function(input,time) {
   
    /*if(typeof (input)!='undefined')
    {
      var res = input.split(" ");
      //console.log(res[1]);
      // console.log(res[1]+' > '+time);
      if(res[1] >= time)
      {
        console.log(res[1]+' > '+time+' = complete');
        return 'complete';
      }
      else
      {
        console.log(res[1]+' > '+time+' = disabled');
        return 'disabled';
      }
      
    }
    else
    {
      console.log('disabled');
      return 'disabled';
    }*/

    return 'disabled';
   
  };
});

