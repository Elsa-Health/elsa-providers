import firestore from "@react-native-firebase/firestore"
import _ from "lodash"
import { VisitState } from "../../../models/addo-store"

export function saveADDOVisit(
    visitState: VisitState,
    providerId: string,
    providerName: string,
    facilityId: string,
    facilityName: string,
) {
    const timestamp = firestore.FieldValue.serverTimestamp()
    return firestore()
        .collection("addo-visits")
        .add(
            Object.assign(
                { ...visitState },
                // {
                //     presentSymptoms: _.uniq(visitState.presentSymptoms),
                //     absentSymptoms: _.uniq(visitState.absentSymptoms),
                // },
                {
                    providerId,
                    providerName,
                    facilityId,
                    facilityName,
                    reviewers: 0, //incremental count of how many people have reviewed the patient file
                    // NEXT: add a field that keeps track of whether or not there is a conflict in the decisions made by the clinical expert reviewers
                    createdAt: timestamp,
                    updatedAt: timestamp,
                },
            ),
        )
}
