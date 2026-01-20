import { notFound } from "next/navigation";
import { supabase } from "./supabase";

export interface User {
  id: string;
  wallet: string;
  trades:number;
  wins:number;
  losses:number;
  traded_volume:number;
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

export async function getTrade(id: string) {
  const { data, error } = await supabase
    .from("trades")
    .select("id, created_at,trader_id, amount, isOpen")
    .eq("id", id)
    .overrideTypes<Trade[], { merge: false }>();

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}

export async function getUser(wallet: string) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("wallet", wallet)
    .overrideTypes<User[], { merge: false }>();

  if (error) {
    console.error(error);
    throw new Error("Trades could not be loaded");
  }

  return data;
}
