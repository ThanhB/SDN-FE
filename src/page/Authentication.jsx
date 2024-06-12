import { Helmet } from "react-helmet";
import { AuthenView } from "../section/authencation/view";

function Authentication() {
  return (
    <>
      <Helmet>
        <title> BlueWatch </title>
      </Helmet>
      <AuthenView />
    </>
  );
}

export default Authentication;
