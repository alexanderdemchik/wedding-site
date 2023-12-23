import { useContext, useState } from 'react';
import { YMapApi } from '../../../../lib/yandexMap/yandexMapApi';
import { YandexMapContext } from '../../../../lib/yandexMap/YandexMapProvider';

import styles from './Map.module.css';
import clsx from 'clsx';

export const Map = () => {
  const { isInitialized } = useContext(YandexMapContext);
  const [isSatelliteView, setIsSatelliteView] = useState(false);

  if (!isInitialized) return null;

  const {
    YMap,
    YMapDefaultSatelliteLayer,
    YMapReactContainer,
    YMapDefaultMarker,
    YMapControls,
    YMapDefaultFeaturesLayer,
    YMapDefaultSchemeLayer,
    YMapOpenMapsButton,
    YMapGeolocationControl,
    YMapZoomControl,
  } = YMapApi;

  return (
    <section className={styles.container}>
      <YMap location={{ center: [24.2670343, 52.2024247], zoom: 10 }} mode="auto" key={isSatelliteView + ''}>
        {!isSatelliteView ? <YMapDefaultSchemeLayer /> : <YMapDefaultSatelliteLayer />}
        <YMapDefaultFeaturesLayer />

        <YMapControls position="right">
          <YMapZoomControl />
          <YMapGeolocationControl />
        </YMapControls>
        <YMapControls position="left bottom">
          <YMapOpenMapsButton />
        </YMapControls>
        <YMapControls position="right top">
          <YMapReactContainer
            tagName="div"
            className={clsx(styles['layers-toggle'], { [styles['layers-toggle-satellite']]: !isSatelliteView })}
          >
            <div onClick={() => setIsSatelliteView(!isSatelliteView)} />
          </YMapReactContainer>
        </YMapControls>
        <YMapDefaultMarker
          coordinates={[24.2670343, 52.2024247]}
          title="Три богатыря"
          onClick={() =>
            window.open(
              'https://yandex.by/maps/org/tri_bogatyrya/78757632868/?ll=24.551693%2C52.198437&utm_source=share&z=10'
            )
          }
        />
      </YMap>
    </section>
  );
};
