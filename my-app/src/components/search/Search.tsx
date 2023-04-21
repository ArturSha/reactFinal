import { useEffect, useRef, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getSearchingMovies } from '../../redux/reducers/search/searchReducer';
import { SearchItem } from './SearchItem';
import './search.scss';

export const Search = () => {
  const [searhOpen, setSearchOpen] = useState<boolean>(false);

  const [search, setSearch] = useState<string | null>(null);

  const searchRes = useAppSelector(
    (state) => state.searchListReducer.searchList
  );

  const searchRef = useRef<HTMLDivElement>(null);

  const handleInputOnClick = () => {
    setSearchOpen(true);
  };

  const handleOnClick = () => {
    setSearchOpen(false);
  };

  const debouncedSearch = useDebounce(search, 500);

  const language = localStorage.getItem('language');

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (search) {
      dispatch(getSearchingMovies(search));
    }
  }, [debouncedSearch, language]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div ref={searchRef}>
      <input
        type='search'
        placeholder='Search'
        onClick={handleInputOnClick}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      {searhOpen && search ? (
        <div className='container-search'>
          {searchRes.map((item) => {
            return (
              <SearchItem key={item.id} {...item} closeList={handleOnClick} />
            );
          })}
        </div>
      ) : null}
    </div>
  );
};
