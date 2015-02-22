var menuHot 	= [];
var menuCold 	= [];
var menuSenior 	= [];


$.getJSON( '/menus/all', function(data) { 
  $.each(data, function (i, el) {
    var dateString = el.service_date;
    var menuItems = el.items;
    var isHot = el.hot;
    var menuType = el.user_type;
    var res = dateString.split("-"); 
    var year = res[0];
    var month = res[1];
    var day = res[2];
    var startHour = 09;
    var endHour = 13;
    res = day.split("T"); 
    day = res[0];
//     console.log ("handle item " + i);
//     console.log ("year " + year);
//     console.log ("month " + month);
//     console.log ("day   " + day);
    
    if (el.meal_type === "lunch")
    {
      startHour = 11;
      endHour = 14;
    }
    
    if (el.meal_type === "breakfast")
    {
      startHour = 08;
      endHour = 10;
    }
    
    
    
    var event = { "summary" : menuItems, "begin" : new Date(year, month - 1 , day, startHour, 00, 00, 00), "end" : new Date(year, month - 1, day, endHour, 00, 00, 00) };
    
    if (menuType === 1)
    {
      if (isHot)
      {
	menuHot.push(event);
      }
      else
      {
	menuCold.push(event);
      }
    }
    else
    {
	menuSenior.push(event);
    }
//     console.log("bla" + el.date);
    //console.log(marker.content);
  });
});


 $(document).on("pagebeforeshow", "#view-calendar", function () {
   var events = [];
//    console.log ("current type = " + localStorage.calendar_menu);
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