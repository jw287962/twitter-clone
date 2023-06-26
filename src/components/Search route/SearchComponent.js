import Left from "../Left";
import Middle from "../Middle";
import Right from "../Right";

import { useRef } from "react";
import { useLocation } from "react-router-dom";

export const SearchComponent = () => {
  const location = useLocation();

  const searchTerm = useRef(location.search.substring(1));

  return (
    <div className="App">
      <Left></Left>
      <Middle searchTerm={searchTerm.current}></Middle>
      <Right></Right>
    </div>
  );
};
