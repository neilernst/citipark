var info = [];
var neighborhoods = [
 "Arlington",
 "Arlington Heights",
 "Beechview",
 "Beltzhoover",
 "Bloomfield",
 "Brighton Heights",
 "Brookline",
 "Carrick",
 "Chartiers City",
 "Crafton Heights",
 "East Carnegie",
 "East Hills",
 "East Liberty",
 "Glen Hazel",
 "Greenfield",
 "Hazelwood",
 "Hill District",
 "Homewood",
 "Knoxville",
 "Lawrenceville",
 "Lincoln-Lemington",
 "Manchester",
 "Morningside",
 "Mt. Oliver",
 "Mt. Washington",
 "North Side",
 "Northview Heights",
 "Oakland",
 "Point Breeze",
 "Polish Hill",
 "Shadyside",
 "Sheraden",
 "South Side",
 "South Side Market House",
 "St. Clair/Knoxville",
 "Troy Hill",
 "West End"];
 
SENIORCOLOR = "#b7b0ff";
JUNIORCOLOR = "#feff9c";
JSON_LOCATIONS = "/locations/json/";

function isFavorite (o)
{
  var vals = new Array();
  if (localStorage.favorites)
  {
    try {
      vals = JSON.parse(localStorage.favorites);
    }
    catch(err) {
      vals = new Array();
      console.log("json parse error " + err.message);
      return false;
    }
  }
  
  
  for (i = 0 ; i < vals.length ; i++)
  {
    obj = vals[i];
    console.log("obj" + obj.title);
    if (obj.id === o.id)
    {
      return true;
    }
  }
  return false;
}



function printFavorites ()
{
  if (! localStorage.favorites)
  {
    return;
  }
  
  var vals = JSON.parse(localStorage.favorites);
 
  for (i = 0 ; i < vals.length ; i++)
  {
    console.log("Favorite " + i + " " + vals[i].title);
  }
}

function updateFavorite (o)
{
  if (isFavorite (o) === true)
  {
    removeFavorite (o);
  }
  else
  {
    addFavorite (o);
  }
}

function removeFavorite (o)
{
  console.log ("remove favorite id " + o.id + " title " + o.title);
  var vals = new Array();
  var foundid = -1;
  
  if (localStorage.favorites)
  {
    try {
      vals = JSON.parse(localStorage.favorites);
    }
    catch(err) {
      vals = new Array();
      console.log("json parse error " + err.message);  
    }
  }
  
  
  for (i = 0 ; i < vals.length ; i++)
  {
    obj = vals[i];
    console.log("obj" + obj.title);
    if (obj.id === o.id)
    {
      foundid = i;
    }
  }
  
  console.log("foundid = " + foundid);

  
  if (foundid != -1)
  {
    if (foundid === vals.length - 1)
    {
      console.log("just pop");

      vals.pop();
    }
    else
    {
      for (i = foundid ; i < vals.length - 1 ; i++)
      {
	
      console.log("replacing " + i + " with " + (i + 1));
	vals[i] = vals[i+1];
      }
    }
  }
  localStorage.favorites = JSON.stringify(vals);
  printFavorites();
//   refreshFavorites();
}

function addFavorite (o)
{
  console.log ("add to favorite id " + o.id + " title " + o.title);
  var vals = new Array();
  if (localStorage.favorites)
  {
    try {
      vals = JSON.parse(localStorage.favorites);
    }
    catch(err) {
      vals = new Array();
      console.log("json parse error " + err.message);  
    }
  }
  
  
  for (i = 0 ; i < vals.length ; i++)
  {
    obj = vals[i];
    console.log("obj" + obj.title);
    if (obj.id === o.id)
    {
      return;
    }
  }
  
  vals[vals.length] = o;
  localStorage.favorites = JSON.stringify(vals);
  printFavorites();
//     refreshFavorites();

}

 $.getJSON(JSON_LOCATIONS, function(data) { 
// $.getJSON( 'locations.json', function(data) { 
  $.each(data.locations, function (i, marker) {
    info[i] = {};
    
    info[i].id = i;
    info[i].type = marker.type;
    info[i].title = marker.title;
    info[i].addr = marker.addr;
    info[i].tel = marker.tel;
    info[i].menu = marker.menu;
    info[i].schedule = marker.schedule;
    info[i].comment = marker.comment;
    info[i].latitude = marker.latitude;
    info[i].longitude = marker.longitude;
  
    //console.log("bla");
    //console.log(marker.content);
  });
});


