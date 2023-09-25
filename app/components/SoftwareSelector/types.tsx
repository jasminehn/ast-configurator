import { Condition } from "../../state/types"

export interface Software {
    id: string
    name: string
    description: {
        text: string
    }
    conditions: Array<Condition>
}