import Link from "next/link";

type SocialLinkProps = {
  title: string;
  href: string;
  Icon: React.FC;
};

export const SocialLink = ({
  title,
  href,
  Icon,
}: SocialLinkProps): JSX.Element => {
  return (
    <Link href={href} target="_blank">
      <div className="cursor-pointer flex items-center hover:underline text-2xl">
        <Icon />
        <span className="pl-2">{title}</span>
      </div>
    </Link>
  );
};
