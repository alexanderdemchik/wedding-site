import jsonConfig from '../../../config.json';

interface IBasicTemplateConfig {
  mainBannerBgLink: string;
  targetDate: Date;
  groomName: string;
  groomAvatarLink: string;
  brideName: string;
  brideAvatarLink: string;
  place: string;
  daySchedule: { title: string; time: string; place: string; address: string; icon: string }[];
  message: string[];
  formBackgroundImageLink: string;
}

export const config: IBasicTemplateConfig = { ...jsonConfig, targetDate: new Date(jsonConfig.targetDate) };
