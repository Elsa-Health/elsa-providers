/**
 * Elsa Local Database
 * Collections
 * 1. Patient Files
 * 2. Appointments
 * 3. Visits
 * 4. CTC File
 */

import Vasern from "vasern"
import { maritalStatus } from "./ctc-store"

// export interface CTCPatientFile {
//     id?: string
//     code: string
//     sex: "male" | "female"
//     dateOfBirth: Date
//     maritalStatus: "single" | "married" | "cohabiting" | "divorced" | "widow"
//     district: string
//     allergies: string[]
//     treatmentSupport: boolean
//     treatmentSupportType: treatmentSupportType
//     firstHIVTestDate: Date
//     HIVConfirmDate: Date | null
//     HIVConfirmed: boolean
//     ARTNaive: boolean
//     WHOStageAtDiagnosis: WHOStage
//     ARTStartDate: Date
//     WHOStageAtARTStart: WHOStage
//     currentARTUse: boolean
//     complete: boolean
//     createdAt?: Date | any
//     updatedAt?: Date | any
// }

// interface PatientFile {
//     id?: string
//     firstName: string
//     lastName: string
//     telephone: string
//     dateOfBirth: Date
//     email: string
//     maritalStatus?: maritalStatus
//     country: string
//     region: string
//     sex: "male" | "female"
//     username: string
//     createdAt: Date
//     updatedAt: Date
// }

const CTCPatientFileSchema = {
    name: "CTCPatientFiles",
    props: {
        code: "?string",
        sex: "?string",
        dateOfBirth: "?datetime",
        maritalStatus: "?string",
        district: "?string",
        allergies: "[]string",
        treatmentSupport: "?boolean",
        treatmentSupportType: "?string",
        firstHIVTestDate: "?datetime",
        HIVConfirmDate: "?datetime",
        HIVConfirmed: "?boolean",
        ARTNaive: "?boolean",
        WHOStageAtDiagnosis: "?string",
        ARTStartDate: "?datetime",
        WHOStageAtARTStart: "?string",
        currentARTUse: "?boolean",
        complete: "?boolean",
        createdAt: "?datetime",
        updatedAt: "?datetime",
        // patientFile: "?#PatientFiles",
        CTCID: "?string",
        data: "string",
    },
}

const PatientFileSchema = {
    name: "PatientFiles",
    // Note: no "id" in "props", it will be automatically ignored otherwise
    props: {
        code: "string",
        firstName: "?string",
        lastName: "?string",
        telephone: "?string",
        dateOfBirth: "?datetime",
        email: "?string",
        country: "?string",
        region: "?string",
        sex: "string",
        username: "?string",
        createdAt: "datetime",
        updatedAt: "datetime",
        data: "string",
    },
}

const PatientDiagnosesSchema = {
    name: "PatientDiagnoses",
    props: { diag: "string", name: "string", p: "string" },
}

const CTCVisitSchema = {
    name: "CTCVisits",
    props: {
        code: "string",
        patientId: "?string",
        visitType: "?string", // follow-up, art appointment, check-up
        dateOfVisit: "?datetime",
        attendanceFacility: "?string",
        registerdFacility: "?string",
        isTransiting: "?boolean",
        diagnoses: "[]#PatientDiagnoses",
        clinicalStage: "?string",
        pregnant: "?boolean",
        height: "?int",
        weight: "?int",
        systolic: "?int",
        diastolic: "?int",
        ARTCombination: "?string", // FIXME: update globally
        functionalStage: "?string",
        conditions: "[]string",
        currentARTUse: "?boolean",
        additionalMedication: "?boolean",
        coMedications: "[]string",
        deliveryDate: "?datetime", // can be null
        createdAt: "datetime",
        updatedAt: "datetime",
        presentingSymptoms: "[]string",
        investigationsOrdered: "[]string",
        newSymptoms: "?boolean",
        dispensedMedications: "[]string",
        ARTDecision: "?string",
        ARTDecisionReason: "?string",
        counseling: "[]string",
        presentSymptoms: "[]string",
        absentSymptoms: "[]string", // To be ignored during storage [???]
        patientFile: "?#PatientFiles",
        CTCPatientFile: "?#CTCPatientFiles",
        CTCNumber: "?string",
        data: "string",
    },
}

const AppointmentSchema = {
    name: "Appointments",
    props: {
        code: "string",
        patientId: "?string",
        patientFile: "?#PatientFiles",
        CTCPatientFile: "?#CTCPatientFiles",
        currentAppointmentDate: "?datetime",
        attendanceFacility: "?string",
        type: "string", // art-appointment, follow-up, visit
        dateAttended: "?datetime",
        appointmentAttended: "boolean",
        facilityAttended: "?string",
        createdAt: "?datetime",
        updatedAt: "?datetime",
        data: "string",
    },
}

const ElsaDB = new Vasern({
    schemas: [
        PatientFileSchema,
        CTCPatientFileSchema,
        CTCVisitSchema,
        AppointmentSchema,
        PatientDiagnosesSchema,
    ],
    version: 1,
})

// fromCache
// hasPendingWrites
export default ElsaDB
// const { Appointments, CTCVisits, PatientFiles, CTCPatientFiles } = VarsernDB
