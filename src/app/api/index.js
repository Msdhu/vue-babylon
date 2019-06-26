// import axios from 'axios';

export function getProInfo({ isApp }) {
  return new Promise(resolve => {
    const proInfo = {
      projectName: 'Vue_Babylon',
      creator: 'M27',
    };
    if (isApp) {
      setTimeout(() => {
        resolve({ data: { proInfo: { ...proInfo, projectName: 'Vue_Babylon_App' } } });
      }, 1000);
    } else {
      resolve({ data: { proInfo } });
    }
  });
}
