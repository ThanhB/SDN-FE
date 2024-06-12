import { Helmet } from "react-helmet";
import { RegisterView} from "../section/authencation/view";

function SignUp() {
  return (
    <>
      <Helmet>
        <title> BlueWatch </title>
      </Helmet>
      <RegisterView />
    </>
  );
}

export default SignUp;
