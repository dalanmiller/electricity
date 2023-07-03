// [
//   {
//     "type": "Usage",
//     "duration": 30,
//     "date": "2023-07-02",
//     "endTime": "2023-07-01T14:30:00Z",
//     "quality": "billable",
//     "kwh": 0.432, # Usage within this time period
//     "nemTime": "2023-07-02T00:30:00+10:00", # Local time
//     "perKwh": 23.52107,
//     "channelType": "general",
//     "channelIdentifier": "E1",
//     "cost": 10.1611, # Cost in cents for this time interval
//     "renewables": 9.486,
//     "spotPerKwh": 12.90683,
//     "startTime": "2023-07-01T14:00:01Z",
//     "spikeStatus": "none",
//     "tariffInformation": {
//       "period": "offPeak"
//     },
//     "descriptor": "veryLow" # "veryLow" is best
//   },

//   ...
// ]

import {
  readCSV,
  readJSON,
  writeCSV,
} from "https://deno.land/x/flat@0.0.15/mod.ts";

const json = await readJSON(Deno.args[0]);

const csvFilePath = "3121_usage.csv";

let csvData: Record<string, unknown>[] = [];
csvData = await readCSV(csvFilePath);

const newRows = [];
for (const item of json) {
  const usageItem = {
    "requested_at": new Date(), // UTC time
    "type": item.type,
    "quality": item.quality,
    "spot_per_kwh": item.spotPerKwh,
    "per_kwh": item.perKwh,
    "kwh_usage_in_timeframe": item.kwh,
    // "date": json[0].date, // Melb/Syd time ?
    "start_time": new Date(item.startTime).toLocaleString("en-AU", {
      timeZone: "Australia/Melbourne",
    }), // UTC converted to Melb
    "end_time": new Date(item.endTime).toLocaleString("en-AU", {
      timeZone: "Australia/Melbourne",
    }), // UTC converted to Melb
    "renewables": item.renewables, // Percentage renewables in grid in that timeframe
    "tariff_info_season": item.tariffInformation?.season,
    "tariff_info_period": item.tariffInformation?.period,
    "spike_status": item.spikeStatus,
    "descriptor": item.descriptor, // Describes the current price. Gives you an indication of how cheap the price is in relation to the average VMO and DMO. Note: Negative is no longer used. It has been replaced with extremelyLow.
  };
  newRows.unshift(usageItem);
}

csvData.unshift(...newRows);
await writeCSV(csvFilePath, csvData);
