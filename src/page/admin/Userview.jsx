import { Helmet } from "react-helmet";
import {UserView} from "../../section/Admin/User/views";

function User() {
    return (
        <div>
            <Helmet>
                <title>User</title>
            </Helmet>
            <UserView />
        </div>
    )
}

export default User;
