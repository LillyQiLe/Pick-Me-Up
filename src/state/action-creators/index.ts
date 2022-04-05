import { ActionType } from "../action-types";
import { Dispatch } from "redux";
import { Action } from "../actions";

export const depositMoney = (amont: number) => {
    return (dispath: Dispatch<Action>) => {
        dispath({
            type: ActionType.DEPOSIT,
            payload: amont
        })
    }
}

export const withdrawMoney = (amont: number) => {
    return (dispath: Dispatch<Action>) => {
        dispath({
            type: ActionType.WITHDRAW,
            payload: amont
        })
    }
}

export const bankruptMoney = () => {
    return (dispath: Dispatch<Action>) => {
        dispath({
            type: ActionType.BANKRUPT
        })
    }
}