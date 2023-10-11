export const Button = ({ onBtnClick }) => {
  return (
    <div>
      <button type="button" onClick={onBtnClick}>
        Load more
      </button>
    </div>
  );
};
