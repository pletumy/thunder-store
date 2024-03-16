import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductsList } from '~/Component/Layout/Product';
import { Pagination } from '~/Component/Layout/Pagination';
import {
    getAllProducts,
    getCurrentPage,
    getPageAllProduct,
    getPerPage,
    getTotalProducts,
} from '~/redux/Selector/ProductSelector';
import { onChangePage, onNavigateNext, onNavigatePrev } from '~/redux/Slide/AllProductSlice';

function Discover() {
    const products = useSelector(getPageAllProduct);
    const total = useSelector(getTotalProducts);
    const limit = useSelector(getPerPage);
    const dispatch = useDispatch();
    const currentPage = useSelector(getCurrentPage);

    const [pagination, setPagination] = useState({
        page: currentPage,
        limit: limit,
        total: total,
    });

    const onNext = () => {
        dispatch(onNavigateNext());
        setPagination((prev) => ({ ...prev, page: ++prev.page }));
    };
    const onPrev = () => {
        dispatch(onNavigatePrev());
        setPagination((prev) => ({ ...prev, page: --prev.page }));
    };
    const onPageChange = (page) => {
        dispatch(onChangePage(page));
        setPagination((prev) => ({ ...prev, page }));
    };

    return (
        <div className="container">
            <p className="heading-section">
                <span>Khám phá</span>
            </p>
            <div className="d-flex">
                <ProductsList products={products} />
            </div>
            {total !== 0 ? (
                <Pagination
                    pagination={{ total, limit, page: currentPage }}
                    onNavigateNext={onNext}
                    onNavigatePrev={onPrev}
                    onPageChange={onPageChange}
                />
            ) : (
                ''
            )}
        </div>
    );
}

export default Discover;
