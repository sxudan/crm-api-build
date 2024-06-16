"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateToEpochSeconds = void 0;
function dateToEpochSeconds(date) {
    const epochMilliseconds = date.getTime(); // Get milliseconds since Unix epoch
    // const epochSeconds = Math.floor(epochMilliseconds / 1000); // Convert to seconds
    return epochMilliseconds;
}
exports.dateToEpochSeconds = dateToEpochSeconds;
