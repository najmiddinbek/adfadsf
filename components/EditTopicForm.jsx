"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditTopicForm({ id, malumot, turi }) {
  const [newmalumot, setNewmalumot] = useState(malumot);
  const [newTuri, setNewTuri] = useState(turi);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newmalumot, newTuri }),
      });

      if (!res.ok) {
        throw new Error("Failed to update topic");
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setNewmalumot(e.target.value)}
        value={newmalumot}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic malumot"
      />

      <input
        onChange={(e) => setNewTuri(e.target.value)}
        value={newTuri}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic turi"
      />

      <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
        Update Topic
      </button>
    </form>
  );
}
