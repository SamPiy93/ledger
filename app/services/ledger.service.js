const moment = require("moment");
const paymentTypes = require("../constants/app.constants");
let ledgerRecordArray = [];
module.exports = {
    processLedgerRequest: (
        startDate,
        endDate,
        frequency,
        weeklyAmount,
        timezone
    ) => {
        if (timezone) {
            moment.tz.setDefault((timezone));
        }

        if (paymentTypes.WEEKLY === frequency) {
            return processWeeklyLease(startDate, endDate, weeklyAmount);
        } else if (paymentTypes.FORTNIGHTLY === frequency) {
            return processFortnightlyLease(startDate, endDate, weeklyAmount);
        } else if (paymentTypes.MONTHLY === frequency) {
            return processMonthlyLease(startDate, endDate, weeklyAmount);
        }

    }
}

const processWeeklyLease = (startDate, endDate, weeklyAmount) => {
    const formattedStartDate = setStartOfDay(startDate);
    const formattedEndDate = setEndOfDay(endDate);
    
    const noOfWeeksBetweenDates = formattedEndDate.diff(formattedStartDate, 'weeks');
    const remainingDays = formattedEndDate.diff(formattedStartDate, 'days') % 7;
    ledgerRecordArray = [];

    for (let weekNo = 1; weekNo <= noOfWeeksBetweenDates; weekNo++) {
        let leaseStartDate = addDaysWeeksOrMonths(formattedStartDate, weekNo - 1, 'week');
        let leaseEndDate;
        leaseEndDate = addDaysWeeksOrMonths(leaseStartDate, 1, 'week');
        
        ledgerRecordArray.push(getLedgerRecord(leaseStartDate, leaseEndDate, weeklyAmount));
        
        if (weekNo === noOfWeeksBetweenDates) {
            processLastPaymentOfLease(leaseEndDate, remainingDays, weeklyAmount);
        }
    }

    return ledgerRecordArray;

}

const processFortnightlyLease = (startDate, endDate, weeklyAmount) => {
    const formattedStartDate = setStartOfDay(startDate);
    const formattedEndDate = setEndOfDay(endDate);
    
    const noOfFortnightsBetweenDates = parseInt(formattedEndDate.diff(formattedStartDate, 'weeks') / 2);
    const remainingDays = formattedEndDate.diff(formattedStartDate, 'days') % 14;
    ledgerRecordArray = [];

    for (let fortNightNo = 1; fortNightNo <= noOfFortnightsBetweenDates; fortNightNo++) {
        let leaseStartDate = addFortnightWeeks(formattedStartDate, fortNightNo - 1, 'week');
        let leaseEndDate;
        leaseEndDate = addFortnightWeeks(leaseStartDate, 1);
        
        ledgerRecordArray.push(getLedgerRecord(leaseStartDate, leaseEndDate, weeklyAmount * 2));
        
        if (fortNightNo === noOfFortnightsBetweenDates) {
            processLastPaymentOfLease(leaseEndDate, remainingDays, weeklyAmount);
        }
    }

    return ledgerRecordArray;
}

const processMonthlyLease = (startDate, endDate, weeklyAmount) => {
    const formattedStartDate = setStartOfDay(startDate);
    const formattedEndDate = setEndOfDay(endDate);
    const noOfMonthsBetweenDates = formattedEndDate.diff(formattedStartDate, 'months');
    ledgerRecordArray = [];
    
    for (let monthNo = 1; monthNo <= noOfMonthsBetweenDates; monthNo++) {
        let leaseStartDate = addDaysWeeksOrMonths(formattedStartDate, monthNo - 1, 'month');
        let leaseEndDate = addDaysWeeksOrMonths(leaseStartDate, 1, 'month');
        
        ledgerRecordArray.push(getLedgerRecord(leaseStartDate, leaseEndDate, ((weeklyAmount / 7) * 365 / 12)));
        
        if (monthNo === noOfMonthsBetweenDates) {
            const remainingDays = formattedEndDate.diff(leaseEndDate, 'days');

            processLastPaymentOfLease(leaseEndDate, remainingDays, weeklyAmount);
        }
    }

    return ledgerRecordArray;

}

processLastPaymentOfLease = (leaseEndDate, remainingDays, weeklyAmount) => {
    leaseStartDate = leaseEndDate;
    leaseEndDate = addDaysWeeksOrMonths(leaseEndDate, remainingDays, 'days');
    leaseForRemainingDays = (weeklyAmount) / 7 * remainingDays;
    
    if (leaseForRemainingDays > 0) {

        ledgerRecordArray.push(getLedgerRecord(leaseStartDate, leaseEndDate, leaseForRemainingDays));
    }
}


getLedgerRecord = (startDate, endDate, lineAmount) => {
    return {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        lineAmount: parseAmount(lineAmount, 2)
    }
}

addFortnightWeeks = (date, noOfFortnights) => {
    return moment(date).add(noOfFortnights * 2, 'week');
}

addDaysWeeksOrMonths = (date, noOfDaysOrWeeks, type = 'days') => {
    return moment(date).add(noOfDaysOrWeeks, type);
}

setStartOfDay = (date) => {
    return moment(date).startOf('day');
}

setEndOfDay = (date) => {
    return moment(date).endOf('day');
}

formatDate = (date) => {
    return moment(date).locale('en').format('MMMM Do, YYYY');
}

parseAmount = (amount, decimalPlaces) => {
    return parseFloat(parseFloat(amount).toFixed(decimalPlaces));
}