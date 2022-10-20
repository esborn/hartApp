import moment from "moment";

export default class DateUtils {
  static getFromString(dateString, lang = "en-gb") {
    moment.locale(lang);

    if (dateString != null) {
      let dateParts = dateString.toString().split("/");

      if (dateParts.length > 1) {
        dateString = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
      }
    }
    let m = moment(dateString).startOf("day");

    return m.isValid() ? m.toDate() : DateUtils.today;
  }

  static getDateOrEmpty(date, lang = "en-gb") {
    return !date || date === "" ? null : DateUtils.getFromString(date, lang);
  }

  static get today() {
    return moment().startOf("day").toDate();
  }

  static format(date, lang = "en-gb") {
    if (!date) return "";

    moment.locale(lang);
    return moment(date).startOf("day").format("L");
  }

  static isBetween(date, start, end) {
    if (date && start && end) {
      let newDate = DateUtils.getDateWithoutTime(date);
      let newStart = DateUtils.getDateWithoutTime(start);
      let newEnd = DateUtils.getDateWithoutTime(end);

      return newStart <= newDate && newDate <= newEnd;
    } else {
      return false;
    }
  }

  static getNumberOfMonths(fromDate, toDate) {
    if (!fromDate) {
      fromDate = DateUtils.today;
    }

    if (!toDate) {
      toDate = DateUtils.today;
    }

    let noOfMonths =
      toDate.getMonth() -
      fromDate.getMonth() +
      12 * (toDate.getFullYear() - fromDate.getFullYear());

    if (toDate.getDate() < fromDate.getDate()) {
      noOfMonths--;
    }

    return noOfMonths;
  }

  static getDateWithoutTime(date, lang = "en-gb") {
    if (!date) {
      date = DateUtils.today;
    }

    moment.locale(lang);

    return moment(date).startOf("day").toDate();
  }

  static getCurrentYear(lang = "en") {
    moment.locale(lang);
    return moment().startOf("day").year();
  }

  static getStartDayQueryFormat(date) {
    return moment.utc(date).startOf("day").format("YYYY-MM-DDT00:00");
  }

  static getEndDayQueryFormat(date) {
    return moment.utc(date).startOf("day").format("YYYY-MM-DDT23:59");
  }

  static getQueryFormat(date) {
    return moment.utc(date).startOf("day").format("YYYY-MM-DDThh:mm");
  }

  static getAllMonths(lang = "en-gb") {
    moment.locale(lang);
    return moment.months();
  }

  static getCurrentMonthName(lang = "en-gb") {
    moment.locale(lang);

    return moment.months()[new Date().getMonth()];
  }

  static getMonthStartDate(year, month, lang = "en-gb") {
    moment.locale(lang);

    return moment([year, month]).toDate();
  }

  static getMonthEndDate(year, month, lang = "en-gb") {
    moment.locale(lang);

    return moment([year, month]).endOf("month").toDate();
  }

  static getDays(date) {
    var dateofvisit = moment(date);
    var today = moment();
    let dayDiff = dateofvisit.diff(today, "days");
    if (dayDiff > 90 || dayDiff < 0) {
      return 0;
    }

    return Math.abs(dayDiff) + 1;
  }

  static getDisplaySoDDays(date) {
    var dateofvisit = moment(date);
    var today = moment();
    let dayDiff = dateofvisit.diff(today, "days");
    if (dayDiff > 90 || dayDiff < 0) {
      return 0;
    }

    return Math.abs(dayDiff) + 1;
  }
  static getDisplaySoDDaysName(date, cat) {
    var Cats = cat;
    var dateofvisit = moment(date);
    var today = moment();
    let dayDiff = dateofvisit.diff(today, "days");
    if (dayDiff > 90 || dayDiff < 1) {
      return "BAU";
    }

    return Cats;
  }

  static getDays2(date) {
    var dateofvisit = moment(date);
    var today = moment();
    let dayDiff = dateofvisit.diff(today, "days");

    return dayDiff + 1;
  }
  static getDaysDifferenceTwoDates(StartDate, EndDate) {
    var date1 = moment(StartDate);
    var date2 = moment(EndDate);
    let dayDiff = date1.diff(date2, "days");

    return dayDiff;
  }
  static getDaysDifference(enddate) {
    var today = moment();
    var edate = moment(enddate);

    let dayDiff = edate.diff(today, "days");
    if (dayDiff > 89) {
      dayDiff = 89;
    }

    return Math.abs(dayDiff) + 1;
  }
  static getDaysDifference2(enddate) {
    var today = moment();
    var edate = moment(enddate);

    let dayDiff = edate.diff(today, "days");

    return dayDiff - 1;
  }
  static getToday() {
    var format = moment(moment()).format("YYYY-MM-DD");
    var new_date = moment(format, "YYYY-MM-DD");
    new_date.add(0, "days");

    return new_date;
  }
  static getCalculatedDays() {
    var format = moment(moment()).format("YYYY-MM-DD");
    var new_date = moment(format, "YYYY-MM-DD");
    new_date.add(90, "days");

    return new_date;
  }

  static CalculateSODDays(startdate) {
    //var format = moment(startdate).format("YYYY-MM-DD");
    var today = moment();
    var format = moment(today).format("YYYY-MM-DD");
    var newdate = moment(format, "YYYY-MM-DD");
    newdate.add(90, "days");

    return newdate;
  }
}
