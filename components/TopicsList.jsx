'use client'

import React, { useState, useEffect } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import Link from "next/link";
import { MdOutlineManageSearch } from "react-icons/md";


const Filter = () => {
  const [topics, setTopiclar] = useState([]);
  const [filteredMavzula, setFilteredMavzula] = useState([]);
  const [usersAddedByDate, setUsersAddedByDate] = useState({});
  const [filterValue, setFilterValue] = useState({
    malumot: "",
  });
  const [hide, setHide] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const alertFunction = () => {
    alert("Bu malumot havfli")
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/topics", {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Mavzular yuklanmadi");
        }

        const data = await res.json();
        const topics = data?.topics;

        setTopiclar(topics);
        setFilteredMavzula(topics);
      } catch (error) {
        console.log("Mavzular yuklanishda xatolik: ", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const usersGroupedByDate = filteredMavzula.reduce((acc, t) => {
        const dateKey = new Date(t.createdAt).toLocaleDateString();
        acc[dateKey] = acc[dateKey] || [];
        acc[dateKey].push(t);
        return acc;
      }, {});

      setUsersAddedByDate(usersGroupedByDate);
    };

    fetchData();
  }, [filteredMavzula]);

  const highlightText = (text, highlight) => {
    if (!highlight) return text;

    const regex = new RegExp(`(${highlight})`, 'gi');
    return text.split(regex).map((part, index) => regex.test(part) ?
      <span key={index} className="active">{part}</span>
      : part);
  };

  const handleFilter = () => {
    const filteredArray = topics.filter(
      (t) =>
        t.malumot.toLowerCase().includes(filterValue.malumot.toLowerCase()) ||
        t.turi.toLowerCase().includes(filterValue.malumot.toLowerCase())
    );

    setFilteredMavzula(filteredArray);
    setInitialLoad(false); // Set initialLoad to false after filtering
  };

  const [filterStatus, setFilterStatus] = useState(null);

  const changeStatus = async (id) => {
    const confirmed = confirm("Stadion hozir bo`sh holatdami");
    const apiUri = process.env.API_URL
    if (confirmed) {
      const res = await fetch(`/api/topics?id=${id}`, {
        method: "PUT",
      });

      if (res.ok) {
      }
    }
  };


  return (
    <div className="bg-white rounded-md">
      <div className="container">
        <div className="">
          <div className="filter">
            <div className="flex py-4 px-5 items-center gap-3">
              <input
                className="border-2 py-[11px] text-xl px-2 w-full rounded-md"
                placeholder="Malumot kiriting..."
                type="text"
                value={filterValue.malumot}
                onChange={(e) => {
                  setFilterValue({ ...filterValue, malumot: e.target.value });
                  handleFilter(); // Call handleFilter on every keystroke
                }}
              />
              <MdOutlineManageSearch onClick={alertFunction} className="text-xl md:text-2xl lg:text-4xl cursor-pointer" />

            </div>
          </div>
        </div>
        <div className="p-5">
          {!initialLoad && Object.keys(usersAddedByDate)
            .reverse()
            .map((date, index) => (
              <div className="" key={date}>
                {usersAddedByDate[date].filter((t) => filterStatus === null ? true : t.isChecked === filterStatus).map((t, index) => (
                  <div key={t.id} className="w-full">
                    <div className="mb-3">
                      <div className="text-xl md:text-2xl font-bold lg:text-3xl text-black">{highlightText(t.turi, filterValue.malumot)}</div>
                      <p className="text-[14px] line-clamp-1 md:text-xl lg:text-[22px]">{highlightText(t.malumot, filterValue.malumot)}</p>
                    </div>
                  </div>
                ))}

                {initialLoad && <h1>Malumotlar yuklanmoqda....</h1>}
              </div>
            ))}


          {!initialLoad && Object.keys(usersAddedByDate).length === 0 && (
            <h1>Siz qidiruv maydonida izlagan <b> {filterValue.malumot}</b> qora ro`yxatimizdan topilmadi </h1>
          )}
        </div>


      </div>
    </div>
  );
};

export default Filter;

