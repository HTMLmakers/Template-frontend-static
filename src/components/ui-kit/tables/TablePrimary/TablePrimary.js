import React, { useEffect } from "react";
import { useTable } from "react-table";
import "./styles.scss";
import PropTypes from "prop-types";
import { generateParamsForReactTable } from "../../../../services/utils/utils";
import cn from "classnames";

/**
 * "Богатая" ячейка в таблице имеющая заголовок и подпись
 * @param caption - Заголовок
 * @param description - Подпись
 * @returns {JSX.Element}
 */

export const TablePrimaryCell = ({ caption, description }) => {
  return (
    <div className="table-primary__name">
      <p className="table-primary__name-caption">{caption}</p>
      <p className="table-primary__name-desc">{description}</p>
    </div>
  );
};
/**
 * Таблица Primary
 * @param props = {
 *     columns - Столбцы таблицы https://react-table.tanstack.com/docs/quick-start#define-columns
 *     withCheckboxes - Флаг определяющий, отображать ли левый столбец с чекбоксами. Возможные значения: true\false.
 *     data - Массив с объектами данных https://react-table.tanstack.com/docs/quick-start#getting-your-data
 *     sortField - ID поля по которому сортировать (из columns).
 *     sortDirection - Направление сортировки. Доступные значения: 'asc' или 'desc'.
 *     checkboxHandle - Callback срабатывающий при отметке чекбокса, возвращает массив id отмеченных строк.
 * }
 * @returns {JSX.Element}
 */
const TablePrimary = (props) => {
  const {
    colorTheme,
    size,
    columns,
    withCheckboxes,
    data,
    sortColumn,
    sortDirection,
    checkboxHandle,
    ...rest
  } = props;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setSortBy,
    state: { selectedRowIds },
  } = useTable(
    ...generateParamsForReactTable({
      columns,
      data,
      withCheckboxes,
      sortColumn,
      sortDirection,
    })
  );

  useEffect(() => {
    setSortBy([{ id: sortColumn, desc: sortDirection === "desc" }]);
  }, [sortColumn, sortDirection]);

  useEffect(() => {
    checkboxHandle(selectedRowIds);
  }, [selectedRowIds]);

  return (
    <table
      className="table-primary"
      data-size={size}
      data-color-theme={colorTheme}
      {...getTableProps()}
      {...rest}
    >
      <thead className="table-primary__header">
        {headerGroups.map((headerGroup) => {
          return (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                return (
                  <th
                    className={cn(
                      {
                        "table-primary__checkmark": column.id === "selection",
                      },
                      ...(column?.className || [])
                    )}
                    {...column.getHeaderProps()}
                  >
                    {column.render("Header")}
                  </th>
                );
              })}
            </tr>
          );
        })}
      </thead>
      <tbody className="table-primary__body" {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td
                    className={cn({
                      "table-primary__checkmark":
                        cell.column.id === "selection",
                    })}
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
  withCheckboxes: false,
  sortDirection: "asc",
};

TablePrimary.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string),
  withCheckboxes: PropTypes.bool,
  data: PropTypes.array,
  sortField: PropTypes.oneOfType([PropTypes.string]),
  sortDirection: PropTypes.string,
  checkboxHandle: PropTypes.func,
};

export default TablePrimary;
