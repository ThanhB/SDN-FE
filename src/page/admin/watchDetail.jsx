import { Helmet } from "react-helmet";
import WatchDetailView from "../../section/Admin/Watch/watchDetail.jsx";

function WatchDetail() {
    return (
        <div>
            <Helmet>
                <title>Watch Edit</title>
            </Helmet>
            <WatchDetailView />
        </div>
    );
}
export default WatchDetail;