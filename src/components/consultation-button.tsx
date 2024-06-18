import { CalendlyLink } from "./calendly-link";

export const ConsultationButton = ({
  title,
}: {
  title: string;
}): JSX.Element => {
  return (
    <CalendlyLink>
      <button className="btn">{title}</button>
    </CalendlyLink>
  );
};
