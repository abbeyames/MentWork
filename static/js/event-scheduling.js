class Event {
    constructor(title, startDate, endDate) {
        this.title = title;
        this.startDate = startDate.split("T")[0];
        this.endDate = endDate.split("T")[0];
        this.description = "N/A";
        this.startTime = startDate.split("T")[1];
        this.endTime = endDate.split("T")[1];
        this.mentorAvailability = false;
    }
    getStartDate() {
        return this.startDate;
    }
    setStartDate(newDate) {
        this.startDate = newDate;
    }
    getEndDate() {
        return this.endDate;
    }
    setEndDate(date) {
        this.endDate = date;
    }
    getTitle() {
        return this.title;
    }
    setTitle(newTitle) {
        this.title = newTitle;
    }
    getDescription() {
        return this.description;
    }
    setDescription(newText) {
        this.description = newText;
    }
    getStartTime() {
        return this.startTime;
    }
    setStartTime(time) {
        this.startTime = time;
    }
    getEndTime() {
        return this.endTime;
    }
    setEndTime(time) {
        this.endTime = time;
    }
    getMentorAvailability() {
        return this.mentorAvailability;
    }
    setMentorAvailability(toggle) {
        this.mentorAvailability = toggle;
    }
}

class RecurringEvent extends Event {
    constructor(title, date, frequency) {
        super(title, date);
        this.frequency = setFrequency(frequency);
    }
    getFrequency() {
        return this.frequency;
    }
    setFrequency(frequency, days) {
        switch (frequency) {
            case 'daily':
                break;
            case 'weekly':
                break;
            case 'monthly':
                break;
        }
    }
}
