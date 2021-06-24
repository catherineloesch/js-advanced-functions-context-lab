/* Your Code Here */

function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: [],

    }
}

function createEmployeeRecords(arrOfArr){
    return arrOfArr.map(e => createEmployeeRecord(e))
}

function createTimeInEvent(dateTimeString) {
    this.timeInEvents.push({
        type: "TimeIn",
        date: dateTimeString.split(" ")[0],
        hour: parseInt(dateTimeString.split(" ")[1], 10)
    })
    return this
}

function createTimeOutEvent(dateTimeString) {
    this.timeOutEvents.push({
        type: "TimeOut",
        date: dateTimeString.split(" ")[0],
        hour: parseInt(dateTimeString.split(" ")[1], 10)
    })
    return this
}

function hoursWorkedOnDate(date) {
    const eventIn = this.timeInEvents.find(e => e.date === date)
    const eventOut = this.timeOutEvents.find(e => e.date === date)
    return (eventOut.hour - eventIn.hour)/100
}

function wagesEarnedOnDate(date){
    const hoursWorked = hoursWorkedOnDate.call(this, date)
    return hoursWorked * this.payPerHour
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function calculatePayroll(employees) {
    const wages = employees.map(function(record) {return allWagesFor.call(record)})
    return wages.reduce((acc, e) => acc + e)
}

function findEmployeeByFirstName(records, firstName) {
    return records.find(element => element.firstName === firstName)
}
