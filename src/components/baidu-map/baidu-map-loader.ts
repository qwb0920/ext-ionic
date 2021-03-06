let baiduMapIsLoaded = false;
export const baiduMapLoader = (): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    if (baiduMapIsLoaded) {
      resolve();
      return;
    }

    window['baiduMapLoaded'] = () => {
      baiduMapIsLoaded = true;
      resolve();
    };

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'http://api.map.baidu.com/api?v=2.0&ak=DmMSdcEILbFTUHs4QvlcV2G0&callback=baiduMapLoaded';
    script.onerror = () => {
      document.body.removeChild(script);
      reject();
    };
    document.body.appendChild(script);
  });
};