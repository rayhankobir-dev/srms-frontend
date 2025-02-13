import { APP_NAME } from "@/config";
import { Helmet } from "react-helmet-async";

interface MetaProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

function Meta({
  title = "Home",
  description = `Welcome to ${APP_NAME}`,
  children,
}: MetaProps) {
  return (
    <Helmet>
      <title>
        {title} - {APP_NAME}
      </title>
      <meta name="description" content={description} />
      {children}
    </Helmet>
  );
}

export default Meta;
