import React, { useEffect } from "react";

import "./styles.scss";
import { useTable } from "react-table";
import { generateParamsForReactTable } from "../../../../services/utils/utils";
import Heading from "../../../ui-kit/texts/Heading/Heading";
import {DataAttrHeadingLevel, DataAttrSize} from "../../../../services/consts/common";

import Desc from "../../../ui-kit/texts/Desc/Desc";
import cn from "classnames";
import PropTypes from "prop-types";
import TablePrimary from "../TablePrimary/TablePrimary";


/**
 * Заголовок Secondary таблицы
 * @param header - Заголовок
 * @param description - Подзаголовок
 * @param placeControls - Поле для контролов
 * @param placeAdditional - Дополнительная поле для компонентов (React element)
 * @param colspan - Ширина таблицы (кол-во столбцов)
 * @returns {JSX.Element}
 * @constructor
 */
export const SecondaryTableHeading = ({
  header,
  description,
  placeAdditional,
  colspan,
  placeControls,
}) => {
  return (
    <tr className="table-secondary__section-title">
      <td colSpan={colspan ? colspan : 1}>
        <div className="table-secondary__section-title-wrap">
          <div className="table-secondary__title">
            {header && (
              <Heading
                text={header}
                level={DataAttrHeadingLevel.LEVEL_6}
                customTagName="p"
              />
            )}

            {placeControls && (
              <div className="table-secondary__controls">
                {placeControls}
              </div>
            )}
          </div>

          {description && <Desc text={description} size={DataAttrSize.S} />}

          {placeAdditional && placeAdditional}
        </div>
      </td>
    </tr>
  );
};

/**
 * Таблица Secondary
 * @param props = {
 *     header - Заголовок таблицы, компонент
 *     columns - Столбцы таблицы https://react-table.tanstack.com/docs/quick-start#define-columns
 *     data - Массив с объектами данных https://react-table.tanstack.com/docs/quick-start#getting-your-data
 *     sortField - ID поля по которому сортировать (из columns).
 *     sortDirection - Направление сортировки. Доступные значения: 'asc' или 'desc'.
 * @returns {JSX.Element}
 */
const TableSecondary = (props) => {
  const { colorTheme, size, columns, data, sortColumn, sortDirection, header } = props;

  const { getTableProps, getTableBodyProps, rows, prepareRow, setSortBy } =
    useTable(
      ...generateParamsForReactTable({
        columns,
        data,
        sortColumn,
        sortDirection,
      })
    );

  useEffect(() => {
    setSortBy([{ id: sortColumn, desc: sortDirection === "desc" }]);
  }, [sortColumn, sortDirection]);

  return (
    <table
      className="table-secondary"
      data-size={size}
      data-color-theme={colorTheme}
      {...getTableProps()}
    >
      <tbody className="table-secondary__body" {...getTableBodyProps()}>
        {header}
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td
                    className={cn(...(cell?.column?.className || []))}
                    {...cell.getCellProps()}
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};


TablePrimary.defaultProps = {
  sortDirection: "asc",
};

TablePrimary.propTypes = {
  header: PropTypes.element,
  columns: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.array,
  sortField: PropTypes.oneOfType([PropTypes.string]),
  sortDirection: PropTypes.string
};

export default TableSecondary;
