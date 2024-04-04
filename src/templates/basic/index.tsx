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
// import { Photos } from './sections/Photos/Photos';
import { Fade } from 'react-awesome-reveal';
import { PhotosLink } from './sections/PhotosLink/PhotosLink';
import { Global, css } from '@emotion/react';
import { config } from './config';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import { Information } from './sections/Information/Information';
import { Photos } from './sections/Photos/Photos';

const LazyDashboard = lazy(() => import('./dashboard/Dashboard'));

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
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<LazyDashboard />} />
          <Route
            path="*"
            element={
              <Fade triggerOnce>
                <MainBanner />
                <SecondaryBanner />
                <Timer />
                <DaySchedule />
                <Map />
                <Message />
                <Form />
                <Information />
                <Photos />
                <PhotosLink />
              </Fade>
            }
          />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default BasicTemplate;
