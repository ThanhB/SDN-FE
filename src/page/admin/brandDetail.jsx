import { Helmet } from "react-helmet";
import BrandDetail from "../../section/Admin/Brand/view/brandDetailView";

function BrandDetailPage() {
    return (
        <>
        <Helmet>
            <title>Brand Detail</title>
        </Helmet>
        <BrandDetail />
        </>
    );
}

export default BrandDetailPage;