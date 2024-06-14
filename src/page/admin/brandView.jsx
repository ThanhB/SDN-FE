import { Helmet } from "react-helmet";
import BrandTableView from "../../section/Admin/Brand/view/brandview.jsx";

function BrandView() {
  return (
    <>
      <Helmet>
        <title>Brand View</title>
      </Helmet>
      <BrandTableView />
    </>
  );
}
export default BrandView;
