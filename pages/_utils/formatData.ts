import moment from "moment";

export class FormatDate {
    date: string;
    constructor(dateString: string) {
        this.date = dateString;
    }
    toFullDate() {
        return moment(this.date).format('DD/MM/YY, H:mm');
    }
}