"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

type Meeting = {
  id: number;
  name: string;
  date: string;
  place: string;
};

type Staff = {
  staffId: string;
  name: string;
  department: string;
};

type ScanResult = {
  type: "success" | "error";
  message: string;
  staff?: Staff;
};