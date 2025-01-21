import { Pagination } from "react-bootstrap";
import PropTypes from "prop-types";

const PagePagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            onPageChange(pageNumber);
        }
    };

    return (
        <Pagination size='lg' className='mb-3 mt-3'>
            <Pagination.Prev
                href='#news'
                onClick={() => handlePageChange(currentPage - 1)}
            />
            {Array.from({ length: totalPages }, (_, index) => (
                <Pagination.Item
                    key={index + 1}
                    href='#news'
                    onClick={() => handlePageChange(index + 1)}
                >
                    {index + 1}
                </Pagination.Item>
            ))}
            <Pagination.Next
                href='#news'
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            />
        </Pagination>
    );
};

// Правильное определение propTypes для PagePagination
PagePagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default PagePagination;