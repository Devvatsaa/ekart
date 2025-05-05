import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(`https://sq8rhv-5000.csb.app/api/products?search=${query}`);
        console.log(res.data);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching search results", err);
      }
    };

    if (query) fetchResults();
  }, [query]);

  return (
    <div>
      <h2>Search Results for "{query}"</h2>
      {products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default SearchResults;
