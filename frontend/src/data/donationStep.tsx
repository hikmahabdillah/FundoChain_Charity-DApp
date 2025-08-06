import type { DonationStepsProps } from "../types/steps";

export const steps: DonationStepsProps[] = [
  {
    icon: <img src="/Wallet.webp" alt="Step 1 Icon" width="50px" />,
    title: "Connect Your Wallet",
    description: "Start by connecting your crypto wallet (like MetaMask).",
    delay: 0.5,
  },
  {
    icon: <img src="/Stack of Coins.webp" alt="Step 2 Icon" width="50px" />,
    title: "Choose a Donation Amount",
    description: "Enter the amount of ETH you wish to donate.",
    delay: 0.75,
  },
  {
    icon: <img src="/Donate.webp" alt="Step 3 Icon" width="50px" />,
    title: "Send Donation",
    description:
      "Your donation is sent directly to a verified address on-chain.",
    delay: 1.0,
  },
  {
    icon: <img src="/Meeting.webp" alt="Step 4 Icon" width="50px" />,
    title: "See Your Impact",
    description: "Check live donation history and total raised.",
    delay: 1.25,
  },
];
