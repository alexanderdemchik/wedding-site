import { MainBanner } from './sections/MainBanner/MainBanner';
import './index.css';
import './fonts.css';
import './media-queries.css';
import { Timer } from './sections/Timer/Timer';
import { SecondaryBanner } from './sections/SecondaryBanner/SecondaryBanner';
import { Map } from './sections/Map/Map';
import { DaySchedule } from './sections/DaySchedule/DaySchedule';
import { Message } from './sections/Message/Message';
import { Form } from './sections/RSPV/RSPV';
import { Photos } from './sections/Photos/Photos';
import { Fade } from 'react-awesome-reveal';
import { PhotosLink } from './sections/PhotosLink/PhotosLink';
import { Global, css } from '@emotion/react';
import { config } from './config';

const BasicTemplate = () => {
  return (
    <main>
      <Global
        styles={css`
          :root {
            --primary-color: ${config.theme.primaryColor};
            --primary-color-light: ${config.theme.primaryColorLight};
          }
        `}
      />
      <Fade triggerOnce>
        <MainBanner />
        <SecondaryBanner />
        <Timer />
        <DaySchedule />
        <Map />
        <Message />
        <Form />
        <Photos />
        <PhotosLink />
      </Fade>
    </main>
  );
};

export default BasicTemplate;
