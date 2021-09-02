import React, { useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { Image, } from 'semantic-ui-react';
import localforage from 'localforage';
import * as Base64ImageData from './Base64ImageData';



interface IMaskImageThumbProps {
  ipfsThumb: string;
}

const MaskImageThumb: React.FC<IMaskImageThumbProps> = ({ ipfsThumb }) => {
  const [imageData, setImageData] = useState<any>();
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  useEffect((): any => {
    return fetch(`https://ipfs.io/ipfs/${ipfsThumb}`)
      .then(response => response.blob())
      .then((data) => {
        const outside = URL.createObjectURL(data)
        setImageData(outside);
        setImageLoaded(true);
      }).catch(() => null); // TODO вторая загрузка по другой ссылке если первая завершилась ошибкой
    if (isMobile) {
    }

    if (!imageData) {
      localforage.getItem(ipfsThumb)
        .then((savedImageData) => { // blob
          if (!savedImageData) {
            return fetch(`https://ipfs.io/ipfs/${ipfsThumb}`)
              .then(response => response.blob())
              .then((data) => {
                const outside = URL.createObjectURL(data)
                setImageData(outside);
                setImageLoaded(true);
                localforage.setItem(ipfsThumb, data); // blob
              }).catch(() => null); // TODO вторая загрузка по другой ссылке если первая завершилась ошибкой
          } else {
            const outside = URL.createObjectURL(savedImageData);
            setImageData(outside);
            setImageLoaded(true);
          }
        });
    }
  }, []);

  if (imageLoaded)
    return (<Image size='big' src={imageData} />);
  else
    return (<Image size='big' src={Base64ImageData.getMaskSecretThumb()} />);
};

export default MaskImageThumb;
