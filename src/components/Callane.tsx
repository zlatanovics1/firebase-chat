import { useEffect } from "react";
import { addCace } from "../services/FunctionsService";

export default function Callane() {
  useEffect(function () {
    async function run() {
      //   await callHelloWorld();
      await addCace();
    }
    run();
  }, []);
  return null;
}
