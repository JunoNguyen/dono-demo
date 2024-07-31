import { useEffect } from 'react';
import ProductItem from '../ProductItem';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
import spinner from '../../assets/spinner.gif';

function ProductList() {

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  if (loading) {
    return (
      <h2>Loading...</h2>
    )
  }
  console.log(data);

  return (
    <div className="my-2">
      <h2>Donation Amount:</h2>
      {data.products.length ? (
        <div className="flex-row">
          {data.products.map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
