import { Helmet } from "react-helmet";
import {HomeView} from "../section/Home/view";

function HomePage() {
    return (
        <>
        <Helmet>
            <title> BlueWatch </title>
        </Helmet>
        <HomeView />
        </>
    );
}
export default HomePage;
