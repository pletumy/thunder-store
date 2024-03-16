import { AiOutlineSearch } from 'react-icons/ai';
import { LiaTimesCircleSolid } from 'react-icons/lia';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import { useEffect, useRef, useState } from 'react';
import { useDebounce } from '~/Component/Hook';
import { request } from '~/Untils/request';
import { Input, SearchBar, Wrapper, Content, ContentHeader } from './Search.style';
import { ProductsList } from '../Product';
import { styled } from 'styled-components';
import { Pagination } from '../Pagination';
import Sidebar from './Sidebar';
import Recomment from './Recomment';
import { useDispatch } from 'react-redux';
import { isLoading, isNotLoading } from '~/redux/Slide/LoadingSlice';

const InputLage = styled(Input)`
    border: none;
    position: relative;
    &::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: 2px;
        height: 100%;
        background-color: #e7e7e9;
        display: block;
    }
`;
const ResultWrap = styled.div`
    display: flex;
    margin: 20px 0;
    max-height: 600px;
    overflow: auto;
    &::-webkit-scrollbar {
        display: none;
    }
    & {
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none;
    }
`;
function SearchingPage() {
    const dispatch = useDispatch();
    const queryParams = new URLSearchParams(location.search);
    const keyword = queryParams.get('keyword') || '';
    const category = queryParams.get('cate') || 'all';

    const inputRef = useRef();

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 1,
    });

    const [searchValue, setSearchValue] = useState(keyword || '');
    const [searchResult, setSearchResult] = useState([]);

    const [filter, setFilter] = useState({
        colorIds: [],
        categoryIds: [],
        minPrice: 0,
        maxPrice: 0,
    });
    const debouncedValue = useDebounce(searchValue, 500);

    const showPagination = searchResult.length > 0;

    const fetchApi = async (pagination) => {
        let { limit, page } = pagination;
        if (debouncedValue.length > 0) {
            page = 1;
        }
        dispatch(isLoading());
        try {
            const res = await request.post('products/search', filter, {
                params: {
                    keyword: debouncedValue,
                    limit: limit,
                    page: page,
                },
            });

            const content = res.data.content;

            setSearchResult(content.data);
            setPagination((prev) => ({ ...prev, total: content.total, page: content.page, limit: content.limit }));
        } catch (e) {
            console.log(e);
        }
        dispatch(isNotLoading());
    };

    useEffect(() => {
        fetchApi(pagination);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedValue, filter]);

    useEffect(() => {
        setFilter((prev) => ({ ...prev, categoryIds: category !== 'all' ? [category] : [] }));
    }, [category]);

    const handleCancel = () => {
        setSearchValue('');
        inputRef.current.focus();
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        inputRef.current.focus();
    };

    const onNavigateNext = () => {
        fetchApi({ ...pagination, page: pagination.page + 1 });
    };
    const onNavigatePrev = () => {
        fetchApi({ ...pagination, page: pagination.page - 1 });
    };
    const onPageChange = (page) => {
        fetchApi({ ...pagination, page });
    };

    return (
        <Wrapper>
            <Sidebar filter={filter} setFilter={setFilter} setPagination={setPagination} />
            <Content>
                <ContentHeader>
                    <Recomment
                        filter={filter}
                        setFilter={setFilter}
                        setPagination={setPagination}
                        pagination={pagination}
                    />
                    <SearchBar onSubmit={(e) => handleSubmit(e)}>
                        <div className="icon">
                            <AiOutlineSearch size={25} />
                        </div>
                        <InputLage>
                            <input
                                ref={inputRef}
                                type="text"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                name="searchValue"
                                placeholder="Search ..."
                            />
                            {searchValue.length > 0 && (
                                <div className="icon" onClick={handleCancel}>
                                    <LiaTimesCircleSolid />
                                </div>
                            )}
                        </InputLage>
                    </SearchBar>
                </ContentHeader>
                <ResultWrap>
                    <ProductsList products={searchResult} />
                </ResultWrap>
                {showPagination && (
                    <Pagination
                        pagination={pagination}
                        onNavigateNext={onNavigateNext}
                        onNavigatePrev={onNavigatePrev}
                        onPageChange={onPageChange}
                    />
                )}
            </Content>
        </Wrapper>
    );
}

export default SearchingPage;
