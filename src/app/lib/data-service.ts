import { supabase } from "./supabase";

export interface User {
  id: string;
  wallet: string;
}

export interface Trade {
  created_at: Date;
  id: string;
  trader_id: string;
  amount: number;
  isOpen: boolean;
}

export const getUsers = async function () {
  const { data, error } = await supabase
    .from("users")
    .select("id, wallet")
    .overrideTypes<User[], { merge: false }>();

  if (error) {
    console.error(error);
    throw new Error("Trades could not be loaded");
  }

  return data;
};

export const getTrades = async function () {
  const { data, error } = await supabase
    .from("trades")
    .select("id, created_at,trader_id, amount, isOpen")
    .overrideTypes<Trade[], { merge: false }>();

  if (error) {
    console.error(error);
    throw new Error("Trades could not be loaded");
  }

  return data;
};
