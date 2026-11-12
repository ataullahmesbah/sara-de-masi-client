"use client";
import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="btn btn-line">
      <Printer size={17} aria-hidden /> Print
    </button>
  );
}