$( document ).on( "mobileinit", function() {
//apply overrides here
  $.mobile.defaultDialogTransition = 'slide';
  $.mobile.defaultPageTransition = 'slide';
});


$(document).on("pagebeforeshow", function () {
  $("#button-senior").css({backgroundColor:  SENIORCOLOR,  textShadow: "none"});
  $("#button-junior").css({backgroundColor:  JUNIORCOLOR});
});

$(document).on('vclick', '[data-rel=back]', function (e) {
 e.stopImmediatePropagation();
 e.preventDefault();
 history.back();
//  var back = $.mobile.activePage.prev('#pagesearch-result');
//   $.mobile.changePage(back, { 
//     transition: 'slide',
//     reverse: true });
});


$(document).on('vclick', '#button-senior', function (e) {

  e.stopImmediatePropagation();
  e.preventDefault();
  console.log("button senior");
  
        var searchdata = 
      {
	"programtype" 		: 2
      };
      
      
      $("#pagesearch-result").data("searchdata", searchdata);
      
      console.log (this.id);
      //change the page # to second page. 
      //Now the URL in the address bar will read index.html#details-page
      //where #details-page is the "id" of the second page
      //we're gonna redirect to that now using changePage() method
      //	    $.mobile.changePage("#pagedetail");
      $.mobile.changePage("#pagesearch-result");
});



$(document).on('vclick', '#button-junior', function (e) {
  console.log("button junior");
          var searchdata = 
      {
	"programtype" 		: 1
      };
      
      
      $("#pagesearch-result").data("searchdata", searchdata);
      
      console.log (this.id);
      //change the page # to second page. 
      //Now the URL in the address bar will read index.html#details-page
      //where #details-page is the "id" of the second page
      //we're gonna redirect to that now using changePage() method
      //	    $.mobile.changePage("#pagedetail");
      $.mobile.changePage("#pagesearch-result");
});



$(document).on('vclick', '#updatefavorite' , function (e) {
 e.stopImmediatePropagation();
 e.preventDefault();
 o = $("#details-page").data("info");
 updateFavorite (o);
   if (isFavorite (o))
  {
    document.getElementById("updatefavorite").innerHTML = 'Remove from favorites';
  }
  else
  {
    document.getElementById("updatefavorite").innerHTML = 'Add to favorites';
  }
//  $("#details-page").data("info", info[this.id]);
});


function goBackParent(){
     history.back();
}

function compareStrings (string1, string2, ignoreCase) {
    if (ignoreCase) {

            string1 = string1.toLowerCase();
            string2 = string2.toLowerCase();
        
    }

    return string1 === string2;
}

function containsIgnoreCase (string1, string2) {
    string1 = string1.toLowerCase();
    string2 = string2.toLowerCase();
 
    return (string1.indexOf(string2) > -1 );
}



$(document).on("pagebeforeshow", "#pagedetail", function () {
  //get from data - you put this here when the "a" wa clicked in the previous page
  var info = $(this).data("info");
  //string to put HTML in
  var info_view = "";
  //use for..in to iterate through object
  for (var key in info) {
    //Im using grid layout here.
    //use any kind of layout you want.
    //key is the key of the property in the object 
    //if obj = {name: 'k'}
    //key = name, value = k
    info_view += '<div class="ui-grid-a"><div class="ui-block-a"><div class="ui-bar field" style="font-weight : bold; text-align: left;">' + key + '</div></div><div class="ui-block-b"><div class="ui-bar value" style="width : 75%">' + info[key] + '</div></div></div>';
  }
  //add this to html
  $(this).find("[data-role=ui-content]").html(info_view);
});


/*
$(document).on("vclick", "#radio-choice-younth", function () {
  
  $("#radio-choice-younth-label").css({backgroundColor:  "grey",  textShadow: "none"});
  $("#radio-choice-senior-label").css({backgroundColor:  SENIORCOLOR,  textShadow: "none"});
  
}*/



