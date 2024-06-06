import { Price } from "./index";
import { Dispatch, SetStateAction } from "react";

export type PageContextType = {
    priceInfo: null | Price,
    setPriceInfo?: Dispatch<SetStateAction<Price | null>>,
}