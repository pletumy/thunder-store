import Tippy from '@tippyjs/react';
import { AiOutlineSearch } from 'react-icons/ai';
import { LiaFilterSolid, LiaTimesCircleSolid } from 'react-icons/lia';
import { BiLoaderCircle } from 'react-icons/bi';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import { useEffect, useRef, useState } from 'react';
import { useDebounce } from '~/Component/Hook';
import { request } from '~/Untils/request';
import { Input, Loading, MoreBtn, ResultItem, SearchContent, SearchResult, Wrap } from './Search.style';
import { useNavigate } from 'react-router-dom';
function SearchBar() {
    const navigate = useNavigate();
    const inputRef = useRef();
    const [searchValue, setSearchValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const debouncedValue = useDebounce(searchValue, 500);
    const [total, setTotal] = useState();

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setIsLoading(true);

            try {
                const res = await request.post(
                    'products/search',
                    { colorIds: [], categoryIds: [], minPrice: 0, maxPrice: 0 },
                    {
                        params: {
                            keyword: searchValue,
                            limit: 5,
                            page: 1,
                        },
                    },
                );

                setSearchResult(res.data.content.data);
                setTotal(res.data.content.total);
                setIsLoading(false);
            } catch (e) {
                console.log(e);
            }
        };

        fetchApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedValue]);

    const handleCancel = () => {
        reset();
        inputRef.current.focus();
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        inputRef.current.focus();
    };
    const handleMoreOnClick = () => {
        navigate(`/searching?keyword=${searchValue}`);
        reset();
    };

    const reset = () => {
        setSearchValue('');
        setSearchResult([]);
        setTotal(0);
    };
    return (
        <>
            <Wrap>
                <Tippy
                    content={
                        <>
                            <SearchContent onSubmit={(e) => handleSubmit(e)}>
                                <Input>
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={searchValue}
                                        onChange={(e) => setSearchValue(e.target.value)}
                                        name="searchValue"
                                        placeholder="Search product"
                                    />
                                    {searchValue.length > 0 && (
                                        <div className="icon" onClick={handleCancel}>
                                            <LiaTimesCircleSolid />
                                        </div>
                                    )}
                                </Input>
                                <button type="submit" className="icon">
                                    <AiOutlineSearch size={20} />
                                </button>
                            </SearchContent>

                            <SearchResult>
                                {isLoading && (
                                    <Loading className="icon">
                                        <BiLoaderCircle />
                                    </Loading>
                                )}
                                {searchResult.map((item) => (
                                    <ResultItem to={`/details/${item.id}`} key={item.id}>
                                        <div className="img">
                                            <img src={item.images[0].url} alt={item.id} />
                                        </div>
                                        <p className="name">{item.name}</p>
                                        <p className="price">{Number(item.price).toLocaleString('en-US')} VND</p>
                                    </ResultItem>
                                ))}
                                {total >= 5 && (
                                    <MoreBtn to={`/searching?keyword=${searchValue}`} onClick={handleMoreOnClick}>
                                        Xem thêm
                                    </MoreBtn>
                                )}
                            </SearchResult>
                        </>
                    }
                    theme="light"
                    animation="fade"
                    arrow={true}
                    trigger="mouseenter"
                    interactive={true}
                    placement="bottom"
                    maxWidth="auto"
                >
                    <span onClick={handleMoreOnClick} className="icon hover-primary">
                        <AiOutlineSearch size={28} />
                    </span>
                </Tippy>
            </Wrap>
        </>
    );
}

export default SearchBar;
