export interface CardInfo {
    id: string;
    name: string;
    url: string;
    localTimestamp: string;
    FirstImageData: {
      ratio: string;
      url: string;
      width: number;
      height: number;
      fallback: boolean;
    };
    weather: {
        eventId: string | undefined;
        dateTimeString: string | undefined;
        temp: string | undefined;
        icon: string | undefined;
        iconDescription: string | undefined;
    };
}
