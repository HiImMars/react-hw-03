import css from './Loader.module.css';

export const Loader = () => {
  return (
    <div>
      {/* <p>Loading...</p> */}
      <span className={css.loader}></span>
    </div>
  );
};
