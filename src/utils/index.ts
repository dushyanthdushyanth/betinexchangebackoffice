 import { axiosPrivate } from "./axios";
import {toast } from "react-toastify";
// Date formatting utilities
export const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateTime = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};


export function divisibleWithTwoDecimals(dividend: any = 0, divisor: any = 100, withSynbol: boolean = true) {
  let result = dividend / divisor;
  const formattedResult = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(result);
  
  return  (withSynbol ? "₹" : "") + formattedResult;
}


export const formatNumberWithCommas = (number: any) => {
  let convertednumber = number.toLocaleString("en-IN");
  return convertednumber;
};

// Currency formatting
export const formatCurrency = (amount: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

// String utilities
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const truncate = (str: string, length: number): string => {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
};

// Validation utilities
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

// Array utilities
export const groupBy = <T, K extends string | number>(
  array: T[],
  key: (item: T) => K
): Record<K, T[]> => {
  return array.reduce((groups, item) => {
    const groupKey = key(item);
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(item);
    return groups;
  }, {} as Record<K, T[]>);
};

// Local storage utilities
export const setLocalStorage = (key: string, value: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const getLocalStorage = <T>(key: string, defaultValue?: T): T | null => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue || null;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue || null;
  }
};

export const removeLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};



export async function performGetAPICall(
  urlString: any,
  headers = {},
  params = {}
) {
  try {
    return await axiosPrivate.get(`${process.env.NEXT_PUBLIC_API_URL}${urlString}`, {
      headers,
      // params,
    });
  } catch (error: any) {
    return { ...error.response };
  }
}

export async function performPostAPICall(
  urlString: any,
  data = {},
  config = {}
) {
  try {
    return await axiosPrivate.post(
      `${process.env.NEXT_PUBLIC_API_URL_SERVER}${urlString}`,
      data,
      config
    );
  } catch (error: any) {
    return { ...error.response };
  }
}
export const objToBase64 = (obj: any) => {
  const encoder = new TextEncoder();
  const str = JSON.stringify(obj);
  return btoa(new TextDecoder().decode(encoder.encode(str)));
};

export const base64ToObj = (base64: any) => {
  if (!base64) return;
  const decodedStr = atob(base64);
  return JSON.parse(decodedStr);
};


export function getPaginationParamsSSR(searchParams:any) {
  const { page: pageNumber, itemsPerPage } = getParams(searchParams);
  return `itemsPerPage=${itemsPerPage ?? "10"}&pageNumber=${pageNumber ?? 0}`;
}


export function getParams(searchParams: any) {
  const query = searchParams?.q ? base64ToObj(searchParams?.q) : {};
  return query;
}
export function returnConfigHeadersPrivate(headersList:any) {
  return {
    headers: {
      Authorization: headersList?.get("Authorization"),
      clientId: headersList?.get("clientId"),
    },
  };
}

export function returnConfigHeadersCokkiesPrivate(nextCookies:any) {
  return {
    headers: {
      Authorization: nextCookies?.get("accessToken")?.value,
      clientId: nextCookies?.get("clientId")?.value,
    },
  };
}

export async function performPutAPICall(
  urlString: any,
  data = {},
  config = {}
) {
  try {
    return await axiosPrivate.put(
        `${process.env.NEXT_PUBLIC_API_URL}${urlString}`,
      data,
      config
    );
  } catch (error: any) {
    return { ...error.response };
  }
}



export function showToast(type: any, message: any) {
  if (type === "success") {
    toast.success(message, {
      position: "top-right",
    });
  } else {
    toast.error(message, {
      position: "top-right",
    });
  }
}


export function isBrowser() {
  return typeof window !== "undefined";
}

// export function getParams(searchParams: any) {
//     const query = searchParams?.q ? base64ToObj(searchParams?.q) : {};
//   return query;
// }