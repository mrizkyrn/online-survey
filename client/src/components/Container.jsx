import PropTypes from 'prop-types';

const Container = ({ children }) => {
   return <div className='w-full px-5 sm:px-7 lg:px-10 max-w-3xl'>{children}</div>;
};

Container.propTypes = {
   children: PropTypes.node,
};

export default Container;
