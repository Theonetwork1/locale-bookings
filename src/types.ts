export enum Screen {
  WELCOME = 'WELCOME',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  OTP = 'OTP',
  DASHBOARD = 'DASHBOARD',
  RECHARGE = 'RECHARGE',
  TRANSFER = 'TRANSFER',
  RECEIPT = 'RECEIPT',
  PROFILE = 'PROFILE',
  HISTORY = 'HISTORY',
  CONTACT = 'CONTACT',
  ABOUT = 'ABOUT',
  TERMS = 'TERMS',
  PRIVACY = 'PRIVACY',
  ROLE_SELECTION = 'ROLE_SELECTION'
}

export type Role = 'client' | 'agent' | 'admin';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
  role: Role;
  status: 'active' | 'blocked';
  joinedDate: string;
  balance: number;
}

export interface Transaction {
  id: string;
  type: 'transfer' | 'recharge';
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  receiverName: string;
  receiverPhone: string;
  amount: number;
  fee: number;
  total: number;
  currency: string;
  company: 'Digicel' | 'Natcom' | 'MonCash' | 'NatCash';
  status: 'In Progress' | 'Received' | 'Failed' | 'Cancelled';
  date: string;
  time: string;
}

export interface Message {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  content: string;
  date: string;
  isRead: boolean;
  type: 'received' | 'sent';
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  bannerUrl: string;
  code: string;
  minAmount: number;
  bonus: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'paused';
  config: {
    bgColor: string;
    textColor: string;
  };
}
