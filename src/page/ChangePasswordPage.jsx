import { Helmet } from "react-helmet";
import ChangePasswordView from "../section/User/views/changePasswordView.jsx";

function ChangePasswordPage() {
    return (
        <>
        <Helmet>
            <title>Change Password</title>
        </Helmet>
        <ChangePasswordView />
        </>
    );
}
export default ChangePasswordPage;