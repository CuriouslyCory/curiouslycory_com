import WidgetBot from "@widgetbot/react-embed";
import { useEffect, useState } from "react";

type DiscordChatProps = {
  channelId: string;
  height?: string | number;
  width?: string | number;
};

export const DiscordChat = ({
  channelId,
  height = "800",
  width = "100%",
}: DiscordChatProps): JSX.Element => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) return <></>;
  return (
    <WidgetBot
      server="1048328032290603009"
      channel={channelId}
      width={width}
      height={height}
      style={{ width: "100%" }}
    />
  );
};
