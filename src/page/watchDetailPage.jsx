import { Helmet } from "react-helmet";
import { WatchDetailView } from "../section/Home/view";

function WatchDetail() {
  return (
    <>
      <Helmet>
        <title> FPT </title>
      </Helmet>
      <WatchDetailView />
    </>
  );
}

export default WatchDetail;
