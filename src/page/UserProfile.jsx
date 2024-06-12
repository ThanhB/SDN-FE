import { Helmet } from "react-helmet";
import {UserProfileView} from "../section/User/views";

function UserProfile() {
    return (
        <>
            <Helmet>
                <title>User Profile</title>
            </Helmet>
            <UserProfileView />
        </>
    )
}
export default UserProfile;
