// SubCategory.jsx
const SubCategoryFilter = ({ subCategory, onChangeSubCategory }) => {
  const SUB_CATEGORIES = [
    { value: 'All', label: 'All Products' },
    { value: 'GodStatues', label: 'God Statues' },
    { value: 'MortarPestle', label: 'Mortar & Pestle' },
    { value: 'CuttingBoards', label: 'Cutting Boards' },
    { value: 'TempleMandir', label: 'Temple Mandir' },
    { value: 'PoojaThalis', label: 'Pooja Thalis' }
  ];

  return (
    <div className="py-3">
      <label className="form-check-label">
        <strong>Sub Category</strong>
      </label>
      {SUB_CATEGORIES.map(({ value, label }) => (
        <div className="form-check" key={value}>
          <input
            type="radio"
            id={value}
            value={value}
            className="form-check-input"
            onChange={onChangeSubCategory}
            name="subCategory"
            checked={subCategory === value}
          />
          <label className="form-check-label" htmlFor={value}>
            {label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default SubCategoryFilter;