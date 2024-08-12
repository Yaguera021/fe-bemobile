import React, { useEffect, useState, useMemo } from "react";

import { fetchEmployees } from "../../services/fetchAPI";
import { Employees } from "../../types/Employees";

import { formatDate, formatPhoneNumber } from "../../utils/formatFunctions";
import { filterEmployees } from "../../utils/filterFunction";

import "./Table.css";
import arrow from "../../assets/arrow.svg";
import ellipse from "../../assets/ellipse.svg";

const Table: React.FC = () => {
  const [employees, setEmployees] = useState<Employees[]>([]);
  const [search, setSearch] = useState("");
  const [openInfo, setOpenInfo] = useState<number[]>([]);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const loadEmployees = async () => {
      const data = await fetchEmployees();
      setEmployees(data);
    };
    loadEmployees();

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredEmployees = useMemo(
    () => filterEmployees(employees, search),
    [search, employees],
  );

  const toggleInfo = (id: number) => {
    setOpenInfo((prevExpanded) =>
      prevExpanded.includes(id)
        ? prevExpanded.filter((employeeId) => employeeId !== id)
        : [...prevExpanded, id],
    );
  };

  return (
    <div className='content-container'>
      <div className='top-wrapper'>
        <span className='heading'>Funcionários</span>
        <input
          type='text'
          placeholder='Pesquisar'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className={`table-container ${isDesktop ? "desktop" : "mobile"}`}>
        <table>
          <thead>
            <tr>
              <th className='photo-text'>Foto</th>
              <th className='name-text'>Nome</th>
              {isDesktop && (
                <>
                  <th className='job'>Cargo</th>
                  <th className='data-adm'>Data de Admissão</th>
                  <th className='phone'>Telefone</th>
                </>
              )}
              {!isDesktop && (
                <th className='ellipse-svg'>
                  <img src={ellipse} alt='' />
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <React.Fragment key={employee.id}>
                <tr>
                  <td>
                    <img
                      src={employee.image}
                      alt={employee.name}
                      width='50'
                      height='50'
                      className='photo-img'
                    />
                  </td>
                  <td className='employee-name'>{employee.name}</td>
                  {isDesktop ? (
                    <>
                      <td className='employee-job'>{employee.job}</td>
                      <td className='employee-adm-date'>
                        {formatDate(employee.admission_date)}
                      </td>
                      <td className='employee-phone-number'>
                        {formatPhoneNumber(employee.phone)}
                      </td>
                    </>
                  ) : (
                    <td>
                      <button
                        className={
                          openInfo.includes(Number(employee.id)) ? "show" : ""
                        }
                        onClick={() => toggleInfo(Number(employee.id))}
                      >
                        <img src={arrow} alt='seta' className='arrow-svg' />
                      </button>
                    </td>
                  )}
                </tr>
                {!isDesktop && openInfo.includes(Number(employee.id)) && (
                  <tr className='open-info'>
                    <td colSpan={3} className='details-container'>
                      <div className='details'>
                        <p>
                          <strong>Cargo</strong>
                          <span>{employee.job}</span>
                        </p>
                        <p>
                          <strong>Data de Admissão</strong>
                          <span>{formatDate(employee.admission_date)}</span>
                        </p>
                        <p>
                          <strong>Telefone</strong>
                          <span>{formatPhoneNumber(employee.phone)}</span>
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
