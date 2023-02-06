import "./styles.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [search, setSearch] = useState();
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    axios.get("https://api.covid19api.com/summary").then((res) => {
      setData(res.data.Countries);
      setData1(res.data.Countries);
      // console.log("data", res.data);
      setIsLoading(true);
    });
  }, []);

  console.log("Data => ", data);
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
    let filterData = [];

    data1.map((item) => {
      let countryName = item.Country;
      // if (countryName.replace(searchValue, "") !== countryName) {
      //   filterData.push(item);
      // }
      if (countryName.includes(searchValue)) {
        filterData.push(item);
      }
    });
    console.log("FilterData = ", filterData);
    setData(filterData);
  };

  return (
    <div className="App">
      <input type="text" value={search} onInput={(e) => handleSearch(e)} />
      <p>{search}</p>
      {(isLoading || search) && (
        <>
          <table>
            {data?.map((item, key) => {
              return (
                <tr>
                  <td>{item.Country}</td>
                  <td>{item.CountryCode}</td>
                  <td>{item.Slug}</td>
                </tr>
              );
            })}
          </table>
        </>
      )}
    </div>
  );
}
