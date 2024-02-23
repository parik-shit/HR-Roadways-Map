import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';

const BusScheduleCard = ({ columns }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('./busScheduleData.json');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data
  });

  return (
    <div className="rounded p-4 mb-4">
      <table {...getTableProps()} className="w-full  border-separate border-spacing-y-1  border-spacing-x-1">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} className=" py-4 bg-gray-800 hover:bg-gray-700 text-sm text-teal-500 text-opacity-40  rounded-sm">
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row,index) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className={index % 2 === 0 ? "bg-gray-900 " : "bg-gray-800"}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()} className=" px-4 text-sm py-2 text-gray-400 hover:bg-gray-800 text-center font-semibold rounded-sm ">
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BusScheduleCard;
