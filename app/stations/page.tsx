'use client';

import { useState } from "react";

type Station = { id: string; name: string; address?: string };
type Price = { id: string; stationId: string; centsPerGallon: number; recordedAt: string };

export default function StationsPage() {
  const [stations, setStations] = useState<Station[]>([]);
  const [prices, setPrices] = useState<Price[]>([]);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("3.75");

  const addStation = () => {
    if (!name) return;
    const s = { id: Math.random().toString(36).slice(2), name, address };
    setStations(v => [s, ...v]);
    setName(""); setAddress("");
  };

  const addPrice = (stationId: string) => {
    const p = { id: Math.random().toString(36).slice(2), stationId, centsPerGallon: Math.round(parseFloat(price) * 100), recordedAt: new Date().toISOString() };
    setPrices(v => [p, ...v]);
  };

  return (
    <div className="container py-10">
      <div className="card mb-6">
        <h1 className="h1 mb-4">Stations & Prices</h1>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="label">Name</label>
            <input className="input" value={name} onChange={e=>setName(e.target.value)} placeholder="Shell, Chevron..." />
          </div>
          <div>
            <label className="label">Address (opt.)</label>
            <input className="input" value={address} onChange={e=>setAddress(e.target.value)} />
          </div>
          <div className="flex items-end">
            <button className="btn btn-primary w-full" onClick={addStation}>Add Station</button>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="h2 mb-4">Your Stations</h2>
        {stations.length === 0 ? <p className="note">No stations yet.</p> : (
          <ul className="space-y-4">
            {stations.map(s => (
              <li key={s.id} className="bg-[#0b1220] rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{s.name}</div>
                    <div className="note">{s.address || "No address"}</div>
                  </div>
                  <div className="flex gap-3 items-end">
                    <div>
                      <label className="label">Price $/gal</label>
                      <input className="input w-32" value={price} onChange={e=>setPrice(e.target.value)} />
                    </div>
                    <button className="btn btn-primary" onClick={()=>addPrice(s.id)}>Save Price</button>
                  </div>
                </div>
                <div className="note mt-3">
                  Recent prices: {prices.filter(p=>p.stationId===s.id).slice(0,3).map(p=>`$${(p.centsPerGallon/100).toFixed(2)} @ ${new Date(p.recordedAt).toLocaleString()}`).join(" · ") || "—"}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
