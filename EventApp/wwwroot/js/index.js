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
                                                        <button onclick="editEvent(${EventArrayToDisplay[i].id})" >Edit</button><button onclick="deleteEvent(${EventArrayToDisplay[i].id})">Delete</button>
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

function deleteEvent(eventId)
{
    fetch(`api/Events/${eventId}`,
    {
        method: 'DELETE',
    })
    .then(getEventsToDisplay(pastOrUpcoming))
}


function editEvent(eventId)
{
    EventListContainer.innerHTML = `<h1>Editing Form</h1><button onclick ="ChangeDisplay(${displayUpcomingEvents})" >Cancel</button>`
    let object = fetch(`api/Events/${eventId}`)
    .then(data => data.json())
    .then(revampedData => {
        var checkbox = "";
        if(revampedData.attending)
        {

        checkbox = 
        "<p>Are you going?:<Label>Yes</Label><input check=true id='UpdatedAttending' type='radio' name='updateAttending' value='Yes'><Label>No</Label><input id='UpdatedisNotAttending' type='radio' name='isAttending' value='No'></p>"
        }
        else
        {
            checkbox = 
        "<p>Are you going?:<Label>Yes</Label><input id='UpdatedAttending' type='radio' name='updateAttending' value='Yes'><Label>No</Label><input checked=true id='UpdatedisNotAttending' type='radio' name='isAttending' value='No'></p>"
        }
        EventListContainer.innerHTML += 
        `
        <form action="" onsubmit="UpdateEvent(${eventId});">
                <p><input value="${revampedData.eventTitle}" type="text  name="" id="UpdatedTitle"></p>
                <p><input value="${revampedData.location}" type="text" id="UpdatedLocation"></p>
                <p><input value="${revampedData.time}" type="datetime-local" id='UpdatedDateTime' ></p>
                ${checkbox}
                <p><input value="${revampedData.eventLead}" type="text" id="UpdatedHost"></p>
                <p><input value="${revampedData.eventNotes}" type="textarea"  id="UpdatedNotes"></p>
                <button>Submit</button>
            </form>
        `})

}

function UpdateEvent(eventId)
{
    var attendaceToSubmit = false;
    if(document.getElementById('UpdatedAttending').checked)
    {
        attendaceToSubmit = true;
    }
    else
    {
        attendaceToSubmit = false;
    }
    let dataForSubmittion = 
    {
        Id:eventId,
        EventTitle:document.getElementById('UpdatedTitle').value,
        Time:document.getElementById('UpdatedDateTime').value,
        Location:document.getElementById('UpdatedLocation').value,
        isAttending:attendaceToSubmit,
        EventLead:document.getElementById('UpdatedHost').value,
        EventNotes:document.getElementById('UpdatedNotes').value
    }
    fetch(`api/Events/${eventId}`,
    {
        method:'PUT',
        headers:
        {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(dataForSubmittion)
    })
    .then(ChangeDisplay(displayUpcomingEvents))
}