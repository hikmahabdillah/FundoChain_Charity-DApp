import type { Donation } from "../types/donation";

export const data: Donation[] = [
  {
    id: 1,
    address: "0xAbC1234567890dEfABC1234567890DefABc12345",
    namaDonatur: "Alice",
    message: "Semangat terus untuk proyek ini!",
    isDisplay: true,
    amount: 0.5,
    createdAt: new Date("2025-08-01T10:30:00Z"),
  },
  {
    id: 2,
    address: "0xDEf4567890ABC1234567890dEfABC1234567890D",
    namaDonatur: "Budi",
    message: "Terima kasih telah membuat perubahan.",
    isDisplay: false,
    amount: 1.2,
    createdAt: new Date("2025-08-02T08:15:00Z"),
  },
  {
    id: 3,
    address: "0x12345ABCDEF67890abcDEF67890ABC1234567890",
    namaDonatur: "Cynthia",
    message: "Good luck!",
    isDisplay: true,
    amount: 0.75,
    createdAt: new Date("2025-08-03T14:00:00Z"),
  },
  {
    id: 4,
    address: "0xABCDEF1234567890abcdef1234567890ABCDEF12",
    namaDonatur: "Dimas",
    message: "Semoga sukses!",
    isDisplay: true,
    amount: 0.3,
    createdAt: new Date("2025-08-04T09:45:00Z"),
  },
  {
    id: 5,
    address: "0x7890abcdef1234567890ABCDEF1234567890abcd",
    namaDonatur: "Eka",
    message: "Sedikit bantuan dari saya.",
    isDisplay: false,
    amount: 2.0,
    createdAt: new Date("2025-08-05T13:20:00Z"),
  },
];
