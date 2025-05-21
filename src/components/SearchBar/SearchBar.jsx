import { Formik, Form, Field } from 'formik';
import { toast } from 'react-hot-toast';
import css from './SearchBar.module.css';

const SearchBar = ({ onSubmit }) => {
  const handleSubmit = (values, actions) => {
    const formattedSearch = values.search.trim().toLowerCase();

    if (!formattedSearch) {
      toast.error('Please enter a search term!');
      return;
    }

    onSubmit(formattedSearch);
    actions.resetForm();
  };

  return (
    <header className={css.searchHeader}>
      <Formik initialValues={{ search: '' }} onSubmit={handleSubmit}>
        <Form>
          <Field className={css.inputSearch} type='text' name='search' autoComplete='off' autoFocus placeholder='Search images and photos' />
          <button className={css.btnSearch} type='submit'>
            Search
          </button>
        </Form>
      </Formik>
    </header>
  );
};

export default SearchBar;
