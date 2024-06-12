import { Helmet } from "react-helmet";
import {SearchPageView} from "../section/Home/view";

function SearchPage() {
    return (
      <>
        <Helmet>
          <title> BlueWatch </title>
        </Helmet>
        <SearchPageView />
      </>
    );
  }
  
  export default SearchPage;