import WidgetBot from "@widgetbot/react-embed";
import clsx from "clsx";
import { useEffect, useState } from "react";

type DiscordChatProps = {
  channelId: string;
  height?: string | number;
  width?: string | number;
  isOpen?: boolean;
};

export const DiscordChat = ({
  channelId,
  height = "800",
  isOpen = true,
}: DiscordChatProps): JSX.Element => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady || !isOpen) return <></>;
  return (
    <div className="w-full md:w-10/12 pb-10">
      <WidgetBot
        server="1048328032290603009"
        channel={channelId}
        height={height}
        style={{ width: "100%" }}
      />
    </div>
  );
};
