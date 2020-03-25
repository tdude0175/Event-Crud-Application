var displayUpcomingEvents = true;
var EventListContainer = document.getElementById("EventContainer");

if(displayUpcomingEvents)
{
    getEventsToDisplay(displayUpcomingEvents);
}

function ChangeDisplay(changingTo)
{
    displayUpcomingEvents = changingTo;
    EventListContainer.innerHTML = '<h3>Events</h3>'
    if(displayUpcomingEvents)
    {
        getEventsToDisplay(displayUpcomingEvents);
    }
    else
    {
        getEventsToDisplay(displayUpcomingEvents);
    }

}


function getEventsToDisplay(pastOrUpcoming)
{

    fetch("api/Events").
    then((res)=> res.json())
    .then(formattedData =>
        {
            let EventArrayToDisplay = [];
            formattedData.map(Event=>
                {
                    let currentDate = new Date().getTime();
                    let eventDate = new Date(Event.time).getTime();
                    if(pastOrUpcoming){
                    if(eventDate >= currentDate)
                    {
                        EventArrayToDisplay.push(Event);
                    }
                }else
                {
                    if(eventDate < currentDate)
                    {
                        EventArrayToDisplay.push(Event);
                    }
                }
                })
                for(let i =0; i < EventArrayToDisplay.length;i++)
                {
                    let displayAttending = '';
                     if(pastOrUpcoming)
                    {
                        if(EventArrayToDisplay[i].attending)
                        {
                            displayAttending = `you are attending ${EventArrayToDisplay[i].eventTitle}`
                        }
                        else
                        {
                            displayAttending = `you  are attending ${EventArrayToDisplay[i].eventTitle}`
                        }
                    }
                    else if(EventArrayToDisplay[i].attending)
                    {
                        displayAttending = `you attended ${EventArrayToDisplay[i].eventTitle}`
                    }
                    else
                    {
                        displayAttending = `You did not attend ${EventArrayToDisplay[i].eventTitle}`
                    }
                    EventListContainer.innerHTML +=`<div class ="eventItemInTable">
                                                        <b>${displayAttending}</b><br/>
                                                        Location:<i><b>${EventArrayToDisplay[i].location}</b></i>
                                                        Time:<i>${EventArrayToDisplay[i].time}</i>
                                                        <h4>Event Lead:${EventArrayToDisplay[i].eventLead}</h4>
                                                        <button>Edit</button><button>Delete</button>
                                                    </div>`
                }
        })
}

function submitEvent()
{
    console.log("Submitting Event to save");
    var attendaceToSubmit = false;
    if(document.getElementById('isAttending').checked)
    {
        attendaceToSubmit = true;
    }
    else
    {
        attendaceToSubmit = false;
    }
    let dataForSubmittion = 
    {
        EventTitle:document.getElementById('titleToSubmit').value,
        Time:document.getElementById('dateTimeToSubmit').value,
        Location:document.getElementById('locationToSubmit').value,
        isAttending:attendaceToSubmit,
        EventLead:document.getElementById('hostToSubmit').value,
        EventNotes:document.getElementById('eventNotesToSubmit').value
    }
    fetch("api/Events",
    {
        method:'POST',
        headers:
        {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(dataForSubmittion)
    })
}