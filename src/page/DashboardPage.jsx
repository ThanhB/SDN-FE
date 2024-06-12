import { Helmet } from "react-helmet";
import { DashboardView } from "../section/Admin/Dashboard/view";

function DashboardPage() {
    return (
        <>
        <Helmet>
            <title>Dashboard</title>
        </Helmet>
        <DashboardView />
        </>
    );
}
export default DashboardPage;