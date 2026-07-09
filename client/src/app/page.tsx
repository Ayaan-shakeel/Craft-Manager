import React from 'react';
import { Metadata } from 'next';
export const metadata : Metadata={

}
export default function page() {
   metadata.title='Home Page'
  metadata.description='Its our Home page'
  return (
    <div>Home</div>
  )
}
