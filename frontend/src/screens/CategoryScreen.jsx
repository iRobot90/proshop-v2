import React from 'react';
import { Row, Col } from 'react-bootstrap';
//import { useParams } from 'react-router-dom';
import { useGetProductsByCategoryQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import Product from '../components/Product';

const CategoryScreen = ({ category }) => {
  const { data, isLoading, error } = useGetProductsByCategoryQuery({ category });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h1>{category} Products</h1>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={''}
          />
        </>
      )}
    </>
  );
};

export default CategoryScreen;
