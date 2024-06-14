import { Helmet } from "react-helmet";
import WatchDetailView from "../../section/Admin/Watch/views";

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