import { GeneralApiProblem } from "./api-problem"

export interface User {
    id: number
    name: string
}

export interface SymptomAssessment {
    diagnoses: { [diagnosis: string]: number }
    nextNodes: string[]
}

export type GetSymptomAssessment = { kind: "ok"; assessment: SymptomAssessment } | GeneralApiProblem
export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem
