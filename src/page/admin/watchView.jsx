import { Helmet } from "react-helmet";
import {WatchView} from "../../section/Admin/Watch/views";

function Watch() {
    return (
        <div>
            <Helmet>
                <title>Watch</title>
            </Helmet>
            <WatchView />
        </div>
    )
}

export default Watch;
