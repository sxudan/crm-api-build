"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStartAndEnd = exports.dateToEpochSeconds = void 0;
function dateToEpochSeconds(date) {
    const epochMilliseconds = date.getTime(); // Get milliseconds since Unix epoch
    // const epochSeconds = Math.floor(epochMilliseconds / 1000); // Convert to seconds
    return epochMilliseconds;
}
exports.dateToEpochSeconds = dateToEpochSeconds;
function getStartAndEnd(date) {
    // Get the first and last day of the provided month's date
    const startOfMonth = new Date(date);
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);
    endOfMonth.setDate(0);
    endOfMonth.setHours(23, 59, 59, 999);
    return {
        startOfMonth,
        endOfMonth
    };
}
exports.getStartAndEnd = getStartAndEnd;
