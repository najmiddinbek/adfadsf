"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTopic() {
  const [malumot, setMalumot] = useState("");
  const [turi, setTuri] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!malumot || !turi) {
      alert("malumot and turi are required.");
      return;
    }

    try {
      const res = await fetch("/api/topics", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ malumot, turi }),
      });

      if (res.ok) {
        alert("Qoshildi")

      } else {
        throw new Error("Failed to create a topic");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <select className="w-full py-2 px-8 border border-slate-500 " onChange={(e) => setTuri(e.target.value)} value={turi}>
        <option>Tanlang</option>
        <option>Nashida</option>
        <option>Facebook</option>
        <option>Telegram</option>
        <option>Instagram</option>
        <option>You Tube</option>
        <option>OK.ru</option>
        <option>Tik Tok</option>
        <option>Kitoblar</option>
        <option>Turli xil saytlar</option>
      </select>

      <input
        onChange={(e) => setMalumot(e.target.value)}
        value={malumot}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="malumot"
      />


      <button
        type="submit"
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
      >
        Add Topic
      </button>
    </form>
  );
}
