import express, { Request, Response, NextFunction } from 'express';
import { DB } from "./data-source";
import { eventOp } from "./entity/event";
import { workhour } from "./entity/workhour";

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
    // 요청시간 이전 시간때는 예약은 못하게?(4시에 예약 들어가면 4시 이전은 불가능하도록?)
    // is_ignore_schedule의 값에 따른 결과값(해당 기간에 이미 존재하는 Event을 무시[예약잡힌거 무시])
    // is_ignore_workhour의 값에 따른 결과값(하루 전체를 기간)
    const { start_day_identifier, days, service_duration, timeslot_interval, 
      is_ignore_schedule, is_ignore_workhour, timezone_identifier } = req.body;
    
    // 최종 결과값 전달을 위한 배열 정의
    const DayTimetable = [];

    // Unixstamp seconds값 구하기
    // let agreementTime = moment().tz('Asia/Seoul').format('YYYY-MM-DDTHH:mm:ss');
    // 요청한 당일 0시(Unixstamp seconds)
    let start_of_day = Math.floor(moment(start_day_identifier).tz(timezone_identifier) / 1000);

    // 반환 할 일수 저장할 변수
    let day_modifier = 0;

    // post 요청한 시간(이후부터 예약을 받아야 한다?)
    let requestTime = moment().tz(timezone_identifier).format('HH:mm:ss');

    // 입력받은 days값이 될때까지
    while(day_modifier < days) {
      // 정리된 내용 저장용 객체
      let obj: any = {};
      // 예약 가능 시간 저장용 배열
      let hourAry = [];

      // 이벤트마다 오픈&마감시간이 다르므로 초기화를 반복문 안에서 선언
      let startTime = 0; // 0시
      let endTime = 86400; // 24시

      // 쉬는날은 DB를 참조하여 적용(매주 수요일은 쉽니다 등)
      obj.is_day_off = false;

      // 예약 가능한 시간 만들기
      // step3. Event데이터와 겹치지 않는 Timeslot을 반환, 요일마다 값이 다르다.
      if(!is_ignore_schedule) {
        // 요일값으로 찾기, 반복해야함
        const eventInfo = await DB.manager.findOne(eventOp, {
          where: { key: new Date((start_of_day) * 1000).toString().split(' ')[0] }
        });
        startTime = eventInfo.open_interval;
        endTime = eventInfo.close_interval;
      }

      // is_ignore_schedule값에 따라 start_of_day값이 바뀌므로 확인 이후에 값을 대입
      obj.start_of_day = start_of_day;
      obj.day_modifier = day_modifier;

      // step 2. Workhour와 겹치지 않는 Timeslot을 반환
      // workhour의 값을 가져온 뒤 해당 요일에 맞는 값을 추려내서
      // hourAry에 저장된 값들 중 해당 workhour의 내용을 지운다
      if(!is_ignore_workhour) {
        const workhourInfo = await DB.manager.find(workhour);   
        
        while(startTime < endTime) {
          hourAry.push({
            begin_at : start_of_day + startTime,
            end_at : start_of_day + startTime + service_duration,
          });
          startTime += timeslot_interval;
        }

        // 겹치는 이벤트 제거
        if(workhourInfo.length != 0) {
          for(let i = 0 ; i < workhourInfo.length; i++) {
            hourAry = hourAry.filter(e => e.begin_at != workhourInfo[i].begin_at)
          }    
        }

      } else {
        // 이벤트(step3) 적용된 뒤 배열 생성
        while(startTime < endTime) {
          hourAry.push({
            begin_at : start_of_day + startTime,
            end_at : start_of_day + startTime + service_duration,
          });
          startTime += timeslot_interval;
        }
      }

      obj.timeslots = hourAry;
      DayTimetable.push(obj)
      
      // 하루 추가, 일수 추가
      start_of_day += 86400;
      day_modifier++;
    }

  res.json({ DayTimetable });
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