$(document).on("pageinit", "#pagesearch", function () {
 
//   $("#radio-choice-younth").css({color: yellow});
//   $("#radio-choice-younth-label").css({backgroundColor:  JUNIORCOLOR,  textShadow: "none"});
//   $("#radio-choice-senior-label").css({backgroundColor:  SENIORCOLOR,  textShadow: "none"});
  
  $("#target").submit (
    function (event) {
      var searchstr = $("#searchstring").val();
      var seniorradio = $("#radio-choice-senior");
      
      var youthradio = $("#radio-choice-younth");
      var programtype;
//       console.log ("program type" + programtype);
//       console.log("namevalue" + searchstr);
//       console.log("type1" + type1);
//       console.log("type2" + type2);
//       console.log("here1");
       event.preventDefault();
//       console.log("here2");
      
       
//        console.log ("youth program" + youthradio.attr('checked'));
//        console.log ("senior program" + seniorradio.attr('checked'));
//       
      if($('#radio-choice-younth').is(':checked'))
      {
	  programtype = 1;
      }
      else
      {
	  programtype = 2;
      }
      
//       console.log("programtype=" + programtype);
       
      var searchdata = 
      {
	"str" 			: searchstr,
	"programtype" 		: programtype
      };
      
      
      $("#pagesearch-result").data("searchdata", searchdata);
      
      console.log (this.id);
      //change the page # to second page. 
      //Now the URL in the address bar will read index.html#details-page
      //where #details-page is the "id" of the second page
      //we're gonna redirect to that now using changePage() method
      //	    $.mobile.changePage("#pagedetail");
      $.mobile.changePage("#pagesearch-result");
      
    
    }
  );
});

//pageinit event for first page
//triggers only once
//write all your on-load functions and event handlers pertaining to page1
$(document).on("pageinit", "#pagelist", function () {
  
  
  //set up string for adding <li/>
  var li = "";
  // Set the global configs to synchronous 
//   $.ajaxSetup({
//     async: false
//   });
 
  
  for (n = 0 ; n < neighborhoods.length ; n++)
  {  
    li += '<li data-role="list-divider" style="text-align: center; font-size: 1em; font-weight: bold;">' + neighborhoods[n] + '</li>';
    for (i = 0 ; i < info.length ; i++)
    {
       if ((info[i].addr.neighborhood != null) && (info[i].addr.neighborhood.toUpperCase() === neighborhoods[n].toUpperCase()))
       {
	  var colorli;
	  if (info[i].type === 2)
	  {
	    colorli = SENIORCOLOR;
	  }
	  else
	  {
	    colorli = JUNIORCOLOR;
	  }
	  li += '<li><a href="#pagedetail" style="text-shadow: none; background-color: '+colorli+';" id="' + i + '" class="info-go">' + info[i].title + '</a></li>';
       }
    }
  }
  /*
  for (i = 0 ; i < info.length ; i++)
  {
       li += '<li><a href="#pagedetail" id="' + i + '" class="info-go">' + info[i].content + '</a></li>';
  }*/
//   $.getJSON( 'locations.json', function(data) { 
//     $.each(data.locations, function (i, marker) {
//       li += '<li><a href="#pagedetail" id="' + i + '" class="info-go">' + marker.content + '</a></li>';
//     });
//   });
  
  //container for $li to be added
  //$.each(info, function (i, name) {
  //add the <li> to "li" variable
  //note the use of += in the variable
  //meaning I'm adding to the existing data. not replacing it.
  //store index value in array as id of the <a> tag
  //  li += '<li><a href="#" id="' + i + '" class="info-go">' + name.name + '</a></li>';
  //});
  //append list to ul
  $("#locations-list").append(li).promise().done(function () {
    //wait for append to finish - thats why you use a promise()
    //done() will run after append is done
    //add the click event for the redirection to happen to #details-page
//     console.log ("this=" + $(this));
    
    
    $(this).on("click", ".info-go", function (e) {
//       console.log ("e   =" + e);
      e.preventDefault();
      //store the information in the next page's data
      $("#details-page").data("info", info[this.id]);
      
//       console.log (this.id);
      //change the page # to second page. 
      //Now the URL in the address bar will read index.html#details-page
      //where #details-page is the "id" of the second page
      //we're gonna redirect to that now using changePage() method
      //	    $.mobile.changePage("#pagedetail");
      $.mobile.changePage("#details-page");
      
    });
    
    //refresh list to enhance its styling.
    $(this).listview("refresh");
  });
//   $.ajaxSetup({
//     async: true
//   });
  
});


