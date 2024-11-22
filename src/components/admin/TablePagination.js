import "../../style/components/_tablepagination.scss";
import Pagination from "rc-pagination";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";

const TablePagination = (props) => {
  const { pageSize, onUpdatePage, total, current } = props;
  const divItemRender = (current, type, element) => {
    if (type === "prev") {
      return (
        <div>
          <AiOutlineDoubleLeft />
        </div>
      );
    }
    if (type === "next") {
      return (
        <div>
          <AiOutlineDoubleRight />
        </div>
      );
    }
    return element;
  };

  const onChangePagination = (value) => {
    onUpdatePage(value);
  };

  return (
    <>
      <div className="mb-5 d-flex justify-content-center w-100">
        <Pagination
          onChange={onChangePagination}
          total={total}
          pageSize={pageSize}
          itemRender={divItemRender}
          showTitle={false}
          current={current}
        />
      </div>
    </>
  );
};

export default TablePagination;


