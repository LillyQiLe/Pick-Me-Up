import { type } from "os";
import { ActionType, ContentActionType } from "../action-types"

interface DepositAction {
    type: ActionType.DEPOSIT,
    payload: number
}

interface WithdrawAction {
    type: ActionType.WITHDRAW,
    payload: number
}

interface BankruptAction {
    type: ActionType.BANKRUPT,
}

export type Action = DepositAction | WithdrawAction | BankruptAction;

interface ChangeContentAction {
    type: ContentActionType.CHANGECONTENT,
    content: string
}

export type ContentAction = ChangeContentAction