export interface UserCoordinates {
  lat: number;
  lng: number;
}

export interface UserAddress {
  address: string;
  city: string;
  state?: string;
  stateCode?: string;
  postalCode: string;
  coordinates?: UserCoordinates;
  country?: string;
}

export interface UserCompany {
  department: string;
  name: string;
  title: string;
  address?: UserAddress;
}

export interface UserHair {
  color: string;
  type: string;
}

export interface UserBank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

export interface UserCrypto {
  coin: string;
  wallet: string;
  network: string;
}

export interface User{
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phone: string;
    age: number;
    gender: 'male' | 'female' | string;
    birthDate: string;
    image: string;
    role: 'admin' | 'user' | string;
    address?: UserAddress;
    company?: UserCompany;
    maidenName?: string;
    eyeColor?: string;
    hair?: UserHair;
    height?: number;
    weight?: number;
    bloodGroup?: string;
    ip?: string;
    macAddress?: string;
    university?: string;
    bank?: UserBank;
    crypto?: UserCrypto;
    ein?: string;
    ssn?: string;
    userAgent?: string;
}
