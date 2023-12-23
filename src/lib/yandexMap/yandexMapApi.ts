import React from 'react';

import ReactDOM from 'react-dom';

export let YMapApi: Awaited<ReturnType<typeof _init>>;

async function _init() {
  await ymaps3.ready;

  const ymaps3Reactify = await ymaps3.import('@yandex/ymaps3-reactify');
  const markers = await ymaps3.import('@yandex/ymaps3-markers@0.0.1');

  // @ts-ignore
  const reactify = ymaps3Reactify.reactify.bindTo(React, ReactDOM);

  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapDefaultSatelliteLayer,
    YMapDefaultFeaturesLayer,
    YMapMarker,
    YMapControls,
    YMapReactContainer,
    YMapListener,
  } = reactify.module(ymaps3);

  const { YMapZoomControl, YMapGeolocationControl } = reactify.module(
    await ymaps3.import('@yandex/ymaps3-controls@0.0.1')
  );

  const { YMapDefaultMarker } = reactify.module(markers);

  const { YMapOpenMapsButton } = reactify.module(await ymaps3.import('@yandex/ymaps3-controls-extra'));

  return {
    YMap,
    YMapDefaultSchemeLayer,
    YMapDefaultSatelliteLayer,
    YMapDefaultFeaturesLayer,
    YMapMarker,
    YMapControls,
    YMapZoomControl,
    YMapGeolocationControl,
    YMapOpenMapsButton,
    YMapDefaultMarker,
    YMapReactContainer,
    YMapListener,
  };
}

export async function init() {
  YMapApi = await _init();
}
