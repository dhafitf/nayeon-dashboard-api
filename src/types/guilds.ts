export type PartialGuilds = {
  id: string;
  name: string;
  icon: string;
  owner: boolean;
  permissions: string;
  features: string[];
};

type notifModels = {
  channel: {
    id: string | null;
    name: string | null;
    type: string | null;
  };
  role: {
    id: string | null;
    name: string | null;
  };
};

export type GuildType = {
  _id: string;
  name: string;
  description: string | null;
  icon: string | null;
  features: string[];
  ownerID: string;
  settings: {
    language: string;
    prefix: string;
  };
  notificationSettings: {
    bubble: notifModels;
    vlive: notifModels;
    instagram: notifModels;
    youtube: notifModels;
    tiktok: notifModels;
    random: notifModels;
  };
  channels: [];
  roles: [
    {
      id: string;
      name: string;
      color: number;
      permissions: number;
      position: number;
      managed: boolean;
      hoist: boolean;
    }
  ];
  embed_messages: [];
  autoResponder: [];
  in: boolean;
};
