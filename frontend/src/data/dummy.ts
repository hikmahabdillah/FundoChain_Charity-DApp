import type { DonationTypes } from "../types/donation";

export const data: DonationTypes[] = [
  {
    address: "0xAbC1234567890dEfABC1234567890DefABc12345",
    donorName: "Alice",
    message: "Semangat terus untuk proyek ini!",
    isDisplay: true,
    amount: 0.5,
    createdAt: new Date("2025-08-01T10:30:00Z"),
  },
  {
    address: "0xDEf4567890ABC1234567890dEfABC1234567890D",
    donorName: "Budi",
    message: "Terima kasih telah membuat perubahan.",
    isDisplay: false,
    amount: 1.2,
    createdAt: new Date("2025-08-02T08:15:00Z"),
  },
  {
    address: "0x12345ABCDEF67890abcDEF67890ABC1234567890",
    donorName: "Cynthia",
    message: "Good luck!",
    isDisplay: true,
    amount: 0.75,
    createdAt: new Date("2025-08-03T14:00:00Z"),
  },
  {
    address: "0xABCDEF1234567890abcdef1234567890ABCDEF12",
    donorName: "Dimas",
    message: "Semoga sukses!",
    isDisplay: true,
    amount: 0.3,
    createdAt: new Date("2025-08-04T09:45:00Z"),
  },
  {
    address: "0x7890abcdef1234567890ABCDEF1234567890abcd",
    donorName: "Eka",
    message: "Sedikit bantuan dari saya.",
    isDisplay: false,
    amount: 2.0,
    createdAt: new Date("2025-08-05T13:20:00Z"),
  },
];
