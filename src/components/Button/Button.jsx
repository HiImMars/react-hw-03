import css from './Button.module.css';

export const Button = ({ handleClick }) => {
  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        className={css.ButtonLoadMore}
      >
        Load more..
      </button>
    </div>
  );
};
