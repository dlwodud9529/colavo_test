import express, { Request, Response, NextFunction } from 'express';
import { DB } from "./data-source";

const moment = require('moment-timezone');
const app = express();

app.use(express.json());

app.get('/welcome', (req: Request, res: Response, next: NextFunction) => {
    res.send('welcome!');
});

const PORT = 3000;

app.get('/', (req, res) => {
  res.status(200).send('Success');
});

// ---------------------------------TEST---------------------------------- //
// ---------------------------------TEST---------------------------------- //

app.post('/getTimeSlots', async (req: Request, res: Response) => {
    // 요청시간 이전 예약은 못하게
    // is_ignore_schedule의 값에 따른 결과값
    // is_ignore_workhour의 값에 따른 결과값
    // 매장은 09시에 open, 예약은 23:00까지만 받는다.
    const { start_day_identifier, days, service_duration, timeslot_interval, 
        is_ignore_schedule, is_ignore_workhour, timezone_identifier } = req.body;

    //Unixstamp seconds값 구하기
    //let agreementTime = moment().tz('Asia/Seoul').format('YYYY-MM-DDTHH:mm:ss');
    let agreementTime = Math.floor(moment().tz(timezone_identifier) / 1000);

    //요청한 시간(이후부터 예약을 받아야 한다)
    let requestTime = moment().tz(timezone_identifier).format('HH:mm:ss');

    res.json({ agreementTime, requestTime });
});

// ---------------------------------TEST---------------------------------- //
// ---------------------------------TEST---------------------------------- //

app.listen(PORT, () => {
    console.log(`
  ################################################
  🛡️  Server listening on port: ${PORT}🛡️
  ################################################
`);
});

module.exports = app;