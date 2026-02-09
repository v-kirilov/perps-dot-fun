"use server";
import { notFound } from "next/navigation";
import { supabase } from "./supabase";

export interface User {
  id?: string;
  wallet: string;
  trades: number;
  wins: number;
  losses: number;
  traded_volume: number;
}

export interface Trade {
  created_at: Date;
  closed_at?: Date;
  id?: string;
  trader_id: number;
  amount: number;
  isOpen: boolean;
  profit: number;
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
    .select("id, created_at, closed_at, trader_id, amount, isOpen, profit")
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
    .select("id, created_at, closed_at, trader_id, amount, isOpen, profit")
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

export async function getOrCreateUser(wallet: string) {
  console.log("Getting or creating user with wallet:", wallet);
  // Check if user exists
  const { data: existingUser, error: fetchError } = await supabase
    .from("users")
    .select("*")
    .eq("wallet", wallet)
    .overrideTypes<User[], { merge: false }>();
 

  if (fetchError) {
    throw new Error("Could not fetch user");
  }
  // If user exists, return it (check array length since data is an array)
  if (existingUser && existingUser.length > 0) {
    console.log("User already exists with wallet:", existingUser[0]);
    return existingUser[0];
  }

  // Create new user with default values
  const newUser:User = {
    wallet,
    trades: 0,
    wins: 0,
    losses: 0,
    traded_volume: 0,
  };


  const { data: createdUser, error: insertError } = await supabase
    .from("users")
    .insert([newUser])
    .select()
    .single();

  if (insertError) {
    throw new Error("Could not create user");
  }

  return createdUser;
}

export async function openTrade(trader_id: number, amount: number, openedDate:Date) {
  console.log(
    "Opening trade for trader_id:",
    trader_id,
    "with amount:",
    amount,
  );
  const trade: Trade = {
    created_at: openedDate,
    trader_id: trader_id,
    amount: amount,
    isOpen: true,
    profit: 0,
  };
  const { data, error } = await supabase.from("trades").insert([trade]);

  if (error) {
    console.error("Error inserting trade:", error);
    throw new Error("Trades could not be opened");
  }
  return data;
}