$(document).on("pagebeforeshow", "#pagefav", function () {
  refreshFavorites ();
});


function refreshFavorites ()
{
  var li = "";
  var vals = new Array();
  if (localStorage.favorites)
  {
    try {
      vals = JSON.parse(localStorage.favorites);
    }
    catch(err) {
      vals = new Array();
      console.log("json parse error " + err.message);
      return false;
    }
  }

  $("#favorites-list").empty();
  
  if (vals.length == 0)
  {
    console.log ("length = 0");
    document.getElementById("favorite-warning").style.display = "block";
  }
  else
  {
    document.getElementById("favorite-warning").style.display = "none";

    for ( i = 0 ; i < vals.length ; i++)
    {
      console.log ("Add id " + i + " to the list");
      var classli;
      if (vals[i].type === 2)
      {
	classli = "senioritem";
      }
      else
      {
	classli = "junioritem";
      }
      li += '<li><a href="#pagedetail" id="' + vals[i].id + '" class="info-go">' + vals[i].title + '</a></li>';
    }
    
    $("#favorites-list").append(li).promise().done(function () {
      
    $(this).on("click", ".info-go", function (e) {
      e.preventDefault();
      $("#details-page").data("info", info[this.id]);
      $.mobile.changePage("#details-page");  
      });
      
      $(this).listview("refresh");
    });
  }
}


$(document).on("pagebeforeshow", "#pagesearch-result", function () {
  
  //set up string for adding <li/>
  var li = "";
 
  
  var searchdata = $(this).data("searchdata");
  var listdata;
  var programtype;

  if (searchdata == null)
  {
    
    $.mobile.changePage("#dialog-error");
    
    return;
    
  }
  
  listdata = [];
  $("#search-result-list").html("");
  programtype = searchdata.programtype;
  
  if ((searchdata.str != null) && (searchdata.str.length > 0))
  {
      for (i = 0 ; i < info.length ; i++)
    {
       if ((
	     (containsIgnoreCase(info[i].addr.neighborhood, searchdata.str)) ||
	     (containsIgnoreCase(info[i].title, searchdata.str)) ||
	     (containsIgnoreCase(info[i].addr.city, searchdata.str)) ||
	     (containsIgnoreCase(info[i].addr.street1, searchdata.str)) ||
	     (containsIgnoreCase(info[i].addr.street2, searchdata.str)) ||
	     (containsIgnoreCase(info[i].addr.zipcode, searchdata.str)) 
       ) && (info[i].type == programtype))
       {
	  listdata.push (info[i]);
       }
    }

  }
  else
  {
          for (i = 0 ; i < info.length ; i++)
    {
    if (info[i].type == programtype)
       {
	  listdata.push (info[i]);
       }
    }
  }
//     console.log("length=" + listdata.length);

  if (listdata.length === 0)
  {
    $("#search-result-text").html('<p>There was no match with your search</p><a href="#pagesearch" class="ui-btn ui-corner-all">Return to the Search Page</a>');
  }
  
  
  for (i = 0 ; i < listdata.length ; i++)
    {
      	  var colorli;
	  if (listdata[i].type === 2)
	  {
	    colorli = "#ffa1a1";
	  }
	  else
	  {
	    colorli = "#feffaf";
	  }
	  li += '<li><a href="#pagedetail"  id="' + i + '" class="info-go">' + listdata[i].title + '</a></li>';
      /*
	li += '<li><a href="#pagedetail" id="' + listdata[i].id + '" class="info-go">' + listdata[i].title + '</a></li>'; */ 
    }
  
  /*
  for (i = 0 ; i < info.length ; i++)
  {
       li += '<li><a href="#pagedetail" id="' + i + '" class="info-go">' + info[i].content + '</a></li>';
  }*/
//   $.getJSON( 'locations.json', function(data) { 
//     $.each(data.locations, function (i, marker) {
//       li += '<li><a href="#pagedetail" id="' + i + '" class="info-go">' + marker.content + '</a></li>';
//     });
//   });
  
  //container for $li to be added
  //$.each(info, function (i, name) {
  //add the <li> to "li" variable
  //note the use of += in the variable
  //meaning I'm adding to the existing data. not replacing it.
  //store index value in array as id of the <a> tag
  //  li += '<li><a href="#" id="' + i + '" class="info-go">' + name.name + '</a></li>';
  //});
  //append list to ul
  $("#search-result-list").append(li).promise().done(function () {

    
    
    $(this).on("click", ".info-go", function (e) {
      e.stopImmediatePropagation();
      e.preventDefault();
      $("#details-page").data("info", info[this.id]);
      $.mobile.changePage("#details-page");
      
    });
    
    //refresh list to enhance its styling.
    $(this).listview("refresh");
  });
  
});




