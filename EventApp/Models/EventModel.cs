using System;
public class EventModel
{
    public long Id {get;set;}
    public string EventTitle{get;set;}
    public DateTime Time {get;set;}
    public string Location {get; set;}
    public bool Attending {get; set;}
    public string EventLead {get;set;}
    public string EventNotes {get;set;}
}