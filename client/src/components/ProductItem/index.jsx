import { useEffect } from 'react';
import { Link } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';
import Auth from '../../utils/auth';
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

function ProductItem(item) {
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  const {
    name,
    _id,
    price,
  } = item;

  function donate() {

    getCheckout({
      variables: { products: [_id] },
    });
  }



  return (
    <div className="card px-1 py-1">
      <Link to={`/products/${_id}`}>
        <p>{name}</p>
      </Link>
      <div>
        <span>${price}</span>
      </div>
      {Auth.loggedIn() ? (
              <button onClick={donate}>Donate</button>
            ) : (
              <span>(log in to check out)</span>
            )}
    </div>
  );
}

export default ProductItem;
