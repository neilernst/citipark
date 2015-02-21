var menuHot 	= [];
var menuCold 	= [];
var menuSenior 	= [];

$.getJSON( 'https://citipark.herokuapp.com/menus/json/all', function(data) { 
  $.each(data, function (i, el) {
    var dateString = el.date;
    var menuItems = el.items;
    var menuType = el.type;
    var res = dateString.split("-"); 
    var month = res[0];
    var day = res[1];
    var year = res[2];
    var menuString = "";
    
    for (i = 0 ; i < menuItems.length ; i++)
    {
      if (i > 0)
      {
	 menuString += ", ";
      }
      menuString +=  menuItems[i];
    }
    
    var event = { "summary" : menuString, "begin" : new Date(year, month - 1 , day, 09, 00, 00, 00), "end" : new Date(year, month - 1, day, 10, 00, 00, 00) };
    
    if (menuType == 1)
    {
	menuCold.push(event);
    }
    
    if (menuType == 2)
    {
	menuHot.push(event);
    }
    
    if (menuType == 3)
    {
	menuSenior.push(event);
    }
//     console.log("bla" + el.date);
    //console.log(marker.content);
  });
});


 $(document).on("pagebeforeshow", "#view-calendar", function () {
   var events = [];
   console.log ("current type = " + localStorage.calendar_menu);
  if (localStorage.calendar_menu)
  {
    if (localStorage.calendar_menu == 1)
    {
      document.getElementById("calendar-title").innerHTML = 'Cold Menu';
      events = menuCold;
    }
    if (localStorage.calendar_menu == 2)
    {
      document.getElementById("calendar-title").innerHTML = 'Hot Menu';
      events = menuHot;
    }
    if (localStorage.calendar_menu == 3)
    {
      document.getElementById("calendar-title").innerHTML = 'Senior Menu';
      events = menuSenior;
    }
  }
  else
  {
    document.getElementById("calendar-title").innerHTML = 'Menu';
  }
// $("#view-calendar").live('pageinit', function(event, ui) {
   $("#calendar").jqmCalendar({
      events : events,
      months : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      days : ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      startOfWeek : 0
   });
}) 


// new Date(year, month, day, hours, minutes, seconds, milliseconds) 