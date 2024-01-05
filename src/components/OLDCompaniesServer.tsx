
import * as React from 'react';
// import Box from '@mui/material/Box';

export async function fetchCompanies() {
  try {
      const res = await fetch("/api/companies")
      if (!res.ok) {
        throw new Error("HTTP status code " + res.status);
      }
      const data = await res.json();
      return data;
  } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch invoices.');
  }
}

export default async function CompaniesServer() {
  const rows3 = await fetchCompanies()

  return (
    <div>
     {JSON.stringify(rows3)}
    </div>
  );
}