import { MainBanner } from './sections/MainBanner/MainBanner';
import './index.css';
import './fonts.css';
import './media-queries.css';
import { css } from '@emotion/react';
import { Timer } from './sections/Timer/Timer';
import { SecondaryBanner } from './sections/SecondaryBanner/SecondaryBanner';
import { Map } from './sections/Map/Map';
import { DaySchedule } from './sections/DaySchedule/DaySchedule';
import { Message } from './sections/Message/Message';
import { Form } from './sections/RSPV/RSPV';

const BasicTemplate = () => {
  return (
    <main>
      <MainBanner />
      <SecondaryBanner />
      <Timer />
      <DaySchedule />
      <Map />
      <Message />
      <Form />
      <div
        css={css`
          height: 1000px;
          background: white;
        `}
      >
        ssss
      </div>
    </main>
  );
};

export default BasicTemplate;
