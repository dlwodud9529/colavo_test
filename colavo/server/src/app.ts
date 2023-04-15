import express, { Request, Response, NextFunction } from 'express';
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
    const { start_day_identifier, days, service_duration, timeslot_interval, 
        is_ignore_schedule, is_ignore_workhour, timezone_identifier } = req.body;

    res.json({ days });
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