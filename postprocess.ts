// Example response
// [
//     {
//       "type": "ActualInterval",
//       "duration": 5,
//       "spotPerKwh": 6.12,
//       "perKwh": 24.33,
//       "date": "2021-05-05",
//       "nemTime": "2021-05-06T12:30:00+10:00",
//       "startTime": "2021-05-05T02:00:01Z",
//       "endTime": "2021-05-05T02:30:00Z",
//       "renewables": 45,
//       "channelType": "general",
//       "tariffInformation": {
//         "period": "offPeak",
//         "season": "summer",
//         "block": 2,
//         "demandWindow": true
//       },
//       "spikeStatus": "none"
//     },
//     {
//       "type": "ForecastInterval",
//       "duration": 5,
//       "spotPerKwh": 6.12,
//       "perKwh": 24.33,
//       "date": "2021-05-05",
//       "nemTime": "2021-05-06T12:30:00+10:00",
//       "startTime": "2021-05-05T02:00:01Z",
//       "endTime": "2021-05-05T02:30:00Z",
//       "renewables": 45,
//       "channelType": "general",
//       "tariffInformation": {
//         "period": "offPeak",
//         "season": "summer",
//         "block": 2,
//         "demandWindow": true
//       },
//       "spikeStatus": "none",
//       "range": {
//         "min": 0,
//         "max": 0
//       }
//     },
//     {
//       "type": "CurrentInterval",
//       "duration": 5,
//       "spotPerKwh": 6.12,
//       "perKwh": 24.33,
//       "date": "2021-05-05",
//       "nemTime": "2021-05-06T12:30:00+10:00",
//       "startTime": "2021-05-05T02:00:01Z",
//       "endTime": "2021-05-05T02:30:00Z",
//       "renewables": 45,
//       "channelType": "general",
//       "tariffInformation": {
//         "period": "offPeak",
//         "season": "summer",
//         "block": 2,
//         "demandWindow": true
//       },
//       "spikeStatus": "none",
//       "range": {
//         "min": 0,
//         "max": 0
//       },
//       "estimate": true
//     }
//   ]

import { readJSON, readCSV, writeCSV } from 'https://deno.land/x/flat@0.0.11/mod.ts'

const json = await readJSON(Deno.args[0])

const csvFilePath = "/3121_prices.csv"
let csvData = await readCSV(csvFilePath)

const currentActualRate = {
    "spot_per_kwh": json[0].spotPerKwh,
    "per_kwh": json[0].perKwh,
    "date": json[0].date,
    "state_time": json[0].startTime,
    "end_time": json[0].endTime,
    "renewables": json[0].renewables,
    "tariff_info_season": json[0].tariffInformation.season,
    "tariff_info_period": json[0].tariffInformation.period,
    "spike_status": json[0].spikeStatus
}

csvData.unshift(currentActualRate);
await writeCSV(csvFilePath, csvData) 