$(document).on("pagebeforeshow", "#details-page", function () {
  //get from data - you put this here when the "a" wa clicked in the previous page
  var info = $(this).data("info");
  //string to put HTML in
  var info_view = "";
  //use for..in to iterate through object
  
  //info.addr
  
  //         for (var key in info) {
  //        info_view += '<div class="ui-grid-a"><div class="ui-block-a"><div class="ui-bar field" style="font-weight : bold; text-align: left;">' + key + '</div></div><div class="ui-block-b"><div class="ui-bar value" style="width : 75%">' + info[key] + '</div></div></div>';
  //     }
  if (isFavorite (info))
  {
    document.getElementById("updatefavorite").innerHTML = 'Remove from favorites';
  }
  else
  {
    document.getElementById("updatefavorite").innerHTML = 'Add to favorites';
  }
  
  
  
  if (info.type != null)
  {
    info_view += '<div class="ui-grid-a">';
    info_view += '	<div class="ui-block-a">';
    info_view += '		<div class="ui-bar field" style="font-weight : bold; text-align: left;">';
    info_view += 'Service';
    info_view += '		</div>';
    info_view += '	</div>';
    info_view += '	<div class="ui-block-b">';
    info_view += '		<div class="ui-bar value" style="width : 75%">';

    if (info.type == 1)
    {
      info_view += 'Youth Program (up to 18 and up to 21 for mentally disabled)';
    }
    if (info.type == 2)
    {
      info_view += 'Senior (60+)';
    }
    info_view += '		</div>';
    info_view += '	</div>';
    info_view += '</div>';
  }
  
  
  localStorage.calendar_menu = info.menu;
  
  if ((info.type == 1) && (info.menu != null))
  {
    info_view += '<div class="ui-grid-a">';
    info_view += '	<div class="ui-block-a">';
    info_view += '		<div class="ui-bar field" style="font-weight : bold; text-align: left;">';
    info_view += 'Menu';
    info_view += '		</div>';
    info_view += '	</div>';
    info_view += '	<div class="ui-block-b">';
    info_view += '		<div class="ui-bar value" style="width : 75%">';

    if (info.menu == 1)
    {
      info_view += 'Cold menu - ';
      info_view += '<a href="#view-calendar">see the cold menu schedule</a>';
    }
    else
    {
      info_view += 'Hot Menu - ';
      info_view += '<a href="#view-calendar">see the hot menu schedule</a>';
    }
      
    info_view += '		</div>';
    info_view += '	</div>';
    info_view += '</div>';
  }
  
  
  if ((info.type == 2) )
  {
    info_view += '<div class="ui-grid-a">';
    info_view += '	<div class="ui-block-a">';
    info_view += '		<div class="ui-bar field" style="font-weight : bold; text-align: left;">';
    info_view += 'Menu';
    info_view += '		</div>';
    info_view += '	</div>';
    info_view += '	<div class="ui-block-b">';
    info_view += '		<div class="ui-bar value" style="width : 75%">';
    info_view += '<a href="#view-calendar">see the menu schedule</a>';
    info_view += '		</div>';
    info_view += '	</div>';
    info_view += '</div>';
  }
  
  
  
  
    if (info.schedule != null)
    {
      info_view += '<div class="ui-grid-a">';
    info_view += '	<div class="ui-block-a">';
    info_view += '		<div class="ui-bar field" style="font-weight : bold; text-align: left;">';
    info_view += 'Schedule';
    info_view += '		</div>';
    info_view += '	</div>';
    info_view += '	<div class="ui-block-b">';
    info_view += '		<div class="ui-bar value" style="width : 75%">';
    
    
      for (var day in info.schedule) {
	info_view += '<strong>' + day + ':</strong> ';
	for (i = 0 ; i < info.schedule[day].length ; i++) {
	  if (i > 0)
	  {
	    info_view += ', '
	  }
	  info_view += info.schedule[day][i];
	}
	info_view += '<br/>';
      }
        
    info_view += '		</div>';
    info_view += '	</div>';
    info_view += '</div>';
    }
  
   
  
  if (info.addr != null)
  {
    if (info.addr.neighborhood != null)
    {
      info_view += '<div class="ui-grid-a">';
      info_view += '	<div class="ui-block-a">';
      info_view += '		<div class="ui-bar field" style="font-weight : bold; text-align: left;">';
      info_view += 'Neighborhood';
      info_view += '		</div>';
      info_view += '	</div>';
      info_view += '	<div class="ui-block-b">';
      info_view += '		<div class="ui-bar value" style="width : 75%">';
      
	info_view += info.addr.neighborhood;
      
      info_view += '		</div>';
      info_view += '	</div>';
      info_view += '</div>';
    }
    
    info_view += '<div class="ui-grid-a">';
    info_view += '	<div class="ui-block-a">';
    info_view += '		<div class="ui-bar field" style="font-weight : bold; text-align: left;">';
    info_view += 'Address';
    info_view += '		</div>';
    info_view += '	</div>';
    info_view += '	<div class="ui-block-b">';
    info_view += '		<div class="ui-bar value" style="width : 75%">';
    if (info.addr.street1 != null) 
    {
      info_view += info.addr.street1 + '<br/>';
    }
    
    if (info.addr.street2 != null) 
    {
      info_view += info.addr.street2 + '<br/>';
    }
    
    if (info.addr.city != null) 
    {
      info_view += info.addr.city;
    }
    if (info.addr.zipcode != null) 
    {
      info_view += ', PA' + info.addr.zipcode;
    }
    info_view += ' <br/><a target="blank" href="'+getGoogleMapLink(info.latitude, info.longitude)+'">map it</a>';
    info_view += '		</div>';
    info_view += '	</div>';
    info_view += '</div>';
  }
  
  
  
  
  
  if (info.tel != null)
  {
    info_view += '<div class="ui-grid-a">';
    info_view += '	<div class="ui-block-a">';
    info_view += '		<div class="ui-bar field" style="font-weight : bold; text-align: left;">';
    info_view += 'Tel';
    info_view += '		</div>';
    info_view += '	</div>';
    info_view += '	<div class="ui-block-b">';
    info_view += '		<div class="ui-bar value" style="width : 75%">';
    info_view += '<a href="tel:' + info.tel + '">' + info['tel'] + "</a>";
    info_view += '		</div>';
    info_view += '	</div>';
    info_view += '</div>';
  }
  
  
 
  
  
  
  if (info.comment != null)
  {
    info_view += '<div class="ui-grid-a">';
    info_view += '	<div class="ui-block-a">';
    info_view += '		<div class="ui-bar field" style="font-weight : bold; text-align: left;">';
    info_view += 'Additional Information';
    info_view += '		</div>';
    info_view += '	</div>';
    info_view += '	<div class="ui-block-b">';
    info_view += '		<div class="ui-bar value" style="width : 75%">';
    info_view += info.comment;
    info_view += '		</div>';
    info_view += '	</div>';
    info_view += '</div>';
  }
  
  $(this).find("[data-role=location-title]").html(info.title);
  $(this).find("[data-role=content]").html(info_view);
});

