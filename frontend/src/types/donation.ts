export interface Donation {
  id: number;
  address: string;
  namaDonatur?: string;
  message?: string;
  isDisplay: boolean;
  amount: number;
  createdAt: Date;
}
