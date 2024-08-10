import { useEffect } from "react";
import { addCace } from "../services/FunctionsService";
import { getRecentBookings } from "../services/BookingService";

export default function Callane() {
  useEffect(function () {
    async function run() {
      //   await callHelloWorld();
      await addCace();
      console.log(await getRecentBookings());
      // await addBooking();
    }
    run();
  }, []);
  return null;
}
