'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { supabase } from '../lib/supabaseClient';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  service: z.string().min(2),
  message: z.string().optional(),
});

export default function QuoteForm() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      // Insert into Supabase 'quotes' table
      await supabase.from('quotes').insert([{
        name: data.name,
        email: data.email,
        phone: data.phone,
        service: data.service,
        message: data.message || null
      }]);

      // Send email via Netlify Function
      await fetch('/.netlify/functions/sendQuote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      alert('Thanks! Your request has been sent.');
      reset();
    } catch (e) {
alert('Something went wrong. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <input className="border p-3 rounded-md" placeholder="Full Name" {...register('name')} required/>
        <input className="border p-3 rounded-md" placeholder="Email" type="email" {...register('email')} required/>
        <input className="border p-3 rounded-md" placeholder="Phone" {...register('phone')} required/>
        <select className="border p-3 rounded-md" {...register('service')} required>
          <option value="">Select a service</option>
          <option>Facility Services</option>
          <option>Rehab & Restoration</option>
          <option>Mobile Mechanic</option>
        </select>
      </div>
      <textarea className="border p-3 rounded-md w-full" placeholder="Tell us about your needs…" rows={4} {...register('message')}/>
      <button className="btn btn-primary" type="submit">Send Request</button>
    </form>
  );
}
