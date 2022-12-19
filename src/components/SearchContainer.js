import { FormRow, FormSelect } from '.'
import { useSelector, useDispatch } from 'react-redux'
import Wrapper from '../assets/wrappers/SearchContainer';
import { handleChange, clearFilters } from '../Features/allJobs/allJobSlice';

const SearchContainer = () => {
  const { isLoading,
    search,
    searchStatus,
    searchType,
    sort,
    sortOptions } = useSelector((store) => store.allJobs);

  const { jobTypeOptions, statusOptions } = useSelector((store) => store.job)

  const dispatch = useDispatch();

  const handleSearch = (e) => {
    if (isLoading) return;
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearFilters());
  };

  return (
    <Wrapper>
      <form className='form'>
        <h4>Search form</h4>
        <div className='form-center'>

          {/*  search by position */}
          <FormRow type="text" name='search' value={search} handleChange={handleSearch} />

          {/*  search by status */}
          <FormSelect labelText='status' name='searchStatus' value={searchStatus}
            handleChange={handleSearch} list={['all', ...statusOptions]} />

          {/*  search by type  */}
          <FormSelect labelText='type' name='searchType' value={searchType}
            handleChange={handleSearch} list={['all', ...jobTypeOptions]} />

          {/* sort */}
          <FormSelect name='sort' value={sort}
            handleChange={handleSearch} list={sortOptions} />

          <button className='btn btn-block btn-danger' disabled={isLoading} onClick={handleSubmit}>
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );

}

export default SearchContainer