function getGoogleMapLink(lat, long)
{
    if( (navigator.platform.indexOf("iPhone") != -1) 
        || (navigator.platform.indexOf("iPod") != -1)
        || (navigator.platform.indexOf("iPad") != -1))
        return ("maps://maps.google.com/maps?daddr="+lat+","+long+"&amp;ll=");
    else
       return ("http://maps.google.com/maps?daddr="+lat+","+long+"&amp;ll=");
}


$(document).on("pageinit", "#pagemap", function() {
  initializeMap();
});

function initializeMap()
{
//   $('#verify').click(function() {
//     setCurrentLocation2 ();
//   });
  
  
  
  var gmap;
  
  gmap = $('#map_canvas').gmap();
  gmap.bind('init', function() { 
    $.getJSON( JSON_LOCATIONS, function(data) { 
      $.each( data.locations, function(i, marker) {
	
 
	if (marker.type == 1)
	{
	    icon = 'imgs/type1.png';
	}
	else
	{
	   icon = 'imgs/type2.png';
	}
	
	$('#map_canvas').gmap('addMarker', { 
	  'position': new google.maps.LatLng(marker.latitude, marker.longitude), 
	  'icon': new google.maps.MarkerImage(icon,
	  // This marker is 20 pixels wide by 32 pixels tall.
	  new google.maps.Size(30, 30),
	  // The origin for this image is 0,0.
	  new google.maps.Point(0,0),
	  // The anchor for this image is the base of the flagpole at 0,32.
	  new google.maps.Point(0, 32)),
	  'bounds': true 
	}).click(function() {
	  
	  
	  var content = '<h3>' + marker.title + '</h3>';
	  
	  content += '<div>';
	  if (marker.addr != null)
	  {
	    if (marker.addr.street1 != null) 
	    {
	      content += marker.addr.street1 + '<br/>';
	    }
	    
	    if (marker.addr.street2 != null) 
	    {
	      content += marker.addr.street2 + '<br/>';
	    }
	    
	    if (marker.addr.city != null) 
	    {
	      content += marker.addr.city;
	    }
	    if (marker.addr.zipcode != null) 
	    {
	      content += ', PA' + marker.addr.zipcode;
	    }
	  }

	  content += '<div><p style="color: blue;" onclick="openLocationDetails('+i+');">more details</p></div>';
	  
	  content += '</div>';
	  $('#map_canvas').gmap('openInfoWindow', { 'content': content }, this);
	});
      });
    });
  });
  
//   $('#map_canvas').gmap('get', 'map').setCenter(new google.maps.LatLng(40.462417,-79.964370)); 
  
  // $('#map_canvas').gmap('setPosition',{'position': new google.maps.LatLng(40.462417,-79.964370)});
  
  //  	  var clientPosition = new google.maps.LatLng(40.462417,-79.964370);
  
  //  gmap.setPosition (clientPosition);
  
}


function openLocationDetails(index) {
  console.log ("index=" + index);
   $("#details-page").data("info", info[index]);
   $.mobile.changePage("#details-page");
}

function getLocationSuccess(position) {
  Geo.lat = position.coords.latitude;
  Geo.lng = position.coords.longitude;
  populateHeader(Geo.lat, Geo.lng);
  var clientPosition = new google.maps.LatLng(Geo.lat,  Geo.lng);
  
  $('#map_canvas').gmap('get', 'map').setCenter(clientPosition); 
}



function getLocationError(){
  console.log("Geocoder failed");
}



function setCurrentLocation2 ()
{
  //   var clientPosition = new google.maps.LatLng(40.462417,-79.964370);
  //   $('#map_canvas').gmap({ 'center': clientPosition});
  //   $('#map_canvas').gmap().addMarker({'position': clientPosition});
  //   	 $('#map_canvas').gmap('get', 'map').setCenter(new google.maps.LatLng(40.462417,-79.964370)); 
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getLocationSuccess, getLocationError);
  }

  
}


function setCurrentLocation ()
{
  $('#map_canvas').gmap('get', 'map').setCenter(new google.maps.LatLng(40.462417,-79.964370)); 

}

