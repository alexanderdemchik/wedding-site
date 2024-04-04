import jsonConfig from '../../../config.json';

interface IBasicTemplateConfig {
  mainBannerBgLink: string;
  targetDate: Date;
  groomName: string;
  groomAvatarLink: string;
  brideName: string;
  brideAvatarLink: string;
  butterflyImageLink: string;
  bucketImageLink: string;
  dividerImageLink: string;
  place: string;
  daySchedule: { title: string; time: string; place: string; address: string; icon: string }[];
  message: string[];
  formBackgroundImageLink: string;
  theme: {
    primaryColor: string;
    primaryColorLight: string;
  };
  information: { title: string; content: string; dressCodeColors: string[] }[];
}

export const config: IBasicTemplateConfig = {
  ...(jsonConfig as unknown as IBasicTemplateConfig),
  targetDate: new Date(jsonConfig.targetDate),
};
