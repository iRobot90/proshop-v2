import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Welcome To Sanaa Art Shop',
  description: 'Bringing the community and art together through one platform',
  keywords: 'sanaa, art, shop, community, art',
};

export default Meta;
