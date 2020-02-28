var displayUpcomingEvents = true;
var EventListContainer = document.getElementById("EventContainer");

if(displayUpcomingEvents)
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
                    if(eventDate >= currentDate)
                    {
                        EventArrayToDisplay.push(Event);
                    }
                })
                for(let i =0; i < EventArrayToDisplay.length;i++)
                {
                    EventListContainer.innerHTML +=`<div>
                                                        
                                                        <h4>Event Lead:${EventArrayToDisplay[i].eventLead}</h4>
                                                    </div>`
                }
        })
}
