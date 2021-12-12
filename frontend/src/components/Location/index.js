import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Search } from "@mui/icons-material";
import "./location.scss";
import {BASE_API} from "../../constants/url";
import axios from "axios";
import Results from "./Results";


export default function Location() {

  const [cities, setCities] = useState([]);
  const [foundCities, setFoundCities] = useState([]);
  

  const fetchCities = useCallback(async () => {
    const {data} = await axios.get(BASE_API + "/cities?_limit=-1");
    setCities(data);
  }, []);
  
  const searchHandle = async (e) => {
    const searchTag = e.target;
    const searchString = searchTag.value.toLowerCase();
    console.log(searchString);
    if (!searchString) {
      setFoundCities([])
    } else {
      const foundOnes = cities.filter(city => {
        if (Array.isArray(city.name)){
          const foundNames = city.name.filter(name => name.toLowerCase().includes(searchString));
          return foundNames.length > 0;
        } else if (typeof city.name === typeof "a") {
          return city.name.toLowerCase().includes(searchString);
        } else {
          return false;
        }
      });
      setFoundCities(foundOnes);
    }
  } 

  useEffect(() => {
    fetchCities();
    return () => {};
  }, [fetchCities]);

  return (
    <>
      <div id="location">
        <div className="location-icon">
          <Search />
        </div>
        <div className="location-input">
          <input
            placeholder="Tìm địa điểm"
            type="search"
            onChange={searchHandle}
          />
        </div>
      </div>

      <Results cities={foundCities} />
    </>
  );
}
